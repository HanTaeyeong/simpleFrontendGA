import logo from './logo.svg';
import './App.css';


function logEvent(name, params) {
  if (!name) {
    return;
  }

  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
    return;
  }

  if (window.webkit
    && window.webkit.messageHandlers
    && window.webkit.messageHandlers.firebase) {
    // Call iOS interface
    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
    return;
  }
  // No Android or iOS interface found
  console.log("No native APIs found.");
}

function setUserProperty(name, value) {
  if (!name || !value) {
    return;
  }

  if (window.AnalyticsWebInterface) {
    window.AnalyticsWebInterface.setUserProperty(name, value);
  }
  if (window.webkit
    && window.webkit.messageHandlers
    && window.webkit.messageHandlers.firebase) {

    var message = {
      command: 'setUserProperty',
      name: name,
      value: value
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
    return;

  }

  console.log("No native APIs found.");
}


function App() {

  const onClick = () => {
    const params = {
      content: "테스트 내용"
    }
    logEvent("이벤트명", params);
  }
  const onClickEcommerce = () => {
   

    var item = [];

    var prdObj = {
      item_name: '{{상품 이름}}',
      item_id: '{{상품 Id}}',
      price: '{{가격(숫자)}}',
      item_brand: '{{상품 브랜드}}',
      item_category: '{{상품 카테고리 1}}',
      item_category2: '{{상품 카테고리 2}}',
      item_category3: '{{상품 카테고리 3}}',
      item_category4: '{{상품 카테고리 4}}',
      item_variant: '{{상품 옵션}}',
      promotion_id: '{{프로모션 Id}}',
      promotion_name: '{{프로모션 명}}',
      creative_name: '{{크리에이티브 이름}}',
      creative_slot: '{{크리에이티브 슬롯}}',
      index: '{{목록에서 제품의 위치(숫자)}}',
      quantity: '{{상품 수량(숫자)}}'
    }

    item.push(prdObj);

    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: 'view_promotion',
      ecommerce: { items: item }
    });
    console.log(window.dataLayer)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p  onClick={onClickEcommerce}> Ecommerce Data !</p>
        <br/>
        <p onClick={onClick}>
          Click here to send webview event!
        </p>
      </header>
    </div>
  );
}

export default App;

import WebSocketClient from "./WebSocketClient.js";

const BASE_URL = "wss://ws.bitmex.com/realtime";

const wsClient = new WebSocketClient(BASE_URL);

wsClient.socket.onopen = () => {
  wsClient.send("WebSocket open:", BASE_URL);

  const subscribeRequest = JSON.stringify({
    "op": "subscribe",
    "args": [
      "liquidation:XBTUSD",
      "liquidation:XBTUSDT",
      "liquidation:ETHUSD",
      "liquidation:ETHUSDT",
    ]});
  wsClient.send(subscribeRequest);
};

wsClient.socket.onmessage = (message) => {
  if (message.data === "pong") return;

  const data = JSON.parse(message.data);
  console.log(message.data);
  /**
   *
{"info":"Welcome to the BitMEX Realtime API.","version":"2.0.0","timestamp":"2024-11-13T10:34:26.741Z","docs":"https://www.bitmex.com/app/wsAPI","heartbeatEnabled":false,"limit":{"remaining":719}}
{"status":400,"error":"Unrecognized request. See the docs or send 'help' for more details. Please see the documentation at https://www.bitmex.com/app/wsAPI.","meta":{},"request":{}}
{"success":true,"subscribe":"liquidation:XBTUSD","request":{"op":"subscribe","args":["liquidation:XBTUSD","liquidation:XBTUSDT","liquidation:ETHUSD","liquidation:ETHUSDT"]}}
{"table":"liquidation","action":"partial","keys":["orderID"],"types":{"orderID":"guid","symbol":"symbol","side":"symbol","price":"float","leavesQty":"long"},"filter":{},"data":[]}
{"success":true,"subscribe":"liquidation:XBTUSDT","request":{"op":"subscribe","args":["liquidation:XBTUSD","liquidation:XBTUSDT","liquidation:ETHUSD","liquidation:ETHUSDT"]}}
{"table":"liquidation","action":"partial","keys":["orderID"],"types":{"orderID":"guid","symbol":"symbol","side":"symbol","price":"float","leavesQty":"long"},"filter":{},"data":[]}
{"success":true,"subscribe":"liquidation:ETHUSD","request":{"op":"subscribe","args":["liquidation:XBTUSD","liquidation:XBTUSDT","liquidation:ETHUSD","liquidation:ETHUSDT"]}}
{"table":"liquidation","action":"partial","keys":["orderID"],"types":{"orderID":"guid","symbol":"symbol","side":"symbol","price":"float","leavesQty":"long"},"filter":{},"data":[]}
{"success":true,"subscribe":"liquidation:ETHUSDT","request":{"op":"subscribe","args":["liquidation:XBTUSD","liquidation:XBTUSDT","liquidation:ETHUSD","liquidation:ETHUSDT"]}}
{"table":"liquidation","action":"partial","keys":["orderID"],"types":{"orderID":"guid","symbol":"symbol","side":"symbol","price":"float","leavesQty":"long"},"filter":{},"data":[]}
{"table":"liquidation","action":"insert","data":[{"orderID":"9a519e00-4fe7-4f17-9629-e48f6d3ab21d","symbol":"XBTUSDT","side":"Buy","price":87785.3,"leavesQty":39700}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"9a519e00-4fe7-4f17-9629-e48f6d3ab21d","symbol":"XBTUSDT"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"63689d12-d539-45f9-977f-deafdf5d3c41","symbol":"XBTUSD","side":"Buy","price":88051.8,"leavesQty":1500}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"63689d12-d539-45f9-977f-deafdf5d3c41","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"f4bc97af-7f2a-46ac-8cfd-00a366982b18","symbol":"XBTUSDT","side":"Buy","price":87989.7,"leavesQty":31000}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"f4bc97af-7f2a-46ac-8cfd-00a366982b18","symbol":"XBTUSDT"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"9ce0bda3-b78c-4ec8-8562-8a83e37c431b","symbol":"XBTUSD","side":"Buy","price":88195.8,"leavesQty":2000}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"9ce0bda3-b78c-4ec8-8562-8a83e37c431b","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"4ce9277e-0663-476c-a672-5aefab2bcfec","symbol":"XBTUSD","side":"Buy","price":88225.6,"leavesQty":15800}]}
{"table":"liquidation","action":"update","data":[{"orderID":"4ce9277e-0663-476c-a672-5aefab2bcfec","symbol":"XBTUSD","price":88234.5}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"4ce9277e-0663-476c-a672-5aefab2bcfec","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"8c808f22-254c-49d9-b24a-a99329b9f6d4","symbol":"XBTUSD","side":"Buy","price":88303.7,"leavesQty":50900}]}
{"table":"liquidation","action":"update","data":[{"orderID":"8c808f22-254c-49d9-b24a-a99329b9f6d4","symbol":"XBTUSD","leavesQty":50700}]}
{"table":"liquidation","action":"update","data":[{"orderID":"8c808f22-254c-49d9-b24a-a99329b9f6d4","symbol":"XBTUSD","leavesQty":50500}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"8c808f22-254c-49d9-b24a-a99329b9f6d4","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"c919abc3-30f8-4321-aeed-ee81dd40aa51","symbol":"XBTUSDT","side":"Buy","price":88263.5,"leavesQty":20000}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"c919abc3-30f8-4321-aeed-ee81dd40aa51","symbol":"XBTUSDT"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"e42d57c2-977f-4535-8428-608a379cebdf","symbol":"XBTUSD","side":"Buy","price":88635.6,"leavesQty":12900}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"a8a1118f-fafe-4d58-9530-064952019f58","symbol":"XBTUSDT","side":"Buy","price":88502.3,"leavesQty":150000}]}
{"table":"liquidation","action":"update","data":[{"orderID":"e42d57c2-977f-4535-8428-608a379cebdf","symbol":"XBTUSD","price":88753.4,"leavesQty":21600}]}
{"table":"liquidation","action":"update","data":[{"orderID":"a8a1118f-fafe-4d58-9530-064952019f58","symbol":"XBTUSDT","price":88637.0,"leavesQty":150000}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"190cb18e-f537-46b4-ac4b-25edaf28c677","symbol":"ETHUSD","side":"Buy","price":3208.61,"leavesQty":40}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"e42d57c2-977f-4535-8428-608a379cebdf","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"a8a1118f-fafe-4d58-9530-064952019f58","symbol":"XBTUSDT"}]}
{"table":"liquidation","action":"update","data":[{"orderID":"190cb18e-f537-46b4-ac4b-25edaf28c677","symbol":"ETHUSD","price":3210.0}]}
{"table":"liquidation","action":"update","data":[{"orderID":"190cb18e-f537-46b4-ac4b-25edaf28c677","symbol":"ETHUSD","leavesQty":20}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"190cb18e-f537-46b4-ac4b-25edaf28c677","symbol":"ETHUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"749134b5-8b4e-48d3-ab56-3495e8c58957","symbol":"XBTUSD","side":"Sell","price":90396.3,"leavesQty":891800}]}
{"table":"liquidation","action":"update","data":[{"orderID":"749134b5-8b4e-48d3-ab56-3495e8c58957","symbol":"XBTUSD","leavesQty":855700}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"749134b5-8b4e-48d3-ab56-3495e8c58957","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"f308f726-159b-4bd9-b197-24d330c8d054","symbol":"XBTUSD","side":"Sell","price":90767.7,"leavesQty":16000}]}
{"table":"liquidation","action":"update","data":[{"orderID":"f308f726-159b-4bd9-b197-24d330c8d054","symbol":"XBTUSD","price":90742.9}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"f308f726-159b-4bd9-b197-24d330c8d054","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"92603dfa-3181-4e73-aefa-99e539307996","symbol":"XBTUSD","side":"Sell","price":90300.8,"leavesQty":900}]}
{"table":"liquidation","action":"update","data":[{"orderID":"92603dfa-3181-4e73-aefa-99e539307996","symbol":"XBTUSD","price":90214.5,"leavesQty":1400}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"92603dfa-3181-4e73-aefa-99e539307996","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"37d310fd-54ed-40be-aeb2-3d5f3027a216","symbol":"XBTUSD","side":"Sell","price":90120.7,"leavesQty":50000}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"31ca7671-2d3e-40b5-a359-e77b0d4d2d0e","symbol":"ETHUSD","side":"Sell","price":3163.32,"leavesQty":80}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"31ca7671-2d3e-40b5-a359-e77b0d4d2d0e","symbol":"ETHUSD"}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"37d310fd-54ed-40be-aeb2-3d5f3027a216","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"5ee2dd57-2a74-456c-9426-1a0383ee7e3c","symbol":"XBTUSD","side":"Sell","price":90199.0,"leavesQty":2000}]}
{"table":"liquidation","action":"update","data":[{"orderID":"5ee2dd57-2a74-456c-9426-1a0383ee7e3c","symbol":"XBTUSD","price":90162.2}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"5ee2dd57-2a74-456c-9426-1a0383ee7e3c","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"e5c01ad9-8cc2-4961-a047-a6de8c24e4cf","symbol":"ETHUSD","side":"Sell","price":3163.99,"leavesQty":24}]}
{"table":"liquidation","action":"update","data":[{"orderID":"e5c01ad9-8cc2-4961-a047-a6de8c24e4cf","symbol":"ETHUSD","price":3163.65}]}
{"table":"liquidation","action":"update","data":[{"orderID":"e5c01ad9-8cc2-4961-a047-a6de8c24e4cf","symbol":"ETHUSD","price":3160.49}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"e5c01ad9-8cc2-4961-a047-a6de8c24e4cf","symbol":"ETHUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"890ffbd4-dd02-4d3a-8a36-eb519e4d3513","symbol":"XBTUSDT","side":"Buy","price":90748.8,"leavesQty":10800}]}
{"table":"liquidation","action":"update","data":[{"orderID":"890ffbd4-dd02-4d3a-8a36-eb519e4d3513","symbol":"XBTUSDT","price":90789.6}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"890ffbd4-dd02-4d3a-8a36-eb519e4d3513","symbol":"XBTUSDT"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"9df4825d-3a7e-41a5-b979-14bd98719fa7","symbol":"XBTUSD","side":"Buy","price":90808.6,"leavesQty":78000}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"9df4825d-3a7e-41a5-b979-14bd98719fa7","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"a6eb4749-5928-47ec-aedc-7f422f9f51b8","symbol":"XBTUSD","side":"Sell","price":90318.1,"leavesQty":5600}]}
{"table":"liquidation","action":"update","data":[{"orderID":"a6eb4749-5928-47ec-aedc-7f422f9f51b8","symbol":"XBTUSD","price":90295.6}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"a6eb4749-5928-47ec-aedc-7f422f9f51b8","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"e0ccfec9-1215-418e-9243-4630889b3fad","symbol":"ETHUSD","side":"Sell","price":3158.76,"leavesQty":5}]}
{"table":"liquidation","action":"update","data":[{"orderID":"e0ccfec9-1215-418e-9243-4630889b3fad","symbol":"ETHUSD","price":3157.62}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"40006369-689d-4cc5-8a76-bad0539de8cb","symbol":"XBTUSD","side":"Sell","price":89997.9,"leavesQty":2100}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"40006369-689d-4cc5-8a76-bad0539de8cb","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"e0ccfec9-1215-418e-9243-4630889b3fad","symbol":"ETHUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"b87da86b-758d-4d00-a09c-272953bbc921","symbol":"XBTUSD","side":"Sell","price":89628.8,"leavesQty":1000}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"b87da86b-758d-4d00-a09c-272953bbc921","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"20d0842e-a9d9-4404-b409-bd310be2db44","symbol":"XBTUSDT","side":"Sell","price":89440.2,"leavesQty":100}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"20d0842e-a9d9-4404-b409-bd310be2db44","symbol":"XBTUSDT"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"9851d405-aefe-4a15-8e72-2afb0a07bed3","symbol":"XBTUSD","side":"Sell","price":89482.2,"leavesQty":5100}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"48b807f8-305f-4cf2-a66e-d01187ca397a","symbol":"ETHUSD","side":"Sell","price":3135.38,"leavesQty":54}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"9851d405-aefe-4a15-8e72-2afb0a07bed3","symbol":"XBTUSD"}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"48b807f8-305f-4cf2-a66e-d01187ca397a","symbol":"ETHUSD"}]}
{"table":"liquidation","action":"insert","data":[{"orderID":"2929f163-dc8b-4aee-848e-71655e87d485","symbol":"XBTUSDT","side":"Buy","price":91102.6,"leavesQty":1000}]}
{"table":"liquidation","action":"delete","data":[{"orderID":"2929f163-dc8b-4aee-848e-71655e87d485","symbol":"XBTUSDT"}]}


876800 Long Liquidation: {"table":"liquidation","action":"insert","data":[{"orderID":"03f4bca6-1da5-4cd6-b905-cf98269417d4","symbol":"XBTUSD","side":"Sell","price":90927.1,"leavesQty":876800}]}
891800 Long Liquidation: {"table":"liquidation","action":"insert","data":[{"orderID":"749134b5-8b4e-48d3-ab56-3495e8c58957","symbol":"XBTUSD","side":"Sell","price":90396.3,"leavesQty":891800}]}
   */

  if (data.table === "liquidation" && data.action === "insert") {
    const o = data.data;
    if (o.posState === "Liquidated") {
      const liqInfo = {
        symbol: o.symbol,
        qty: o.currentQty,
        price: o.liquidationPrice,
        timestamp: o.timestamp,
      };
    }
  }
};

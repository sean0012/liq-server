import WebSocketClient from "./WebSocketClient.js";
import {
  getSubscribeArgsBitmex,
  insertLiquidation,
  syncSubscription,
} from "./util.js";

const BASE_URL = "wss://ws.bitmex.com/realtime";

const wsClient = new WebSocketClient(BASE_URL);

let subscribeArgs = [];

wsClient.socket.onopen = async () => {
  wsClient.send("WebSocket open:", BASE_URL);

  subscribeArgs = await getSubscribeArgsBitmex();
  const subscribeRequest = JSON.stringify({
    "op": "subscribe",
    "args": subscribeArgs,
  });
  wsClient.send(subscribeRequest);
};

wsClient.socket.onmessage = (message) => {
  if (message.data === "pong") return;

  const data = JSON.parse(message.data);
  console.log(message.data);
 
  // 876800 Long Liquidation: {"table":"liquidation","action":"insert","data":[{"orderID":"03f4bca6-1da5-4cd6-b905-cf98269417d4","symbol":"XBTUSD","side":"Sell","price":90927.1,"leavesQty":876800}]}
  // 891800 Long Liquidation: {"table":"liquidation","action":"insert","data":[{"orderID":"749134b5-8b4e-48d3-ab56-3495e8c58957","symbol":"XBTUSD","side":"Sell","price":90396.3,"leavesQty":891800}]}

  if (data.table === "liquidation" && data.action === "insert") {
    const dataArray = data.data;
    dataArray.map(o => {
      console.log("o:", o);
      const liqData = {
        exchange: "bitmex",
        symbol: o.symbol,
        side: o.side.toUpperCase(),
        qty: o.leavesQty,
        price: o.price,
        timestamp: Date.now(),
      };
      insertLiquidation(liqData);
    });
  }
};

setInterval(async () => {
  const { subscribeList, unsubscribeList, newSubscribeArgs } = await syncSubscription(subscribeArgs);
  subscribeArgs = newSubscribeArgs;

  if (subscribeList.length) {
    console.log("NEW subscribe:", subscribeList);
    const request = JSON.stringify({
      "op": "subscribe",
      "args": subscribeList,
    });
    wsClient.send(request);
  }

  if (unsubscribeList.length) {
    console.log("UNsubscribe:", unsubscribeList);
    const request = JSON.stringify({
      "op": "unsubscribe",
      "args": unsubscribeList,
    });
    wsClient.send(request);
  }
}, 60 * 1000);
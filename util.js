import sql from "./db.js";

async function getMarkets(exchange) {
  const markets = await sql`
    SELECT symbol
    FROM markets
    WHERE active = ${ true } AND exchange = ${ exchange }
  `;
  return markets;
}

async function insertLiquidation({ exchange, symbol, side, qty, price, timestamp }) {
  console.log("insertLiquidation:", exchange, symbol, side, qty, price, timestamp);

  const markets = await sql`SELECT id FROM markets WHERE exchange=${exchange} AND symbol=${symbol}`;
  if (markets.length > 1) {
    console.error("markets exchange+symbol NOT unique");
    return;
  }
  if (markets.length === 0) {
    console.error(`market not found by exchange=${exchange} and symbol=${symbol}`);
    return;
  }
  const marketId = markets[0].id;
  console.log("marketId:", marketId, exchange, symbol);
  const inserted = await sql`
    INSERT INTO liquidations(market_id, side, qty, price, timestamp)
    VALUES (${marketId}, ${side}, ${qty}, ${price}, ${timestamp})
  `;
  console.log("inserted:", inserted);
}

async function getSubscribeArgsBitmex() {
  try {
    const rows = await getMarkets('bitmex');
    return rows.map(row => `liquidation:${row.symbol}`);
  } catch (error) {
    console.log("buildBitmexSubscribeArgs error:", error);
  }
}

async function syncSubscription(currentSubscribeArgs) {
  const newSubscribeArgs = await getSubscribeArgsBitmex();
  const subscribeList = newSubscribeArgs.filter(x => !currentSubscribeArgs.includes(x));
  const unsubscribeList = currentSubscribeArgs.filter(x => !newSubscribeArgs.includes(x));
  return { subscribeList, unsubscribeList, newSubscribeArgs };
}

export { getSubscribeArgsBitmex, insertLiquidation, syncSubscription };

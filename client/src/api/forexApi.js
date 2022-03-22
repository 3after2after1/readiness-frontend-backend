import { BACKEND_DOMAIN } from "./backend";

// get historical OHLC data
export const getForexOHLCHistorical = (
  symbol,
  style,
  interval,
  end = "latest"
) => {
  let url = `${BACKEND_DOMAIN}/forex/historical?symbol=${symbol.toUpperCase()}&style=${style}&interval=${interval}&end=${end}`;
  let options = {
    method: "GET",
  };

  const promiseHistorical = fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    });

  return promiseHistorical;
};

// create server-sent-event connection
export class ForexTickConnection {
  constructor(symbol) {
    this.connection = new EventSource(
      `${BACKEND_DOMAIN}/forex/tick?symbol=${symbol.toUpperCase()}`
    );
  }
}

import { BACKEND_DOMAIN } from "./backend";

// get historical OHLC data
export const getCryptoOHLCHistorical = (symbol, interval) => {
  let url = `${BACKEND_DOMAIN}/crypto/historical?symbol=${symbol.toUpperCase()}&interval=${interval}`;
  let options = {
    method: "GET",
  };

  const promiseHistorical = fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => data.data);

  return promiseHistorical;
};

// create server-sent-event connection
export class CryptoTickConnection {
  constructor(symbol) {
    this.connection = new EventSource(
      `${BACKEND_DOMAIN}/crypto/tick?symbol=${symbol.toUpperCase()}`
    );
  }
}

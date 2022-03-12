// get historical OHLC data
export const getForexOHLCHistorical = (symbol, style, interval) => {
  let url = `http://localhost:5000/forex/historical?symbol=${symbol}&style=${style}&interval=${interval}`;
  let options = {
    method: "GET",
  };

  const promiseHistorical = fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => data.data);

  return promiseHistorical;
};

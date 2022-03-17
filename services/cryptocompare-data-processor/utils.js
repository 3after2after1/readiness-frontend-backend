// change tick format
const changeTickFormat = (tick) => {
  return {
    symbol: tick.FROMSYMBOL,
    date: new Date(tick.LASTUPDATE * 1000),
    price: tick.PRICE,
  };
};

// convert historical ohlc data to standardized objects
const processHistoricalOHLC = (data) => {
  return data.map((item) => {
    return {
      date: new Date(item.time * 1000),
      volume: 0,
      high: item.high,
      low: item.low,
      open: item.open,
      close: item.close,
    };
  });
};

module.exports = {
  changeTickFormat,
  processHistoricalOHLC,
};

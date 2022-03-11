// change tick format
const changeTickFormat = (tick) => {
  return {
    symbol: tick.symbol,
    date: new Date(tick.epoch * 1000),
    price: tick.quote,
  };
};

// process historical OHLC
const processHistoricalOHLC = (data) => {
  return data.map((ohlc) => {
    return {
      date: new Date(ohlc.epoch * 1000),
      high: ohlc.high,
      low: ohlc.low,
      open: ohlc.open,
      close: ohlc.close,
      volume: 0,
    };
  });
};

module.exports = {
  changeTickFormat,
  processHistoricalOHLC,
};

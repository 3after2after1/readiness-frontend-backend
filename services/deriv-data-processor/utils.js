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

// process historical ticks
const processHistoricalTicks = (data) => {
  let processedData = [];
  for (let i = 0; i < data.prices.length; i++) {
    let price = data.prices[i];
    processedData.push({
      date: new Date(data.times[i] * 1000),
      open: price,
      close: price,
      high: price,
      low: price,
      volume: 0,
    });
  }

  return processedData;
};

module.exports = {
  changeTickFormat,
  processHistoricalOHLC,
  processHistoricalTicks,
};

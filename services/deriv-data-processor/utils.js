// change tick format
const changeTickFormat = (tick) => {
  return {
    symbol: tick.symbol,
    date: new Date(tick.epoch * 1000),
    price: tick.quote,
  };
};

module.exports = {
  changeTickFormat,
};

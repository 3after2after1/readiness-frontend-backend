// change tick format
const changeTickFormat = (tick) => {
  return {
    symbol: tick.FROMSYMBOL,
    date: new Date(tick.LASTUPDATE * 1000),
    price: tick.PRICE,
  };
};

module.exports = {
  changeTickFormat,
};

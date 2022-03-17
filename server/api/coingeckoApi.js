//for crypto
const SingleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;
const TrendingCoins = () => `https://api.coingecko.com/api/v3/search/trending`;
const CoinList = () =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`;

module.exports = {
  SingleCoin,
  TrendingCoins,
  CoinList,
};

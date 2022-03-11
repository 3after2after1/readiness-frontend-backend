const OHLCIntervals = {
  one_tick: { name: "one_tick", unit: "tick", value: 1, seconds: 1 },
  one_minute: { name: "one_minute", unit: "minute", value: 1, seconds: 60 },
  two_minute: { name: "two_minute", unit: "minute", value: 2, seconds: 120 },
  three_minute: {
    name: "three_minute",
    unit: "minute",
    value: 3,
    seconds: 180,
  },
  five_minute: { name: "five_minute", unit: "minute", value: 5, seconds: 300 },
  ten_minute: { name: "ten_minute", unit: "minute", value: 10, seconds: 600 },
  fifteen_minute: {
    name: "fifteen_minute",
    unit: "minute",
    value: 15,
    seconds: 900,
  },
  thirty_minute: {
    name: "thirty_minute",
    unit: "minute",
    value: 30,
    seconds: 1800,
  },
  one_hour: { name: "one_hour", unit: "hour", value: 1, seconds: 3600 },
  four_hour: { name: "four_hour", unit: "hour", value: 4, seconds: 7200 },
  eight_hour: { name: "eight_hour", unit: "hour", value: 8, seconds: 28800 },
  one_day: { name: "one_day", unit: "day", value: 1, seconds: 86400 },
};

module.exports = {
  OHLCIntervals,
};

import Cheerio from "cheerio";

export const getForexInfo = (from, to) => {
  // let url = `https://cors-anywhere.herokuapp.com/https://www.dailyfx.com/${from}-${to}`;
  let url = `https://www.dailyfx.com/${from}-${to}`;

  let headers = {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
  };

  const promiseInfo = fetch(url, headers)
    .then((response) => response.text())
    .then((data) => {
      const $ = Cheerio.load(data);

      let description = getDescription($);
      let supports = getSupport($);
      let resists = getResist($);
      let pivotData = getPivotData($);

      let symbol = (from + to).toUpperCase();

      return {
        symbol: symbol,
        description: description,
        support: supports,
        resist: resists,
        pivot: pivotData,
      };
    });

  return promiseInfo;
};

// get description
const getDescription = ($) => {
  const dataMain = $(".dfx-viewMore");
  const output = dataMain.find(".dfx-viewMore__content").text();

  return output;
};

// get support list
const getSupport = ($) => {
  const supportList = $(".dfx-supportResistanceBlock__valuesS.mr-1.mr-md-0");

  const s1 = supportList.find(".dfx-supportResistanceBlock__valueRow");
  const s2 = s1.next();
  const s3 = s2.next();

  const supports = [s1, s2, s3];
  const supportObjs = [];

  supports.forEach((item) => {
    let classes = item.find("div").find("div").attr("class");
    let support = {
      s: item.find(".dfx-supportResistanceBlock__valueName.mx-1").html(),
      value: item.find(".dfx-supportResistanceBlock__valueLevel.mx-1").html(),
      strength: checkStrength(classes),
    };

    supportObjs.push(support);
  });

  return supportObjs;
};

// get resistance list
const getResist = ($) => {
  const resistList = $(".dfx-supportResistanceBlock__valuesR.ml-1.ml-md-0");
  const r1 = resistList.find(".dfx-supportResistanceBlock__valueRow");
  const r2 = r1.next();
  const r3 = r2.next();

  const resistances = [r1, r2, r3];
  const resistObjs = [];

  resistances.forEach((item) => {
    let classes = item.find("div").find("div").attr("class");
    let resistance = {
      r: item.find(".dfx-supportResistanceBlock__valueName.mx-1").html(),
      value: item.find(".dfx-supportResistanceBlock__valueLevel.mx-1").html(),
      strength: checkStrength(classes),
    };
    resistObjs.push(resistance);
  });

  return resistObjs;
};

// match support and resistance strength
const checkStrength = (classes) => {
  let strength = null;
  if (classes.includes("strong")) strength = "strong";
  else if (classes.includes("moderate")) strength = "moderate";
  else if (classes.includes("weak")) strength = "weak";

  return strength;
};

// get pivot data
const getPivotData = ($) => {
  const pivotTable = $("div").find(".dfx-pivotPointsComponent__tableRow");
  let pivotObjs = [];
  for (let i = 1; i < 9; i++) {
    let node = pivotTable.find(`div:nth-child(${i})`);
    if (node.html()) {
      let pivot = {
        pivot: node.find("span").html().replace(/\s/g, ""),
        point: node.find("span").next().html().replace(/\s/g, ""),
      };
      pivotObjs.push(pivot);
    }
  }

  return pivotObjs;
};

export const getFrxInfo = (symbol) => {
  console.log("inside getfrxsymbol");
  let url = `http://localhost:4444/forex?symbol=${symbol}`;
  let options = {
    method: "GET",
  };

  const promiseInfo = fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => data.data.data);

  return promiseInfo;
};

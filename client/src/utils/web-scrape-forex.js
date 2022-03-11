export const getFrxInfo = (symbol) => {
  console.log("inside getfrxsymbol");
  let url = `http://localhost:5000/forex/info?symbol=${symbol}`;
  let options = {
    method: "GET",
  };

  const promiseInfo = fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => {
      return data.data;
    });

  return promiseInfo;
};

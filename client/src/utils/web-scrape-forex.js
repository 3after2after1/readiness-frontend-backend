import { BACKEND_DOMAIN } from "../api/backend";

export const getFrxInfo = (symbol) => {
  let url = `${BACKEND_DOMAIN}/forex/info?symbol=${symbol}`;
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

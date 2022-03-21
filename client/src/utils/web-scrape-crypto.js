import { BACKEND_DOMAIN } from "../api/backend";
import axios from "axios";

export const getCryptoInfo = async (name, symbol) => {
  console.log("crypto name", name);
  if (name === "polkadot") {
    name = "polkadot-new";
  }
  let site_url = `${BACKEND_DOMAIN}/crypto/info?name=${name}`;
  try {
    const { data } = await axios({
      method: "GET",
      url: site_url,
    });
    console.log("crypto_scrape", data);

    return { description: data };
  } catch (error) {
    try {
      console.log("trying new way", `${name}-${symbol}`);
      let site_url = `${BACKEND_DOMAIN}/crypto/info?name=${name}-${symbol}`;
      const { data } = await axios({
        method: "GET",
        url: site_url,
      });
      console.log("success", data);
      return { description: data };
    } catch (error) {
      return { description: null };
    }
  }
};

export const getCryptoStats = async (symbol) => {
  let site_url = `${BACKEND_DOMAIN}/crypto/stats?symbol=${symbol}`;
  try {
    const { data } = await axios({
      method: "GET",
      url: site_url,
    });

    return { stats: data };
  } catch (error) {
    return { stats: null };
  }
};

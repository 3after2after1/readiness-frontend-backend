import React, { useEffect, useState } from "react";
import DetailsPage from "../../components/Details/card-details/card-details";
import CardDetailsAdd from "../../components/Details/card-details/card-details-add";
import DetailsStats from "../../components/Details/card-details/card-details-stats";
// import DetailsStatsContent from "../../components/details-stats-content";
import Container from "@mui/material/Box";
import { useParams } from "react-router";
import { markets } from "../../utils/utils";
import { getFrxInfo } from "../../utils/web-scrape-forex";
import { useLocation } from "react-router-dom";
import { getCryptoInfo, getCryptoStats } from "../../utils/web-scrape-crypto";
import "./Details.css";

// using client-web-scraper
// import { getForexInfo } from "../../utils/backup/scrape-forex-info";

function Details(props) {
  //  watchListInitializer();
  console.log("spamming");
  const [instrumentInfo, setInstrumentInfo] = useState({});
  //instrumentInfo has two properties, stats and desc
  const [currentPrice, setCurrentPrice] = useState("-");
  let { market, symbol } = useParams();
  if (!market) market = props.market;
  if (!symbol) symbol = props.symbol;
  const { state } = useLocation();
  let imageInput = null;

  if (market === "crypto") {
    imageInput = state
      ? state.image || state.large
      : `https://app.intotheblock.com/static-assets/coins/${symbol}.png` ||
        "http://cdn.onlinewebfonts.com/svg/img_462420.png";
  }

  if (market === "forex") {
    imageInput = state
      ? state.image ||
        `https://etoro-cdn.etorostatic.com/market-avatars/${symbol}/70x70.png`
      : "http://cdn.onlinewebfonts.com/svg/img_462420.png";
  }

  let nameInput = state ? state.name : symbol;
  let watchListData = {
    image: imageInput,
    name: nameInput,
    symbol,
    market,
  };
  const handleCurrentPrice = (price) => {
    setCurrentPrice(price);
  };

  // get forex information
  useEffect(() => {
    if (market === markets.forex) {
      // example: eurusd
      // server-web-scraper
      getFrxInfo(symbol).then((data) => {
        setInstrumentInfo(data);
      });

      // getForexInfo(symbol.substr(0, 3), symbol.substring(3)).then((data) => {
      //   setInstrumentInfo(data);
      //   console.log(data);
      // });
    } else {
      getCryptoInfo(nameInput.toLowerCase(), symbol.toLocaleLowerCase()).then(
        (data) => {
          console.log("scrape data ", data);
          setInstrumentInfo((prev) => {
            return { ...prev, description: data.description };
          });
        }
      );

      getCryptoStats(symbol.toUpperCase()).then((data) => {
        console.log("stats data ", data);
        setInstrumentInfo((prev) => {
          return { ...prev, stats: data.stats };
        });
      });
    }
  }, []);

  return (
    <div className="main-container-details">
      <div className="content">
        <div className="content-title-details">
          <div className="content-title-left">
            <div className="icon-company" id="icon-company">
              {state && (
                <img
                  src={state.image || state.large}
                  style={{ height: "4rem" }}
                />
              )}
            </div>
            <div className="company-box">
              <column>
                <row>
                  <div id="company-name" className="company-name">
                    {symbol.toUpperCase()}
                  </div>
                </row>
                <row>
                  <div className="company-box">
                    <span className="currency-price" id="currency-price">
                      {currentPrice}
                    </span>
                    <span className="currency" id="currency">
                      USD{" "}
                    </span>
                    <span
                      className="currency-volatality"
                      id="currency-volatality"
                    >
                      {" "}
                      0.24(0.14%)
                    </span>
                  </div>
                </row>
              </column>
            </div>
          </div>

          <div className="content-title-right-icon">
            <CardDetailsAdd watchListData={watchListData} />
          </div>
        </div>

        <Container>
          <DetailsPage
            market={market}
            symbol={symbol}
            getCurrentPrice={handleCurrentPrice}
          />
        </Container>

        <Container>
          {market === markets.forex ? (
            <DetailsStats
              dataStats={instrumentInfo.stats}
              dataDescription={instrumentInfo.description}
              market="forex"
            />
          ) : (
            <DetailsStats
              dataStats={instrumentInfo.stats}
              dataDescription={instrumentInfo.description}
              market="crypto"
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default Details;

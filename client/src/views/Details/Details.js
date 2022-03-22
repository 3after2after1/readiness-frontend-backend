import React, { useEffect, useState } from "react";
import DetailsPage from "../../components/Details/card-details/card-details";
import CardDetailsAdd from "../../components/Details/card-details/card-details-add";
import DetailsStats from "../../components/Details/card-details/card-details-stats";
import Container from "@mui/material/Box";
import { useParams } from "react-router";
import { markets } from "../../utils/utils";
import { getFrxInfo } from "../../utils/web-scrape-forex";
import { useLocation } from "react-router-dom";
import { getCryptoInfo, getCryptoStats } from "../../utils/web-scrape-crypto";
import "./Details.css";
import { LinearProgress } from "@material-ui/core";
import { Navigate } from "react-router-dom";

function Details(props) {
  //  watchListInitializer();
  const [instrumentInfo, setInstrumentInfo] = useState({});
  //instrumentInfo has two properties, stats and desc
  const [symbolError, setSymbolError] = useState("");
  const [priceSummary, setPriceSummary] = useState(null);

  let { market, symbol } = useParams();
  if (!market) market = props.market;
  if (!symbol) symbol = props.symbol;
  const location = useLocation();
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
  const handleCurrentPrice = (item) => {
    setPriceSummary(item);
  };

  const handleInvalidSymbol = (error, market) => {
    setSymbolError(error);
  };

  const PriceChange = ({ change }) => {
    let style;
    if (change > 0.0) {
      style = { color: "green" };
    } else if (change < 0.0) {
      style = { color: "red" };
    } else style = { color: "black" };

    return <div style={style}>{change}</div>;
  };

  // get forex information
  useEffect(() => {
    if (market === markets.forex) {
      // example: eurusd
      // server-web-scraper
      getFrxInfo(symbol).then((data) => {
        setInstrumentInfo(data);
      });
    } else {
      getCryptoInfo(nameInput.toLowerCase(), symbol.toLocaleLowerCase()).then(
        (data) => {
          setInstrumentInfo((prev) => {
            return { ...prev, description: data.description };
          });
        }
      );

      getCryptoStats(symbol.toUpperCase()).then((data) => {
        setInstrumentInfo((prev) => {
          return { ...prev, stats: data.stats };
        });
      });
    }
  }, []);

  if (symbolError.toLowerCase() === "invalidsymbol") {
    return (
      <Navigate
        to="/forex"
        state={{ from: location, error: "invalid symbol" }}
      />
    );
  } else if (symbolError.toLowerCase() === "marketnodata") {
    return (
      <Navigate
        to="/crypto"
        state={{ from: location, error: "no data exist" }}
      />
    );
  }
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
                      {priceSummary
                        ? Number(priceSummary.current).toFixed(4)
                        : " - "}
                    </span>
                    <span className="currency" id="currency">
                      USD
                    </span>
                    <span
                      className="currency-volatality"
                      id="currency-volatality"
                    >
                      {priceSummary
                        ? priceSummary.priceChange !== null && (
                            <PriceChange
                              change={priceSummary.priceChange.toFixed(4)}
                            />
                          )
                        : " - "}
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
            handleSymbol={handleInvalidSymbol}
          />
        </Container>

        <Container>
          {Object.keys(instrumentInfo).length !== 0 ? (
            market === markets.forex ? (
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
            )
          ) : (
            <LinearProgress style={{ background: "gold" }} />
          )}
        </Container>
      </div>
    </div>
  );
}

export default Details;

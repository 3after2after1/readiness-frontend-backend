import React, { useEffect, useState } from "react";
import "./Details.css";
import DetailsPage from "../../components/Details/card-details/card-details";
import CardDetailsAdd from "../../components/Details/card-details/card-details-add";
import DetailsStats from "../../components/Details/card-details/card-details-stats";
// import DetailsStatsContent from "../../components/details-stats-content";
import Container from "@mui/material/Box";
import { useParams } from "react-router";
import { markets } from "../../utils/utils";
import { getFrxInfo } from "../../utils/web-scrape-forex";
import { useLocation } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

// using client-web-scraper
// import { getForexInfo } from "../../utils/backup/scrape-forex-info";

function Details(props) {
  const [instrumentInfo, setInstrumentInfo] = useState({});
  //instrumentInfo has two properties, stats and desc
  const [currentPrice, setCurrentPrice] = useState("-");
  const [previousPrice, setPreviousPrice] = useState("");
  const [priceChange, setPriceChange] = useState("-");
  const [percentagePriceChange, setPercentagePriceChange] = useState("-");
  const [symbolError, setSymbolError] = useState("");
  const [priceSummary, setPriceSummary] = useState(null);

  let { market, symbol } = useParams();
  if (!market) market = props.market;
  if (!symbol) symbol = props.symbol;
  const location = useLocation();
  const { state } = useLocation();
  let imageInput = state
    ? state.image || state.large
    : "http://cdn.onlinewebfonts.com/svg/img_462420.png";
  let nameInput = state ? state.name : "missing name";
  let watchListData = {
    image: imageInput,
    name: nameInput,
    symbol,
    market,
  };
  const handleCurrentPrice = (item) => {
    console.log("receive item price summary: ", item);
    setPriceSummary(item);
  };

  const handleInvalidSymbol = (error, market) => {
    console.log("handling error ", error);
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
        console.log("scrape data ", data);
        setInstrumentInfo(data);
      });

      // getForexInfo(symbol.substr(0, 3), symbol.substring(3)).then((data) => {
      //   setInstrumentInfo(data);
      //   console.log(data);
      // });
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
              />
            ) : (
              "loading..."
            )
          ) : (
            <LinearProgress style={{ background: "gold" }} />
          )}
        </Container>
      </div>

      {/* <div classname="footer-content">
        <Footer />
      </div> */}
    </div>
  );
}

export default Details;

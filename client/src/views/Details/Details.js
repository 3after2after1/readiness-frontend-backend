import React, { useEffect, useState } from "react";
import "./Details.css";
import DetailsPage from "../../components/Details/card-details/card-details";
import CardDetailsAdd from "../../components/Details/card-details/card-details-add";
import DetailsStats from "../../components/Details/card-details/card-details-stats";
// import DetailsStatsContent from "../../components/details-stats-content";
// import Footer from "../../components/Footer";
import Container from "@mui/material/Box";
import { useParams } from "react-router";
import { markets } from "../../utils/utils";
import { getFrxInfo } from "../../utils/web-scrape-forex";
import { useLocation } from "react-router-dom";
import { height } from "@mui/system";
// using client-web-scraper
// import { getForexInfo } from "../../utils/backup/scrape-forex-info";

function Details(props) {
  const [instrumentInfo, setInstrumentInfo] = useState({});
  //instrumentInfo has two properties, stats and desc
  let { market, symbol } = useParams();
  if (!market) market = props.market;
  if (!symbol) symbol = props.symbol;

  const { state } = useLocation();
  console.log(state);

  // get forex information
  useEffect(() => {
    if (market === markets.forex) {
      // example: eurusd
      // server-web-scraper
      getFrxInfo(symbol).then((data) => {
        console.log("scrape data ", data);
        setInstrumentInfo(data);
      });

      // // client-web-scraper
      // getForexInfo(symbol.substr(0, 3), symbol.substring(3)).then((data) => {
      //   setInstrumentInfo(data);
      //   console.log(data);
      // });
    }
  }, []);

  return (
    <div className="main-container-details">
      <div className="content">
        <div className="content-title-details">
          <div className="content-title-left">
            <div className="icon-company" id="icon-company">
              <img src={state.image} style={{ height: "4rem" }} />
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
                      188.99
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
            <CardDetailsAdd />
          </div>
        </div>

        <Container>
          <DetailsPage market={market} symbol={symbol} />
        </Container>

        <Container>
          {market === markets.forex ? (
            <DetailsStats
              dataStats={instrumentInfo.stats}
              dataDescription={instrumentInfo.description}
            />
          ) : (
            "loading..."
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

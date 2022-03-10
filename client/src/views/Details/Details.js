import React, { useEffect, useState } from "react";
import "./Details.css";
import DetailsPage from "../../components/Details/card-details/card-details";
import CardDetailsAdd from "../../components/Details/card-details/card-details-add";
import DetailsStats from "../../components/Details/card-details/card-details-stats";
// import DetailsStatsContent from "../../components/details-stats-content";
// import Footer from "../../components/Footer";
import Container from "@mui/material/Box";

import { getFrxInfo } from "../../utils/web-scrape-forex";

function Details() {
  const [instrumentInfo, setInstrumentInfo] = useState({});

  // get forex information
  useEffect(() => {
    getFrxInfo("eurusd").then((data) => {
      setInstrumentInfo(data);
    });
  }, []);

  return (
    <div className="main-container-details">
      <div className="content">
        <div className="content-title-details">
          <div className="content-title-left">
            <div className="icon-company" id="icon-company">
              Image
            </div>
            <div className="company-box">
              <column>
                <row>
                  <div id="company-name" className="company-name">
                    AAPL | APPLE
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
          <DetailsPage />
        </Container>

        <Container>
          <DetailsStats
            dataStats={instrumentInfo.stats}
            dataDescription={instrumentInfo.description}
          />
        </Container>
      </div>

      {/* <div classname="footer-content">
        <Footer />
      </div> */}
    </div>
  );
}

export default Details;

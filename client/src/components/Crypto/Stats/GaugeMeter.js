import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { LinearProgress } from "@material-ui/core";
import "./GaugeMeter.css";

const GaugeMeter = ({ data }) => {
  console.log("reached gauge", data);
  const chartStyle = {
    height: "50px",
    width: "280px",
    color: "black",
  };
  const subChartStyle = {
    height: "100px",
    width: "280px",
    color: "black",
  };

  const findDominantSignal = ({ thresholds, score, ...rest }) => {
    return Object.keys(rest).reduce((a, b) => (rest[a] > rest[b] ? a : b));
  };

  const findSignalGivenThresholds = (scoreArray, score) => {
    const [lower, upper] = scoreArray;
    if (score <= lower) return "bearish";
    else if (score <= upper) return "neutral";
    else return "bullish";
  };

  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(data);
  }, []);

  return (
    <>
      {stats === null ? (
        <LinearProgress style={{ background: "gold" }} />
      ) : (
        <div id="main-indictor-container">
          {console.log("data reached", stats)}
          <div id="summary">
            {/* main gauge */}
            <h4 style={{ padding: "1rem 0" }}>Summary</h4>
            <div className="gauge-chart1">
              <GaugeChart
                id="gauge-chart1"
                nrOfLevels={300}
                arcsLength={[0.4, 0.2, 0.4]}
                colors={[
                  "rgb(218, 78, 53)",
                  "rgb(174,183,209)",
                  "rgb(126, 211, 33)",
                ]}
                percent={stats.summary.score}
                arcPadding={0.02}
                arcWidth={0.05}
                style={chartStyle}
                hideText={true}
                needleBaseColor={"lightgrey"}
              />
            </div>
            <h5 className={findDominantSignal(stats.summary)}>
              Mostly {findDominantSignal(stats.summary).toUpperCase()}
            </h5>

            <div className="summary">
              <h5 className="textgauge">
                Bearish <h4 className="bearish"> {stats.summary.bearish}</h4>
              </h5>
              <h5 id="centergauge" className="textgauge">
                Neutral <h4 className="neutral">{stats.summary.neutral}</h4>
              </h5>
              <h5 className="textgauge">
                Bullish <h4 className="bullish">{stats.summary.bullish}</h4>
              </h5>
            </div>
          </div>
          <div id="summary">
            {/* other 3 small gauge meter */}
            <h4 style={{ padding: "0.8rem 0" }}>Onchain Signals</h4>
            <div className="gauge-chart2">
              <GaugeChart
                id="gauge-chart1"
                nrOfLevels={300}
                arcsLength={[0.4, 0.2, 0.4]}
                colors={[
                  "rgb(218, 78, 53)",
                  "rgb(174,183,209)",
                  "rgb(126, 211, 33)",
                ]}
                percent={stats.onChainSummary.score}
                arcPadding={0.02}
                arcWidth={0.05}
                style={subChartStyle}
                hideText={true}
                needleBaseColor={"lightgrey"}
              />
            </div>
            <div className="sub-summary2">
              <div className="rowgauge">
                <h5 className="textgauge">
                  Net Network Growth
                  <p className="hover">
                    Momentum signal that gives a pulse of the true growth of the
                    token’s underlying network (new addresses – addresses that
                    go to zero)
                  </p>
                </h5>
                <h5
                  className={stats.signals["Net Network Growth"]["sentiment"]}
                >
                  {(stats.signals["Net Network Growth"]["value"] * 100).toFixed(
                    2
                  )}{" "}
                  % {stats.signals["Net Network Growth"]["sentiment"]}
                </h5>
              </div>

              <div className="rowgauge">
                <h5 className="textgauge">
                  In the Money
                  <p className="hover">
                    Change in “In the Money” addresses momentum signal
                  </p>
                </h5>
                <h5 className={stats.signals["In the money"]["sentiment"]}>
                  {(stats.signals["In the money"]["value"] * 100).toFixed(2)} %{" "}
                  {stats.signals["In the money"]["sentiment"]}
                </h5>
              </div>

              <div className="rowgauge">
                <h5 className="textgauge">
                  Concentration
                  <p className="hover">
                    Accumulation (bullish) or reduction (bearish) of large
                    holders’ positions
                  </p>
                </h5>
                <h5 className={stats.signals["Concentration"]["sentiment"]}>
                  {(stats.signals["Concentration"]["value"] * 100).toFixed(2)} %{" "}
                  {stats.signals["Concentration"]["sentiment"]}
                </h5>
              </div>

              <div className="rowgauge">
                <h5 className="textgauge">
                  Large Transactions
                  <p className="hover">
                    Momentum indicator of number of transactions greater than
                    $100,000
                  </p>
                </h5>
                <h5
                  className={stats.signals["Large Transactions"]["sentiment"]}
                >
                  {(stats.signals["Large Transactions"]["value"] * 100).toFixed(
                    2
                  )}{" "}
                  % {stats.signals["Large Transactions"]["sentiment"]}
                </h5>
              </div>
            </div>
          </div>
          {/* <div id="summary">
            <h4 style={{ padding: "0.2rem 0" }}>Exchange Signals</h4>
            {stats.signals[5] ? (
              <>
                <div className="gauge-chart2">
                  <GaugeChart
                    id="gauge-chart1"
                    nrOfLevels={300}
                    arcsLength={[0.4, 0.2, 0.4]}
                    colors={[
                      "rgb(218, 78, 53)",
                      "rgb(174,183,209)",
                      "rgb(126, 211, 33)",
                    ]}
                    percent={stats.exchangeSummary.score}
                    arcPadding={0.02}
                    arcWidth={0.05}
                    style={subChartStyle}
                    hideText={true}
                    needleBaseColor={"lightgrey"}
                  />
                </div>
                <div className="sub-summary">
                  <div className="row2gauge">
                    <h5 className="textgauge">
                      Smart Price
                      <p className="hover">
                        A variation of the mid-price where the average of the
                        bid and ask prices is weighted according to their
                        inverse volume (ie the bid is weighted with the volume
                        posted at the ask, and the ask is weighted with the
                        volume posted at the bid)
                      </p>
                    </h5>
                    <h5
                      className={findSignalGivenThresholds(
                        Object.values(stats.signals[5].thresholds),
                        stats.signals[5].score
                      )}
                    >
                      {(stats.signals[5].value * 100).toFixed(2)} %
                      {findSignalGivenThresholds(
                        Object.values(stats.signals[5].thresholds),
                        stats.signals[5].score
                      )}
                    </h5>
                  </div>

                  <div className="row2gauge">
                    <h5 className="textgauge">
                      Bid-Ask Volume Imbalance
                      <p className="hover">
                        Volume at the bid price - Volume at the ask price
                      </p>
                    </h5>
                    <h5
                      className={findSignalGivenThresholds(
                        Object.values(stats.signals[6].thresholds),
                        stats.signals[6].score
                      )}
                    >
                      {(stats.signals[6].value * 100).toFixed(2)} %
                      {findSignalGivenThresholds(
                        Object.values(stats.signals[6].thresholds),
                        stats.signals[6].score
                      )}
                    </h5>
                  </div>

                  <div style={{ height: "2rem" }}></div>
                </div>
              </>
            ) : (
              <p
                style={{
                  width: "200px",
                  alignText: "center",
                  paddingLeft: "20px",
                }}
              >
                No Exchange Signal
              </p>
            )}
          </div> */}
          {/* <div id="summary">
            <h4 style={{ padding: "5rem 0 1rem 0" }}>Derivatives</h4>
            <div className="gauge-chart2" style={{ paddingBottom: "2.9rem" }}>
              <GaugeChart
                id="gauge-chart1"
                nrOfLevels={300}
                arcsLength={[0.4, 0.2, 0.4]}
                colors={[
                  "rgb(218, 78, 53)",
                  "rgb(174,183,209)",
                  "rgb(126, 211, 33)",
                ]}
                percent={stats.derivativesSummary.score}
                arcPadding={0.02}
                arcWidth={0.05}
                style={subChartStyle}
                hideText={true}
                needleBaseColor={"lightgrey"}
              />
            </div>
            <div className="sub-summary">
              <div className="row3gauge">
                <h5 className="textgauge">
                  Futures Market Momentum
                  <p className="hover">
                    Signal combining futures price, volume and open interest
                    assessing bullish or bearish momentum
                  </p>
                </h5>
                <h5
                  className={findSignalGivenThresholds(
                    Object.values(stats.signals[0].thresholds),
                    stats.signals[0].score
                  )}
                >
                  {(stats.signals[0].value * 100).toFixed(2)} %
                  {findSignalGivenThresholds(
                    Object.values(stats.signals[0].thresholds),
                    stats.signals[0].score
                  )}
                </h5>
              </div>

              <div style={{ height: "7rem" }}></div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default GaugeMeter;

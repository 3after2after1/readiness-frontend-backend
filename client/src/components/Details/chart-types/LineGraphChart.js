import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  ScatterSeries,
  CircleMarker,
  LineSeries,
  RSISeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  EdgeIndicator,
  CurrentCoordinate,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { ema, wma, sma, tma, rsi } from "react-stockcharts/lib/indicator";

import {
  OHLCTooltip,
  MovingAverageTooltip,
  RSITooltip,
} from "react-stockcharts/lib/tooltip";

import { chartIndicators } from "../../../utils/utils";

class LineAndScatterChart extends React.Component {
  render() {
    const {
      data: initialData,
      type,
      width,
      ratio,
      indicators,
      onLoadMore,
    } = this.props;
    const margin = { left: 60, right: 60, top: 10, bottom: 20 };

    const height = 500;
    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid
      ? {
          innerTickSize: -1 * gridWidth,
          tickStrokeDasharray: "ShortDash",
          tickStrokeOpacity: 0.2,
        }
      : {};
    const xGrid = showGrid
      ? {
          innerTickSize: -1 * gridHeight,
          tickStrokeDasharray: "ShortDash",
          tickStrokeOpacity: 0.2,
        }
      : {};

    const ema20 = ema()
      .options({
        windowSize: 20, // optional will default to 10
        sourcePath: "close", // optional will default to close as the source
      })
      .skipUndefined(true) // defaults to true
      .merge((d, c) => {
        d.ema20 = c;
      }) // Required, if not provided, log a error
      .accessor((d) => d.ema20) // Required, if not provided, log an error during calculation
      .stroke("blue"); // Optional

    const sma20 = sma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.sma20 = c;
      })
      .accessor((d) => d.sma20)
      .stroke("red"); // Optional

    const wma20 = wma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.wma20 = c;
      })
      .accessor((d) => d.wma20);

    const tma20 = tma()
      .options({ windowSize: 20 })
      .merge((d, c) => {
        d.tma20 = c;
      })
      .accessor((d) => d.tma20);

    const ema50 = ema()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ema50 = c;
      })
      .accessor((d) => d.ema50);

    const smaVolume50 = sma()
      .options({ windowSize: 20, sourcePath: "volume" })
      .merge((d, c) => {
        d.smaVolume50 = c;
      })
      .accessor((d) => d.smaVolume50)
      .stroke("#4682B4")
      .fill("#4682B4");

    const rsiCalculator = rsi()
      .options({ windowSize: 14 })
      .merge((d, c) => {
        d.rsi = c;
      })
      .accessor((d) => d.rsi);

    const calculatedData = ema20(
      sma20(wma20(tma20(ema50(smaVolume50(rsiCalculator(initialData))))))
    );

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(calculatedData);
    let numCandlesOnDisplay =
      data.length > Math.trunc(width / 30)
        ? Math.trunc(width / 30)
        : data.length;
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - numCandlesOnDisplay]),
    ];

    const changeScroll = () => {
      let position = document.body.style.position;
      document.body.style.position = position === "fixed" ? "static" : "fixed";
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    };
    return (
      <div onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
        <ChartCanvas
          ratio={ratio}
          width={width}
          height={height}
          margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
          type={type}
          pointsPerPxThreshold={1}
          seriesName="MSFT"
          data={data}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xScale={xScale}
          onLoadMore={onLoadMore}
          xExtents={xExtents}
        >
          <Chart
            id={1}
            yExtents={(d) => [d.high, d.low, d.AAPLClose, d.GEClose]}
            height={
              indicators.includes(chartIndicators.relative_strength_index) &&
              300
            }
          >
            <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
            <YAxis
              axisAt="right"
              orient="right"
              // tickInterval={5}
              // tickValues={[40, 60]}
              ticks={5}
              {...yGrid}
            />
            <OHLCTooltip origin={[-40, 0]} />
            <EdgeIndicator
              itemType="last"
              orient="right"
              edgeAt="right"
              yAccessor={(d) => d.close}
              fill={(d) => (d.close > d.open ? "#A2F5BF" : "#F9ACAA")}
              stroke={(d) => (d.close > d.open ? "#0B4228" : "#6A1B19")}
              textFill={(d) => (d.close > d.open ? "#0B4228" : "#420806")}
              strokeOpacity={1}
              strokeWidth={3}
              arrowWidth={2}
            />

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d %H:%M:%S %p")}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
            />

            <LineSeries yAccessor={(d) => d.close} strokeDasharray="LongDash" />
            {indicators.includes(chartIndicators.simple_moving_avg) && (
              <>
                <LineSeries
                  yAccessor={sma20.accessor()}
                  stroke={sma20.stroke()}
                />
                <CurrentCoordinate
                  yAccessor={sma20.accessor()}
                  fill={sma20.stroke()}
                />
                <MovingAverageTooltip
                  origin={[-38, 15]}
                  options={[
                    {
                      yAccessor: sma20.accessor(),
                      type: "SMA",
                      stroke: sma20.stroke(),
                      windowSize: sma20.options().windowSize,
                      echo: "some echo here",
                    },
                  ]}
                />
              </>
            )}

            <ScatterSeries
              yAccessor={(d) => d.close}
              marker={CircleMarker}
              markerProps={{ r: 3 }}
            />
          </Chart>
          {indicators.includes(chartIndicators.relative_strength_index) && (
            <Chart
              id={2}
              yExtents={[0, 100]}
              height={125}
              origin={(w, h) => [0, h - 135]}
            >
              <XAxis
                axisAt="bottom"
                orient="bottom"
                showTicks={false}
                outerTickSize={0}
              />
              <YAxis axisAt="right" orient="right" tickValues={[30, 50, 70]} />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />

              <RSISeries yAccessor={(d) => d.rsi} />

              <RSITooltip
                origin={[-38, 15]}
                yAccessor={(d) => d.rsi}
                options={rsiCalculator.options()}
              />
            </Chart>
          )}
          <CrossHairCursor />
        </ChartCanvas>
      </div>
    );
  }
}

LineAndScatterChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineAndScatterChart.defaultProps = {
  type: "svg",
};
LineAndScatterChart = fitWidth(LineAndScatterChart);

export default LineAndScatterChart;

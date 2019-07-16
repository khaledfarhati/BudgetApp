// @flow
import * as React from "react";
import Chart from "../Chart/index";
import Bar from "./Bar";
import Xaxis from "./Xaxis";
import Legend from "../../Legend/Legend";
import styles from "./styles.module.css";
import Aux from "../../../containers/Hoc/Auxi/Auxiliary";
import {
  max,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10
} from "d3";
import { shuffle } from "../../../utils/array";

const outflowScheme = shuffle([
  ...schemeCategory10.slice(0, 2),
  ...schemeCategory10.slice(3)
]);
const inflowScheme = ["#2ca02c"]; // inflow always green

class StackedChart extends React.Component {
  static defaultProps = {
    width: 300,
    height: 500,
    dataValue: "value"
  };
  componentWillMount() {
    this.updateChartVariables();
  }

  updateChartVariables = () => {
    const { width, height, data, totals } = this.props;
    const { color, barPadding, bottomPadding, chartPadding } = this;

    this.dataKeys = Object.keys(data);
    this.xScale = scaleBand()
      .rangeRound([0, Number(width) - chartPadding * 2])
      .paddingInner(barPadding);
    this.xScale.domain([0, this.dataKeys.length - 1]);
    this.yScale = scaleLinear().rangeRound([
      Number(height) - 2 * chartPadding - bottomPadding,
      0
    ]);
    this.yScale.domain([max([totals.inflow, totals.outflow]), 0]);
    this.colorFn = this.dataKeys.reduce((colorFn, key) => {
      colorFn[key] = color[key].domain([0, data[key].length]);
      return colorFn;
    }, {});

    this.boxLength = width + chartPadding * 2;
    this.boxHeight = height + chartPadding * 2;
  };

  barPadding = 0.15;

  bottomPadding = 40;

  chartPadding = 10;
  //Another way to output each line in a different color is to explicitly choose them
  color = {
    inflow: scaleOrdinal(inflowScheme),
    outflow: scaleOrdinal(outflowScheme)
  };

  render() {
    const {
      dataKeys,
      xScale,
      yScale,
      colorFn,
      boxLength,
      boxHeight,
      chartPadding
    } = this;
    console.log(dataKeys);
    console.log(colorFn["inflow"](0));
    const { data, totals, dataKey, dataLabel, dataValue } = this.props;

    return (
      <div className={styles.StackedChart}>
        <Chart
          width={boxLength}
          height={boxHeight}
          padding={chartPadding}
          transform={`translate(${chartPadding},${chartPadding})`}
        >
          {dataKeys.map((key, idx) => (
            <Bar
              key={key}
              data={data[key]}
              yScale={yScale}
              colorFn={colorFn[key]}
              width={xScale.bandwidth()}
              transform={`translate(${xScale(idx)}, 0)`}
            />
          ))}
          <Xaxis
            transform={`translate(0, ${yScale.range()[0] + chartPadding / 3})`}
            data={data}
            totals={totals}
            xScale={xScale}
          />
        </Chart>
        <Legend
          color={colorFn.outflow}
          reverse
          data={data.outflow}
          {...{ dataValue, dataLabel, dataKey }}
        />
      </div>
    );
  }
}

export default StackedChart;

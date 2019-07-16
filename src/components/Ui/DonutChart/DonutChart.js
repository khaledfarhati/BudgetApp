import * as React from "react";
import { arc, pie, scaleOrdinal, schemeCategory10 } from "d3";
import { shuffle } from "../../../utils/array";
import Path from "./Path";
import Legend from "../../Legend/Legend";
import Chart from "../Chart/index";
import styles from "./DonutChart.module.css";
const randomScheme = shuffle(schemeCategory10);
class DonutChart extends React.Component {
  static defaultProps = {
    color: scaleOrdinal(randomScheme),
    height: 300,
    innerRatio: 4,
    dataValue: "value"
  };
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      color: this.props.color,
      height: this.props.height
    };
    this.updateChartVariables();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, color, height } = nextProps;
    const old = prevState;

    if (old.data !== data || old.color !== color || old.height !== height) {
      return {
        data: data,
        color: color,
        height: height
      };
    } else return null;
  }

  getPathArc = () => {
    const { height, innerRatio } = this.props;
    return arc()
      .innerRadius(Number(height) / Number(innerRatio))
      .outerRadius(Number(height) / 2);
  };
  chartPadding = 8;
  updateChartVariables() {
    const { data, dataValue, color, height } = this.props;

    this.chart = pie()
      .value(d => d[dataValue])
      .sort(null);
    this.outerRadius = Number(height) / 2;
    this.pathArc = this.getPathArc();
    this.colorFn = color && color.domain && color.domain([0, data.length]);
    this.boxLength = height + this.chartPadding * 2;
  }

  render() {
    const { data, dataLabel, dataValue, dataKey } = this.props;
    const { outerRadius, pathArc, colorFn, boxLength, chartPadding } = this;

    return (
      <div className={styles.DonutChart}>
        <Chart
          width={boxLength}
          height={boxLength}
          padding={chartPadding}
          transform={`translate(${outerRadius},${outerRadius})`}
        >
          {this.chart(data).map((datum, index) => (
            <Path
              data={datum}
              index={index}
              fill={colorFn(index)}
              arcFn={pathArc}
              key={datum.data[dataKey]}
            />
          ))}
        </Chart>

        <Legend color={colorFn} {...{ data, dataValue, dataLabel, dataKey }} />
      </div>
    );
  }
}
export default DonutChart;

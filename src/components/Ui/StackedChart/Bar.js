// @flow
import * as React from "react";
import Rect from "./Rect";

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yScale: this.props.yScale,
      data: this.props.data
    };
    this.updateChartVariables();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { yScale, data } = nextProps;
    const old = prevState;
    if (old.yScale !== yScale || old.data !== data) {
      return {
        yScale: yScale,
        data: data
      };
    } else return null;
  }
  updateChartVariables = () => {
    const { yScale, data } = this.props;
    let start = yScale.range()[0];

    this.yPositions = data.map(datum => {
      start -= yScale(datum.value);
      return start;
    });
  };

  render() {
    const { yPositions } = this;
    const { width, yScale, colorFn, data, transform } = this.props;
    console.log(yPositions);
    return (
      <g transform={transform}>
        {data.map((datum, idx) => (
          <Rect
            key={datum.categoryId}
            y={yPositions[idx]}
            height={yScale(datum.value)}
            width={width}
            fill={colorFn(idx)}
          />
        ))}
      </g>
    );
  }
}

export default Bar;

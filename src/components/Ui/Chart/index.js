import * as React from "react";

const Chart = props => (
  <svg
    width={props.width}
    height={props.height}
    viewBox={`-${Number(props.padding)} -${Number(props.padding)} ${
      props.width
    } ${props.height}`}
  >
    <g transform={props.transform}>{props.children}</g>
  </svg>
);

Chart.defaultProps = {
  padding: 0,
  transform: ""
};

export default Chart;

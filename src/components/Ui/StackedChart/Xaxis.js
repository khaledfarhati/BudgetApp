// @flow
import * as React from "react";
import formatAmount from "../../../utils/formatAmount";
import styles from "./styles.module.css";

const Xaxis = props => (
  <g className={styles.Xaxis} transform={props.transform}>
    {Object.keys(props.data).map((key, idx) => (
      <g
        key={key}
        transform={`translate(${props.xScale(idx) +
          props.xScale.bandwidth() / 2}, 0)`}
      >
        <line stroke={props.labelColor} y2="6" x1="0.5" x2="0.5" />
        <text fill={props.labelColor} y="9" x="0.5" dy="0.8em">
          {key.toUpperCase()}
        </text>
        <text fill={props.valueColor} y="35" x="0.5" dy="0.6em">
          {formatAmount(props.totals[key]).text}
        </text>
      </g>
    ))}
  </g>
);

Xaxis.defaultProps = {
  labelColor: "#000",
  valueColor: "#999",
  transform: ""
};

export default Xaxis;

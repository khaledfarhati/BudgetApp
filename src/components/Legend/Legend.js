import * as React from "react";
import LegendItem from "./LegendItem";
import styles from "./Legend.module.css";

const Legend = props => (
  <ul
    className={
      props.reverse ? [styles.Legend, styles.Reverse].join(" ") : styles.Legend
    }
  >
    {props.data.map((item, idx) => (
      <LegendItem
        color={props.color(idx)}
        key={item[props.dataKey]}
        label={item[props.dataLabel]}
        value={item[props.dataValue]}
      />
    ))}
  </ul>
);

Legend.defaultProps = {
  reverse: false
};

export default Legend;

// @flow
import * as React from "react";
import formatAmount from "../../utils/formatAmount";
import styles from "./Legend.module.css";

const LegendItem = props => (
  <li style={{ color: `${props.color}` }}>
    <span>{props.label}</span>
    <span className={styles.Value}> {formatAmount(props.value).text} </span>
  </li>
);

export default LegendItem;

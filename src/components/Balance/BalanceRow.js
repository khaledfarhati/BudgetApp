// @flow
import * as React from "react";
import styles from "./Balance.module.css";
const BalanceRow = props => (
  <div className={styles.BalanceRowContainer}>
    <div className={styles.BalanceRow}>{props.children}</div>
  </div>
);

export default BalanceRow;

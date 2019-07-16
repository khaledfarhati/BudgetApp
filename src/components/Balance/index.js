import * as React from "react";

import styles from "./Balance.module.css";

const Balance = props => {
  const { title, amount, colorize, prefix } = props;
  console.log(amount.isNegative);
  console.log(colorize);
  const amountCls =
    colorize && amount.isNegative ? styles.neg : styles.pos || "";
  console.log(amountCls);
  console.log(styles.balanceElement);
  const prefixElement = typeof prefix === "string" && (
    <div key="prefix" className={styles.BalanceSymbol}>
      {prefix}
    </div>
  );
  const balanceElement = (
    <div key="item" className={styles.BalanceWrapper}>
      <div className={styles.BalanceItem}>
        <div className={[styles.BalanceAmount, amountCls].join(" ")}>
          {amount.text}
        </div>
        <div className={styles.BalanceTitle}>{title}</div>
      </div>
    </div>
  );
  return [prefixElement, balanceElement];
};
Balance.defaultProps = {
  colorize: true,
  prefix: null
};
export default Balance;

// @flow
import * as React from "react";

import NavLink from "../NavLink/NavLink";
import styles from "./ReportsTabbar.module.css";

const ReportsTabbar = () => (
  <div className={styles.Tabbar}>
    <NavLink
      link="/reports/inflow-outflow"
      label="Inflow vs Outflow"
      styles={styles}
    />
    <NavLink
      link="/reports/spending"
      label="Spending by Category"
      styles={styles}
    />
  </div>
);

export default ReportsTabbar;

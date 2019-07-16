import * as React from "react";
import NavLink from "../NavLink/NavLink";
import styles from "./Header.module.css";

export default () => (
  <div className={styles.Header}>
    <NavLink link="/budget" label="Budget" styles={styles} />
    <NavLink link="/reports" label="Reports" styles={styles} />
  </div>
);

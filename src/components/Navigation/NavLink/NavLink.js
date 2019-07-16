import React from "react";

import Aux from "../../../containers/Hoc/Auxi/Auxiliary";
import { NavLink } from "react-router-dom";
export default props => (
  <NavLink
    to={props.link}
    className={props.styles.Navlink}
    activeClassName={props.styles.Active}
    exact={props.exact}
  >
    {props.label}
  </NavLink>
);

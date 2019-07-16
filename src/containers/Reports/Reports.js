// @flow
import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import InflowOutflow from "../InflowOutflow/InflowOutflow";
import Spending from "../Spending/Spending";
import ReportsTabbar from "../../components/Navigation/ReportsTabbar/ReportsTabbar";
class Reports extends React.Component {
  render() {
    return (
      <section>
        <ReportsTabbar />

        <Switch>
          <Route
            path="/reports/inflow-outflow"
            render={props => (
              <InflowOutflow
                data={this.props.data}
                totals={this.props.totals}
              />
            )}
          />
          <Route
            path="/reports/spending"
            render={props => (
              <Spending
                data={this.props.data["outflow"]}
                totals={this.props.totals}
              />
            )}
          />

          <Redirect to="/reports/inflow-outflow" />
        </Switch>
      </section>
    );
  }
}

export default Reports;

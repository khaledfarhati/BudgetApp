// @flow
import * as React from "react";

import BalanceItem from "../../components/Balance/index";
import BalanceRow from "../../components/Balance/BalanceRow";

class Balance extends React.Component {
  render() {
    const { inflow, outflow, balance } = this.props;
    return (
      <BalanceRow>
        <BalanceItem amount={inflow} title="Total Inflow" />
        <BalanceItem amount={outflow} title="Total Outflow" prefix="-" />
        <BalanceItem
          amount={balance}
          title="Working Balance"
          colorize={false}
          prefix="="
        />
      </BalanceRow>
    );
  }
}

export default Balance;

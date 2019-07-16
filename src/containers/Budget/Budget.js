// @flow
import * as React from "react";
import BudgetGrid from "../BudgetGrid/BudgetGrid";
import Balance from "../Balance/Balance";

const BudgetContainer = props => (
  <section>
    <BudgetGrid
      transactions={props.transactions}
      categories={props.categories}
      addTransaction={props.addTransaction}
      updateTransaction={props.updateTransaction}
      deleteTransaction={props.deleteTransaction}
    />
    <Balance
      balance={props.balance}
      inflow={props.inflow}
      outflow={props.outflow}
    />
  </section>
);

export default BudgetContainer;

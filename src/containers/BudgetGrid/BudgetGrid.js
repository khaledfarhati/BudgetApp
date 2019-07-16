import React, { Component } from "react";
import BudgetGridRow from "../../components/BudgetGridRow/BudgetGridRow";
import EntryFormRow from "../EntryFormRow/EntryFormRow";
import styles from "../BudgetGrid/BudgetGrid.module.css";
class BudgetGrid extends Component {
  state = {
    editTransactionId: ""
  };
  editTransaction = id => {
    this.setState({ editTransactionId: id });
  };
  getRowContent = (transaction, categories) =>
    transaction.id === this.state.editTransactionId ? (
      <EntryFormRow
        key={transaction.id}
        transaction={transaction}
        categories={categories}
        setEditTransaction={this.editTransaction}
        updateTransaction={this.props.updateTransaction}
        deleteTransaction={this.props.deleteTransaction}
      />
    ) : (
      <BudgetGridRow
        key={transaction.id}
        transaction={transaction}
        categories={categories}
        setEditTransaction={this.editTransaction}
      />
    );

  render() {
    const { transactions, categories } = this.props;
    console.log(categories);
    return (
      <table className={styles.BudgetGrid}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction =>
            this.getRowContent(transaction, categories)
          )}
        </tbody>
        <tfoot>
          <EntryFormRow
            categories={this.props.categories}
            addTransaction={this.props.addTransaction}
          />
        </tfoot>
      </table>
    );
  }
}
export default BudgetGrid;

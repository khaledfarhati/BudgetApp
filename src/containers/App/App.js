// @flow
import React, { Component } from "react";
import "./App.module.css";
import Header from "../../components/Navigation/Header/Header";
import Budget from "../../containers/Budget/Budget";
import Reports from "../../containers/Reports/Reports";
import formatAmount from "../../utils/formatAmount";
import { Switch, Route, Redirect } from "react-router-dom";
const inflowCategories = ["15"];
class App extends Component {
  state = {
    categories: {
      "1": "Groceries",
      "2": "School",
      "3": "Entertainment",
      "4": "Utensils",
      "5": "Kids",
      "6": "Travel",
      "7": "Commute",
      "8": "Insurance",
      "9": "Clothing",
      "10": "Car",
      "11": "Taxes",
      "12": "Health",
      "13": "Home",
      "14": "Beauty",
      "15": "Income",
      "16": "Misc",
      "17": "Gifting"
    },
    transactions: [
      {
        id: 1,
        description: "Trader Joe's food",
        value: -423.34,
        categoryId: "1"
      },
      {
        id: 2,
        description: "Gas",
        value: -764.73,
        categoryId: "6"
      },
      {
        id: 3,
        description: "Ebay sale - guitar",
        value: 1102.0,
        categoryId: "15"
      },
      {
        id: 4,
        description: "Milk & Eggs for the pancake party with neighbors",
        value: -2300,
        categoryId: "3"
      },
      {
        id: 5,
        description: "The usual weekly run",
        value: -1100,
        categoryId: "16"
      },
      {
        id: 6,
        description: "Paycheck",
        value: 5700,
        categoryId: "15"
      }
    ]
  };
  getNextTransactionId = state => {
    return state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
  };
  getNextTransactionKey = state => {
    return state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  };
  normalizeTransaction = (state, transaction) => {
    const { id, categoryId, description, value } = transaction;
    const realValue = inflowCategories.includes(categoryId)
      ? Math.abs(value)
      : Math.abs(value) * -1;
    console.log(realValue);
    return {
      id: this.getNextTransactionId(state),
      description,
      value: realValue,
      categoryId
    };
  };
  addTransaction = transaction => {
    const transactions = [...this.state.transactions];
    const key = this.getNextTransactionKey(transactions);
    transactions[key] = this.normalizeTransaction(transactions, transaction);

    this.setState({ transactions });
  };
  updateTransaction = transaction => {
    console.log(transaction);
    const transactions = this.state.transactions.map(transac =>
      transac.id == transaction.id ? transaction : transac
    );

    this.setState({ transactions });
  };
  deleteTransaction = id => {
    const transactions = this.state.transactions.filter(
      transaction => transaction.id !== id
    );
    this.setState({ transactions });
  };
  totalTransaction = state => {
    return state.reduce((total, item) => total + parseFloat(item.value), 0);
  };
  getFormattedBalance = state => {
    return formatAmount(this.totalTransaction(state));
  };
  getInflowTransactions = state => {
    return state.filter(item => item.value > 0);
  };
  getFormattedInflowBalance = state => {
    return formatAmount(
      this.totalTransaction(this.getInflowTransactions(state))
    );
  };
  getOutflowTransactions = state => {
    return state.filter(item => item.value < 0);
  };
  getFormattedOutflowBalance = state => {
    return formatAmount(
      this.totalTransaction(this.getOutflowTransactions(state))
    );
  };
  sortTransactions = state => {
    const unsorted = [...state];
    return unsorted.sort((a, b) => b.value - a.value);
  };
  summarizeTransactions = state => {
    return state.reduce((summarize, { categoryId, value }) => {
      const sum =
        summarize.find(item => item.categoryId === categoryId) ||
        summarize[summarize.push({ categoryId, value: 0 }) - 1];
      sum.value += Math.abs(value);
      return summarize;
    }, []);
  };
  getInflowByCategory = state => {
    return this.summarizeTransactions(this.getInflowTransactions(state));
  };
  getOutflowCategory = state => {
    return this.summarizeTransactions(this.getOutflowTransactions(state));
  };
  applyCategoryName = (transactions, categories) => {
    return transactions.map(transaction => {
      transaction.category = categories[transaction.categoryId];
      return transaction;
    });
  };
  getOutflowByCategoryName = (transactions, categories) => {
    return this.applyCategoryName(
      this.getOutflowCategory(transactions),
      categories
    );
  };
  getInflowByCategoryName = (transactions, categories) => {
    return this.applyCategoryName(
      this.getInflowByCategory(transactions),
      categories
    );
  };
  getInflowBalance = transactions => {
    return this.totalTransaction(this.getInflowTransactions(transactions));
  };
  getOutflowBalance = transactions => {
    return this.totalTransaction(this.getOutflowTransactions(transactions));
  };
  render() {
    const { transactions, categories } = this.state;
    const {
      sortTransactions,
      getInflowByCategoryName,
      getOutflowByCategoryName,
      getInflowBalance,
      getOutflowBalance
    } = this;
    const data = {
      inflow: sortTransactions(
        getInflowByCategoryName(transactions, categories)
      ),
      outflow: sortTransactions(
        getOutflowByCategoryName(transactions, categories)
      )
    };
    const totals = {
      inflow: getInflowBalance(transactions),
      outflow: Math.abs(getOutflowBalance(transactions))
    };
    console.log(data, totals);
    return (
      <main>
        <Header />
        <Switch>
          <Route
            path="/budget"
            render={props => (
              <Budget
                transactions={this.state.transactions}
                categories={this.state.categories}
                addTransaction={this.addTransaction}
                updateTransaction={this.updateTransaction}
                deleteTransaction={this.deleteTransaction}
                balance={this.getFormattedBalance(transactions)}
                inflow={this.getFormattedInflowBalance(transactions)}
                outflow={this.getFormattedOutflowBalance(transactions)}
                {...props}
              />
            )}
          />
          <Route
            path="/reports"
            render={props => (
              <Reports
                {...props}
                getInflowBalance={this.getInflowTransactions(transactions)}
                getOutflowBalance={this.getOutflowTransactions(transactions)}
                data={data}
                totals={totals}
              />
            )}
          />
          <Redirect to="/budget" />
        </Switch>
      </main>
    );
  }
}

export default App;

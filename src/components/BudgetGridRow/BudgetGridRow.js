// @flow
import * as React from "react";
import formatAmount from "../../utils/formatAmount";
import styles from "./BudgetGridRow.module.css";

const BudgetGridRow = props => {
  const { transaction, categories, setEditTransaction } = props;
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.Neg : styles.Pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];

  return (
    <tr key={id} onClick={() => setEditTransaction(id)}>
      <td>
        <div className={styles.CellLabel}>Category</div>
        <div className={styles.cellContent}>{category}</div>
      </td>
      <td>
        <div className={styles.CellLabel}>Description</div>
        <div className={styles.CellContent}>{description}</div>
      </td>
      <td>
        <div className={styles.CellLabel}>Amount</div>
        <div className={[styles.CellContent, amountCls].join(" ")}>
          {amount.text}
        </div>
      </td>
    </tr>
  );
};

export default BudgetGridRow;

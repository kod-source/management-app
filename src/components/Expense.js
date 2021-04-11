import MediaQuery from "react-responsive";
import styled from "styled-components";
import "../styled.css";

const RedP = styled.p`
  color: red;
`;

const Expense = ({ incomeItems, spendingItems }) => {
  const sum = (items) => {
    const budgets = items.map((item) => item.money);
    const budget = budgets.reduce((sum, num) => sum + num, 0);
    return budget;
  };

  const incomeBudget = sum(incomeItems);
  const spendingBudget = sum(spendingItems);
  const budget = incomeBudget - spendingBudget;

  return (
    <div className="container">
      <MediaQuery query="(max-width: 767px)">
        <div className="expenseContainer_responsive">
          <p className="expense_responsive">支出</p>
          <RedP className="expenseRight_responsive">
            -{spendingBudget.toLocaleString()}円
          </RedP>
        </div>
        <div className="expenseContainer_responsive">
          <p className="expense_responsive">収入</p>
          <p className="expenseRight_responsive">
            +{incomeBudget.toLocaleString()}円
          </p>
        </div>
        <div className="expenseContainer_responsive">
          <p className="balance_responsive">収支</p>
          <p className="expenseCenter_responsive">
            {budget.toLocaleString()}円
          </p>
        </div>
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <div className="expenseContainer">
          <p className="expense">支出</p>
          <RedP className="expenseRight">
            -{spendingBudget.toLocaleString()}円
          </RedP>
        </div>
        <div className="expenseContainer">
          <p className="expense">収入</p>
          <p className="expenseRight">+{incomeBudget.toLocaleString()}円</p>
        </div>
        <div className="expenseContainer">
          <p className="balance">収支</p>
          <p className="expenseCenter">{budget.toLocaleString()}円</p>
        </div>
      </MediaQuery>
    </div>
  );
};

export default Expense;

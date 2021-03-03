import styled from 'styled-components';
import '../styled.css';

const RedP = styled.p`
    color: red
`

const Expense = ({incomeItems, spendingItems}) => {
    const incomeBudgets = incomeItems.map(income => income.money);
    const incomeBudget = incomeBudgets.reduce((sum, num) => sum + num, 0);
    const spendingBudgets = spendingItems.map(income => income.money);
    const spendingBudget = spendingBudgets.reduce((sum, num) => sum + num, 0);
    const budget = spendingBudget + incomeBudget


    return (
        <div className="container">
            <div className="expenseContainer">
                <p className="expense">支出</p>
                <RedP className="expenseRight">{spendingBudget.toLocaleString()}円</RedP>
            </div>
            <div className="expenseContainer">
                <p className="expense">収入</p>
                <p className="expenseRight">+{incomeBudget.toLocaleString()}円</p>
            </div>
            <div className="expenseContainer">
                <p className="balance">収支</p>
                <p className="expenseCenter">{budget.toLocaleString()}円</p>
            </div>
        </div>
    )
}

export default Expense;
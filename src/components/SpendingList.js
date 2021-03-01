import '../styled.css';

const SpendingList = ({expenses}) => {
    const expensesItems = expenses.map(expense => {
        return (
            <ul className="listUl">
                <li key={expense.id} className={"listLi"}>{expense.label}</li>
                <li key={expense.id} className={"listLi"}>{expense.money.toLocaleString()}円</li>
            </ul>
        )
    })
    return (
        <div>
            {expensesItems}
        </div>
    )
}

export default SpendingList;
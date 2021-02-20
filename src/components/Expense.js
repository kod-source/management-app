import '../styled.css';

const Expense = () => {
    const SpendingSum = () => {
        
    }

    return (
        <div className="container">
            <div className="expenseContainer">
                <p className="expense">支出</p>
                <p className="expenseRight">-1,000円</p>
            </div>
            <div className="expenseContainer">
                <p className="expense">収入</p>
                <p className="expenseRight">+1,000円</p>
            </div>
            <div className="expenseContainer">
                <p className="balance">収支</p>
                <p className="expenseCenter">1,000円</p>
            </div>
        </div>
    )
}

export default Expense;
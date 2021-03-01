import '../styled.css';

const IncomeList = ({incomes}) => {
    const IncomeItems = incomes.map(income => {
        return (
            <ul className="listUl">
                <li key={income.id} className={"listLi"}>{income.label}</li>
                <li key={income.id} className={"listLi"}>{income.money.toLocaleString()}円</li>
            </ul>
        )
    })
    return (
        <div>
            {IncomeItems}
        </div>
    )
}

export default IncomeList
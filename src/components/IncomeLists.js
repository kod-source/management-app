import '../styled.css';
import IncomeList from './IncomeList';

const IncomeLists = ({incomes}) => {
    return (
        <div>
            <IncomeList incomes={incomes} />
        </div>
    )
}

export default IncomeLists;
import styled from 'styled-components';
import '../styled.css';
import { Button } from './button';

const GreenLi = styled.li`
    color: rgb(58, 222, 58);
`

const SpendingButton = styled(Button)`
    min-width: 70px;
`

const IncomeList = ({incomes}) => {
    const spendingDelete = () => {
        
    }
    return (
        <div>
            {
                incomes.map(income => {
                    return (
                        <ul className="listUl">
                            <li className="listLi">{income.label}</li>
                            <GreenLi className="listLi">{income.money.toLocaleString()}円</GreenLi>
                            <SpendingButton onClick={spendingDelete}>削除</SpendingButton>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default IncomeList
import styled from 'styled-components';
import '../styled.css';
import { Button } from './button';
import firebase from 'firebase';

const GreenLi = styled.li`
    color: rgb(58, 222, 58);
`

const SpendingButton = styled(Button)`
    min-width: 70px;
`

const IncomeList = ({incomes}) => {
    const incomesDelete = async (id) => {
        try {
            const db = firebase.firestore();
            await db.collection("income").doc(id).delete();
            console.log("delete")
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            {
                incomes.map(income => {
                    return (
                        <ul className="listUl">
                            <li className="listLi">{income.label}</li>
                            <GreenLi className="listLi">{income.money.toLocaleString()}円</GreenLi>
                            <SpendingButton onClick={() => incomesDelete(income.id)}>削除</SpendingButton>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default IncomeList
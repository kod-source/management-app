import styled from 'styled-components';
import '../styled.css';
import { Button } from './button';
import firebase from 'firebase';

const RedLi = styled.li`
    color: red;
`

const SpendingButton = styled(Button)`
    min-width: 70px;
`

const SpendingList = ({expenses}) => {
    const spendingDelete = async (id) => {
        try {
            const db = firebase.firestore();
            await db.collection("spending").doc(id).delete();
            console.log("delete")
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            {
                expenses.map(expense => {
                    return (
                        <ul className="listUl">
                            <li className={"listLi"}>{expense.label}</li>
                            <RedLi className={"listLi"}>{expense.money.toLocaleString()}円</RedLi>
                            <SpendingButton onClick={() => spendingDelete(expense.id)}>削除</SpendingButton>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default SpendingList;
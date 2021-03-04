import styled from 'styled-components';
import '../styled.css';
import { Button } from './button';
import firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyB_9FP45IQqwilhyK7PY8vE-9g4qO4UmOQ",
//     authDomain: "management-app-5d601.firebaseapp.com",
//     projectId: "management-app-5d601",
//     storageBucket: "management-app-5d601.appspot.com",
//     messagingSenderId: "991225508251",
//     appId: "1:991225508251:web:8931bcdaad0199bbd8f13e",
//     measurementId: "G-Y5E5E7KCD7"
//   };
//   firebase.initializeApp(firebaseConfig);

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
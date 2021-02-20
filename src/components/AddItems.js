import "../styled.css";
import { Button } from "./button";
import styled from "styled-components";
import { useState } from "react";
import Select from 'react-select'
import { income, spending } from "./dataset";
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB_9FP45IQqwilhyK7PY8vE-9g4qO4UmOQ",
    authDomain: "management-app-5d601.firebaseapp.com",
    projectId: "management-app-5d601",
    storageBucket: "management-app-5d601.appspot.com",
    messagingSenderId: "991225508251",
    appId: "1:991225508251:web:8931bcdaad0199bbd8f13e",
    measurementId: "G-Y5E5E7KCD7"
  };
  firebase.initializeApp(firebaseConfig);


const FormButton = styled(Button)`
    width: 150px;
`

const AddItems = ({date}) => {
    const [money, setMoney] = useState("");
    const [options, setOptions] = useState([])
    const [getValue, setGetValue] = useState([])

    const addMoney = (event) => {
        event.preventDefault();
        if(options === spending && money !== "") {
            const spendingSum = async () => {
                const db = firebase.firestore();
                getValue.money = parseInt(-money, 10)
                const ref = await db.collection('spending').add({
                    value: getValue.value,
                    label: getValue.label,
                    money: getValue.money,
                    date: date,
                })
                const snapShot = await ref.get()
                const data = snapShot.data()
                console.log(ref.id, data);
                setMoney("")
            }
            spendingSum()
        } else if(options === income && money !== "") {
            const incomeSum = async () => {
                const db = firebase.firestore();
                getValue.money = parseInt(money, 10)
                const ref = await db.collection('income').add({
                    value: getValue.value,
                    label: getValue.label,
                    money: getValue.money,
                    date: date,
                })
                const snapShot = await ref.get()
                const data = snapShot.data()
                console.log(ref.id, data);
                setMoney("")
            }
            incomeSum()
        } else if(money === "0" || money === "") {
            alert("金額を正しく入力してください")
        } else {
            alert("支出か収入か選択してください")
        }
    }

    return (
        <div className="addItemContainer">
            <form onSubmit={addMoney}>
                <div className="item">
                    <input type="radio" name="type" value="spending" onChange={() => setOptions(spending)} />支出
                    <input type="radio" name="type" value="income" onChange={() => setOptions(income)} />収入
                </div>
                <div className="item">
                    <Select className="input" name="type" options={options} onChange={(value) => setGetValue(value)} placeholder="カテゴリー" />
                </div>
                <div className="item">
                    <label className="right">金額</label>
                    <input className="input" type="text" value={money} placeholder={"金額を入力してください"} 
                        onChange={(e) => setMoney(e.target.value)} 
                    />
                </div>
                <div className="item">
                    <FormButton>追加</FormButton>
                </div>
            </form>
        </div>
    )
}

export default AddItems;
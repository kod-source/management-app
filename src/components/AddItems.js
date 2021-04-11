import "../styled.css";
import { Button, ButtonResponsive } from "./button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Select from "react-select";
import { income, spending } from "./dataset";
import firebase from "firebase";
import Expense from "./Expense";
import MediaQuery from "react-responsive";

const firebaseConfig = {
  apiKey: "AIzaSyB_9FP45IQqwilhyK7PY8vE-9g4qO4UmOQ",
  authDomain: "management-app-5d601.firebaseapp.com",
  projectId: "management-app-5d601",
  storageBucket: "management-app-5d601.appspot.com",
  messagingSenderId: "991225508251",
  appId: "1:991225508251:web:8931bcdaad0199bbd8f13e",
  measurementId: "G-Y5E5E7KCD7",
};
firebase.initializeApp(firebaseConfig);

const FormButton = styled(Button)`
  width: 150px;
`;

const AddItems = ({ date, spendingData, incomeData }) => {
  const [money, setMoney] = useState("");
  const [options, setOptions] = useState([]);
  const [getValue, setGetValue] = useState([]);
  const [incomeItems, setIncomeItems] = useState([]);
  const [spendingItems, setSpendingItems] = useState([]);

  const db = firebase.firestore();

  useEffect(() => {
    firstSpendingSum();
    firstIncomeSum();
  }, [date]);

  const startData = new Date(date.getFullYear(), date.getMonth(), 1);
  const endData = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // リロード時の支出の合計
  const firstSpendingSum = async () => {
    const snapShot = await db
      .collection("spending")
      .orderBy("date")
      .startAt(startData)
      .endAt(endData)
      .get();
    const spendingItems = [];
    snapShot.forEach((doc) => {
      spendingItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setSpendingItems(spendingItems);
    spendingData(spendingItems);
  };

  // リロード時の収入の合計
  const firstIncomeSum = async () => {
    const snapShot = await db
      .collection("income")
      .orderBy("date")
      .startAt(startData)
      .endAt(endData)
      .get();
    const incomeItems = [];
    snapShot.forEach((doc) => {
      incomeItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setIncomeItems(incomeItems);
    incomeData(incomeItems);
  };

  // 支出の合計
  const spendingSum = async () => {
    getValue.money = parseInt(money, 10);
    await db.collection("spending").add({
      value: getValue.value,
      label: getValue.label,
      money: getValue.money,
      date: date,
    });
    const snapShot = await db
      .collection("spending")
      .orderBy("date")
      .startAt(startData)
      .endAt(endData)
      .get();
    const spendingItems = [];
    snapShot.forEach((doc) => {
      spendingItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setSpendingItems(spendingItems);
    spendingData(spendingItems);
  };

  // 収入の合計
  const incomeSum = async () => {
    getValue.money = parseInt(money, 10);
    await db.collection("income").add({
      value: getValue.value,
      label: getValue.label,
      money: getValue.money,
      date: date,
    });
    const snapShot = await db
      .collection("income")
      .orderBy("date")
      .startAt(startData)
      .endAt(endData)
      .get();
    const incomeItems = [];
    snapShot.forEach((doc) => {
      incomeItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setIncomeItems(incomeItems);
    incomeData(incomeItems);
  };

  const addMoney = (event) => {
    event.preventDefault();
    if (!money || isNaN(money)) {
      alert("金額を正しく入力してください");
    } else if (options === spending && money !== "") {
      spendingSum();
      setMoney("");
    } else if (options === income && money !== "") {
      incomeSum();
      setMoney("");
    } else {
      alert("支出か収入か選択してください");
    }
  };

  return (
    <>
      <MediaQuery query="(max-width: 767px)">
        <div className={"addItemContainer"}>
          <Expense incomeItems={incomeItems} spendingItems={spendingItems} />
          <form onSubmit={addMoney}>
            <div className="item_responsive">
              <input
                type="radio"
                name="type"
                value="spending"
                onChange={() => setOptions(spending)}
              />
              支出
              <input
                type="radio"
                name="type"
                value="income"
                onChange={() => setOptions(income)}
              />
              収入
            </div>
            <div className="item_responsive">
              <Select
                className="input_responsive"
                name="type"
                options={options}
                onChange={(value) => setGetValue(value)}
                placeholder="カテゴリー"
              />
            </div>
            <div className="item_responsive">
              <label className="right_responsive">金額</label>
              <input
                className="input_responsive"
                type="text"
                value={money}
                placeholder={"金額を入力してください"}
                onChange={(e) => setMoney(e.target.value)}
              />
            </div>
            <div className="item_responsive">
              <ButtonResponsive>追加</ButtonResponsive>
            </div>
          </form>
        </div>
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <div className="addItemContainer">
          <Expense incomeItems={incomeItems} spendingItems={spendingItems} />
          <form onSubmit={addMoney}>
            <div className="item">
              <input
                type="radio"
                name="type"
                value="spending"
                onChange={() => setOptions(spending)}
              />
              支出
              <input
                type="radio"
                name="type"
                value="income"
                onChange={() => setOptions(income)}
              />
              収入
            </div>
            <div className="item">
              <Select
                className="input"
                name="type"
                options={options}
                onChange={(value) => setGetValue(value)}
                placeholder="カテゴリー"
              />
            </div>
            <div className="item">
              <label className="right">金額</label>
              <input
                className="input"
                type="text"
                value={money}
                placeholder={"金額を入力してください"}
                onChange={(e) => setMoney(e.target.value)}
              />
            </div>
            <div className="item">
              <FormButton>追加</FormButton>
            </div>
          </form>
        </div>
      </MediaQuery>
    </>
  );
};

export default AddItems;

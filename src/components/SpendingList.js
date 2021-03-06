import styled from "styled-components";
import "../styled.css";
import { Button, ButtonResponsive } from "./button";
import firebase from "firebase";
import { useState } from "react";
import MediaQuery from "react-responsive";

const RedLi = styled.li`
  color: red;
`;

const SpendingButton = styled(Button)`
  min-width: 70px;
`;

const DateList = styled.li`
  padding: 0;
`;

const FormContainer = styled.form`
  text-align: center;
  font-size: 20px;
  margin-left: 415px;
`;

const FormContainerResponsive = styled.form`
  text-align: center;
  font-size: 10px;
  margin-left: 205px;
`;

const SelectContainer = styled.select`
  font-size: 20px;
`;

const SelectContainerResponsive = styled.select`
  font-size: 10px;
`;

const SpendingList = ({ expenses }) => {
  const [getValue, setGetValue] = useState("name-['");

  const sortChange = () => {
    setGetValue(document.getElementById("sort").value);
  };

  // ソート機能
  if (getValue === "name") {
    expenses.sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (getValue === "lowPrice") {
    expenses.sort((a, b) => {
      if (a.money > b.money) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (getValue === "highPrice") {
    expenses.sort((a, b) => {
      if (a.money < b.money) {
        return 1;
      } else {
        return -1;
      }
    });
  } else {
    expenses.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  const spendingDelete = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("spending").doc(id).delete();
      console.log("delete");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <MediaQuery query="(max-width: 767px)">
        <FormContainerResponsive>
          Sort by：
          <SelectContainerResponsive
            id="sort"
            name="sort"
            onChange={() => sortChange()}
          >
            <option value="name">名前順</option>
            <option value="lowPrice">金額の低い順</option>
            <option value="highPrice">金額の高い順</option>
            <option value="date">日付順</option>
          </SelectContainerResponsive>
        </FormContainerResponsive>
        {expenses.map((expense) => {
          const date = new Date(expense.date * 1000);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return (
            <ul className="listUl_responsive">
              <DateList className={"listLi_responsive"}>
                {String(month) + "月" + String(day) + "日"}
              </DateList>
              <li className={"listLi_responsive"}>・{expense.label}</li>
              <RedLi className={"listLi_responsive"}>
                ¥{expense.money.toLocaleString()}円
              </RedLi>
              <ButtonResponsive onClick={() => spendingDelete(expense.id)}>
                削除
              </ButtonResponsive>
            </ul>
          );
        })}
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <FormContainer>
          Sort by：
          <SelectContainer id="sort" name="sort" onChange={() => sortChange()}>
            <option value="name">名前順</option>
            <option value="lowPrice">金額の低い順</option>
            <option value="highPrice">金額の高い順</option>
            <option value="date">日付順</option>
          </SelectContainer>
        </FormContainer>
        {expenses.map((expense) => {
          const date = new Date(expense.date * 1000);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return (
            <ul className="listUl">
              <DateList className={"listLi"}>
                {String(month) + "月" + String(day) + "日"}
              </DateList>
              <li className={"listLi"}>・{expense.label}</li>
              <RedLi className={"listLi"}>
                ¥{expense.money.toLocaleString()}円
              </RedLi>
              <SpendingButton onClick={() => spendingDelete(expense.id)}>
                削除
              </SpendingButton>
            </ul>
          );
        })}
      </MediaQuery>
    </div>
  );
};

export default SpendingList;

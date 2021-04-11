import styled from "styled-components";
import "../styled.css";
import { Button } from "./button";
import firebase from "firebase";
import { useState } from "react";
import MediaQuery from "react-responsive";

const GreenLi = styled.li`
  color: rgb(58, 222, 58);
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

const IncomeList = ({ incomes }) => {
  const [getValue, setGetValue] = useState("name");

  const sortChange = () => {
    setGetValue(document.getElementById("sort").value);
  };

  // ソート機能
  if (getValue === "name") {
    incomes.sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (getValue === "lowPrice") {
    incomes.sort((a, b) => {
      if (a.money > b.money) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (getValue === "highPrice") {
    incomes.sort((a, b) => {
      if (a.money < b.money) {
        return 1;
      } else {
        return -1;
      }
    });
  } else {
    incomes.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  const incomesDelete = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("income").doc(id).delete();
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
        {incomes.map((income) => {
          const date = new Date(income.date * 1000);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return (
            <ul className="listUl_responsive">
              <DateList className={"listLi_responsive"}>
                {String(month) + "月" + String(day) + "日"}
              </DateList>
              <li className="listLi_responsive">・{income.label}</li>
              <GreenLi className="listLi_responsive">
                ¥{income.money.toLocaleString()}円
              </GreenLi>
              <SpendingButton onClick={() => incomesDelete(income.id)}>
                削除
              </SpendingButton>
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
        {incomes.map((income) => {
          const date = new Date(income.date * 1000);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return (
            <ul className="listUl">
              <DateList className={"listLi"}>
                {String(month) + "月" + String(day) + "日"}
              </DateList>
              <li className="listLi">・{income.label}</li>
              <GreenLi className="listLi">
                ¥{income.money.toLocaleString()}円
              </GreenLi>
              <SpendingButton onClick={() => incomesDelete(income.id)}>
                削除
              </SpendingButton>
            </ul>
          );
        })}
      </MediaQuery>
    </div>
  );
};

export default IncomeList;

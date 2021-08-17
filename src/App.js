import "./App.css";
import Header from "./components/Header";
import AddItems from "./components/AddItems";
import { useState } from "react";
import SpendingLists from "./components/SpendingLists";
import IncomeLists from "./components/IncomeLists";
import styled from "styled-components";
import MediaQuery from "react-responsive";

const ListsUl = styled.ul`
  display: flex;
  margin: 0;
  justify-content: space-between;
  padding: 15px 550px 0;
  border-bottom: 3px solid #e0e0e0;
`

const ListsUlResponsive = styled.ul`
  display: flex;
  margin: 0;
  justify-content: space-between;
  padding: 7px 150px 0;
  border-bottom: 2px solid #e0e0e0;
`;

const ListsLi = styled.li`
  list-style: none;
  font-size: 23px;
  padding: 4px 12px;
  cursor: pointer;
  border-bottom: ${(props) => (props.foucused ? "5px solid #F44336" : "none")};
`;
const ListsLiResponsive = styled.li`
  list-style: none;
  font-size: 10px;
  padding: 2px 6px;
  cursor: pointer;
  border-bottom: ${(props) => (props.foucused ? "2px solid #F44336" : "none")};
`;

function App() {
  const [date, setDate] = useState(new Date());
  const [tab, setTab] = useState("spending");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  // 先月のデータの取得
  const setPrevMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() - 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };

  // 次月のデータの取得
  const setNextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };

  // 子のコンポーネントからデータをもらう
  const spendingData = (spendingData) => {
    setExpenses(spendingData);
  };

  // 子のコンポーネントからデータをもらう
  const incomeData = (incomeData) => {
    setIncomes(incomeData);
  };

  return (
    <div>
      <Header
        date={date}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
        expenses={expenses}
        incomes={incomes}
      />
      <AddItems
        date={date}
        spendingData={spendingData}
        incomeData={incomeData}
      />
      <MediaQuery query="(max-width: 767px)">
        <ListsUlResponsive>
          <ListsLiResponsive
            foucused={tab === "spending"}
            onClick={() => setTab("spending")}
          >
            支出
          </ListsLiResponsive>
          <ListsLiResponsive
            foucused={tab === "income"}
            onClick={() => setTab("income")}
          >
            収入
          </ListsLiResponsive>
        </ListsUlResponsive>
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <ListsUl>
          <ListsLi
            foucused={tab === "spending"}
            onClick={() => setTab("spending")}
          >
            支出
          </ListsLi>
          <ListsLi foucused={tab === "income"} onClick={() => setTab("income")}>
            収入
          </ListsLi>
        </ListsUl>
      </MediaQuery>
      {tab === "spending" ? (
        <SpendingLists expenses={expenses} />
      ) : (
        <IncomeLists incomes={incomes} />
      )}
    </div>
  );
}

export default App;

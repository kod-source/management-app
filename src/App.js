import './App.css';
import Header from './components/Header';
import AddItems from './components/AddItems';
import { useState } from 'react';
import SpendingLists from './components/SpendingLists';
import IncomeLists from './components/IncomeLists';
import styled from 'styled-components';

const ListsUl = styled.ul`
  display: flex;
  margin: 0;
  justify-content: space-between;
  padding: 15px 550px 0;
  border-bottom: 1px solid #E0E0E0;
`

const ListsLi = styled.li`
  list-style: none;
  font-size: 23px;
  padding: 4px 12px;
  cursor: pointer;
  border-bottom: ${props => props.foucused ? "2px solid #F44336" : "none"};
`

function App() {
  const [date, setDate] = useState(new Date());
  const [tab, setTab] = useState('spending');
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])

  
  const setPrevMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth()-1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  }

  const setNextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  }

  const spendingData = (spendingData) => {
    setExpenses(spendingData)
  }

  const incomeData = (incomeData) => {
    setIncomes(incomeData)
  }

  return (
    <div>
      <Header date={date} setPrevMonth={setPrevMonth} setNextMonth={setNextMonth}/>
      <AddItems date={date} spendingData={spendingData} incomeData={incomeData}/>
      <ListsUl>
        <ListsLi foucused={tab === "spending"} onClick={() => setTab('spending')}>支出</ListsLi>
        <ListsLi foucused={tab === "income"} onClick={() => setTab('income')}>収入</ListsLi>
      </ListsUl>
      {
        tab === 'spending' ? <SpendingLists expenses={expenses} /> : <IncomeLists incomes={incomes} />
      }
    </div>
  );
}

export default App;

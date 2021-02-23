import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Expense from './components/Expense';
import AddItems from './components/AddItems';
import { useState } from 'react';

function App() {
  const [date, setDate] = useState(new Date());
  
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

  return (
    <div>
      <Header date={date} setPrevMonth={setPrevMonth} setNextMonth={setNextMonth}/>
      <AddItems date={date}/>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Expense from './components/Expense';
import AddItems from './components/AddItems';

function App() {
  return (
    <div>
      <Header />
      <Expense />
      <AddItems />
    </div>
  );
}

export default App;

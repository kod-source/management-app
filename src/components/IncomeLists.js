import "../styled.css";
import IncomeGraph from "./IncomeGraph";
import IncomeList from "./IncomeList";

const IncomeLists = ({ incomes }) => {
  return (
    <div>
      <IncomeGraph incomes={incomes} />
      <IncomeList incomes={incomes} />
    </div>
  );
};

export default IncomeLists;

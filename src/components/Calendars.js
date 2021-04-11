import "../styled.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import MediaQuery from "react-responsive";

const RedP = styled.p`
  color: red;
  font-size: 15px;
`;

const GreenP = styled.p`
  color: rgb(58, 222, 58);
  font-size: 15px;
`;

const Calendars = ({ date, expenses, incomes }) => {
  const getTileContent = (calendar) => {
    const year = calendar.date.getFullYear();
    const month = calendar.date.getMonth() + 1;
    const day = calendar.date.getDate();
    const formatDate = String(year) + String(month) + String(day);
    let expenseSum = 0;
    let incomeSum = 0;

    const calendarSum = (items, sum) => {
      items.forEach((element) => {
        const getDates = element.date;
        const getDate = new Date(getDates.seconds * 1000);
        const year = getDate.getFullYear();
        const month = `${getDate.getMonth() + 1}`.slice(-2);
        const day = `${getDate.getDate()}`.slice(-2);
        const getTime = year + month + day;
        if (formatDate === getTime) {
          sum += element.money;
        }
      });
      return sum;
    };

    expenseSum = calendarSum(expenses, expenseSum);
    incomeSum = calendarSum(incomes, incomeSum);
    return (
      <div>
        <RedP>-{expenseSum.toLocaleString()}</RedP>
        <GreenP>+{incomeSum.toLocaleString()}</GreenP>
      </div>
    );
  };

  return (
    <div>
      <MediaQuery query="(max-width: 767px)">
        <Calendar
          className={"calendar"}
          value={date}
          tileContent={getTileContent}
        />
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <Calendar value={date} tileContent={getTileContent} />
      </MediaQuery>
    </div>
  );
};

export default Calendars;

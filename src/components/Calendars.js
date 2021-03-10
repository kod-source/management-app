import "../styled.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

const RedP = styled.p`
    color: red;
    font-size: 15px;
`

const GreenP = styled.p`
    color: rgb(58, 222, 58);
    font-size: 15px;
`

const Calendars = ({date, expenses, incomes}) => {
    const getTileContent = (calendar) => {
        const year = calendar.date.getFullYear();
        const month = calendar.date.getMonth()+1;
        const day = calendar.date.getDate();
        const formatDate = String(year) + String(month) + String(day)
        let expenseSum = 0;
        let incomeSum = 0;
        expenses.forEach(element => {
            const getDates = element.date
            const getDate = new Date(getDates.seconds * 1000);
            const year = getDate.getFullYear();
            const month = (`${getDate.getMonth() + 1}`).slice(-2);
            const day = (`${getDate.getDate()}`).slice(-2);
            const getTime = (year + month + day)
            if(formatDate === getTime) {
                expenseSum += element.money
            }
          });
        incomes.forEach(element => {
            const getDates = element.date
            const getDate = new Date(getDates.seconds * 1000);
            const year = getDate.getFullYear();
            const month = (`${getDate.getMonth() + 1}`).slice(-2);
            const day = (`${getDate.getDate()}`).slice(-2);
            const getTime = (year + month + day)
            if(formatDate === getTime) {
                incomeSum += element.money
            }
          });
        return (
            <div>
                <RedP>-{expenseSum.toLocaleString()}</RedP>
                <GreenP>+{incomeSum.toLocaleString()}</GreenP>
            </div>
        )
    }
    
    return (
        <div>
            <Calendar 
                value={date} 
                tileContent={getTileContent}
            />
        </div>
    )
}

export default Calendars;
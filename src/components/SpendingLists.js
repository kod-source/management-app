import '../styled.css';
import SpendingList from './SpendingList';

const SpendingLists = ({expenses, date}) => {
    return (
        <div>
            <SpendingList expenses={expenses} date={date} />
        </div>
    )
}

export default SpendingLists;
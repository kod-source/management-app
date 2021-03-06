import '../styled.css';
import SpendingGraph from './SpendingGraph';
import SpendingList from './SpendingList';

const SpendingLists = ({expenses, date}) => {
    return (
        <div>
            <SpendingGraph expenses={expenses} />
            <SpendingList expenses={expenses} />
        </div>
    )
}

export default SpendingLists;
import '../styled.css';
import SpendingList from './SpendingList';

const SpendingLists = ({expenses}) => {
    return (
        <div>
            <SpendingList expenses={expenses} />
        </div>
    )
}

export default SpendingLists;
import "../styled.css";
import { Button } from "./button";

const Header = ({date, setPrevMonth, setNextMonth}) => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    
    return (
        <div className="container">
            <Button onClick={() => setPrevMonth()}>←前月</Button>
            <h1 className="header">{year}年{month}月</h1>
            <Button onClick={() => setNextMonth()}>→次月</Button>
        </div>
    )
}

export default Header;

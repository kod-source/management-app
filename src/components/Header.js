import "../styled.css";
import { Button } from "./button";

const Header = () => {
    return (
        <div className="container">
            <Button>←前月</Button>
            <h1 className="header">2021年2月</h1>
            <Button>→次月</Button>
        </div>
    )
}

export default Header;

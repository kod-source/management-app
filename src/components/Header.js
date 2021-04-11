import { useEffect, useRef, useState } from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import "../styled.css";
import { Button, ButtonResponsive } from "./button";
import Calendars from "./Calendars";

const PopupContainer = styled.div`
  margin: 0 200px;
  top: 100px;
  display: flex;
  justify-content: center;
  padding: 0px;
  outline: none;
  border: 3px soli! black;
  border-radius: 8px;
`;

const Header = ({ date, setPrevMonth, setNextMonth, expenses, incomes }) => {
  const [showPopup, setShowPopup] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  });
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <div className="container">
      <MediaQuery query="(max-width: 767px)">
        <div className="container_responsive">
          <ButtonResponsive onClick={() => setPrevMonth()}>
            ←前月
          </ButtonResponsive>
          <h1 className="header_responsive" onClick={() => setShowPopup(true)}>
            {year}年{month}月
          </h1>
          <ButtonResponsive onClick={() => setNextMonth()}>
            →次月
          </ButtonResponsive>
          {showPopup && (
            <PopupContainer
              ref={ref}
              onBlur={() => setShowPopup(false)}
              tabIndex={0}
            >
              <Calendars date={date} expenses={expenses} incomes={incomes} />
            </PopupContainer>
          )}
        </div>
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <Button onClick={() => setPrevMonth()}>←前月</Button>
        <h1 className="header" onClick={() => setShowPopup(true)}>
          {year}年{month}月
        </h1>
        <Button onClick={() => setNextMonth()}>→次月</Button>
        {showPopup && (
          <PopupContainer
            ref={ref}
            onBlur={() => setShowPopup(false)}
            tabIndex={0}
          >
            <Calendars date={date} expenses={expenses} incomes={incomes} />
          </PopupContainer>
        )}
      </MediaQuery>
    </div>
  );
};
export default Header;

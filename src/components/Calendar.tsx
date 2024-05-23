import styled from "styled-components";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
} from "date-fns";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const today = new Date();
  const startDate = startOfWeek(startOfMonth(today));
  const endDate = endOfWeek(endOfMonth(today));
  const days: Date[] = [];

  const navigate = useNavigate();

  for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
    days.push(day);
  }

  const handleClick = (day: Date) => {
    const formattedDate = format(day, "yyyyMMdd");
    navigate(`./todo/${formattedDate}`);
  };

  return (
    <CalendarContainer>
      <Header>{format(today, "MMMM yyyy")}</Header>
      {days.map((day, index) => (
        <Day
          key={index}
          iscurrentmonth={
            format(day, "MM") === format(today, "MM") ? "true" : "false"
          }
          onClick={() => handleClick(day)}
        >
          {format(day, "d")}
        </Day>
      ))}
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const Day = styled.div<{ iscurrentmonth: string }>`
  padding: 16px;
  background-color: ${({ iscurrentmonth }) =>
    iscurrentmonth === "true" ? "#fff" : "#f0f0f0"};
  border: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ iscurrentmonth }) =>
      iscurrentmonth ? "#e0e0e0" : "#d0d0d0"};
  }
`;

const Header = styled.div`
  grid-column: span 7;
  text-align: center;
  padding: 16px;
  font-size: 1.5rem;
`;

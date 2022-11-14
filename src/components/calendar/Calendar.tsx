// @ts-ignore
import styled from "@xstyled/styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 10px;
  & > div {
    width: 100%;
    .react-datepicker {
      width: 100%;
      border: none;
    }
    .react-datepicker__month-container {
      width: 100%;
    }
    .react-datepicker__day-names {
      display: flex;
      justify-content: space-between;
    }
    .react-datepicker__week {
      display: flex;
      justify-content: space-between;
    }
    .react-datepicker__month {
      margin: 0;
    }
    .react-datepicker__day {
      border-radius: 50%;
    }
    .react-datepicker__day--selected {
      border-radius: 50%;
      background-color: rgb(55, 131, 197);
    }
    .react-datepicker__navigation {
      border-radius: 50%;
      transition: all 0.3s linear;
      & > span::before {
        border-color: rgb(55, 131, 197);
      }
      &:hover {
        background-color: rgb(55, 131, 197, 0.2);
      }
    }
    .react-datepicker__header {
      background-color: #ffff;
      border: none;
    }
  }
`;

export const Calendar = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (date: Date) => void;
}) => {
  return (
    <Wrapper>
      <DatePicker
        onChange={onChange}
        selected={date}
        showFullMonthYearPicker
        minDate={new Date()}
        inline
      />
    </Wrapper>
  );
};

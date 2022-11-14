// @ts-ignore
import styled from "@xstyled/styled-components";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getRequiredDateFormat } from "../../utils/date-format";
import { Calendar } from "../calendar/Calendar";
import { CommonButton } from "../CommonButton/CommonButton";
import { Modal } from "../modal/Modal";

const Wrapper = styled.div`
  width: 360px;
  background-color: #ffff;
`;
const TitleWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: rgb(243, 243, 236);
`;
const Title = styled.h2`
  font-size: 20px;
  margin: 0;
  font-weight: 300;
`;
const ButtonsWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid rgb(221, 221, 221);
`;
const Button = styled.button`
  width: 155px;
  height: 34px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props: any) => props.color};
  background-color: ${(props: any) => props.backgroundColor};
  transition: all 0.3s linear;

  &:hover {
    background-color: ${(props: any) => props.backgroundColorHover};
  }
`;

export const DateModal = ({
  isOpenModal,
  date,
  cancelOnClick,
  setOnClick,
}: {
  isOpenModal: boolean;
  date: string;
  cancelOnClick: () => void;
  setOnClick: (date: string) => void;
}) => {
  const [localDate, setLocalDate] = useState(new Date(date));

  const buttonsArr = [
    {
      value: "Cancel",
      color: "rgb(55, 131, 197)",
      backgroundColor: "#ffff",
      backgroundColorHover: "rgb(55, 131, 197, 0.5)",
      onClick: () => {
        setLocalDate(new Date(date));
        cancelOnClick();
      },
    },
    {
      value: "Set",
      color: "#ffff",
      backgroundColor: "rgb(55, 131, 197)",
      backgroundColorHover: "#216ba5",
      onClick: () => {
        setOnClick(getRequiredDateFormat(localDate));
      },
    },
  ];
  const handleSetDate = (date: Date) => {
    setLocalDate(date);
  };

  return (
    <Modal isOpenModal={isOpenModal}>
      <Wrapper>
        <TitleWrapper>
          <Title>Date</Title>
        </TitleWrapper>
        <Calendar date={localDate} onChange={handleSetDate} />
        <ButtonsWrapper>
          {buttonsArr.map((item: any, index: number) => {
            const {
              value,
              color,
              backgroundColor,
              backgroundColorHover,
              onClick,
            } = item;
            return (
              <CommonButton
                key={index}
                value={value}
                onClick={onClick}
                color={color}
                backgroundColor={backgroundColor}
                backgroundColorHover={backgroundColorHover}
              />
            );
          })}
        </ButtonsWrapper>
      </Wrapper>
    </Modal>
  );
};

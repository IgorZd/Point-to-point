// @ts-ignore
import styled from "@xstyled/styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { CityType } from "../../api/cities";
import { media } from "../../styles/media";
import { Container } from "./components/container/Container";
import { SearchedList } from "./components/searchedList/SearchedList";

const Wrapper = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: relative;
  ${media.tablet`
    width: 100%;
  `}
`;
const ErrorMessageWrapper = styled.div`
  padding: 7px 8px;
  background-color: rgb(255, 250, 236);
  border: 1px solid rgb(255, 193, 7);
  border-radius: 4px;
  margin-top: 4px;
`;
const Error = styled.span`
  color: rgb(211, 158, 0);
  font-size: 12px;
`;
const RemoveButton = styled.button`
  width: 16px;
  height: 16px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: -8px;
  top: -8px;
  font-size: 9px;
  font-weight: 600;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffff;
  color: rgb(55, 131, 197);
  transition: all 0.3s linear;
  &:hover {
    box-shadow: rgb(33 33 33) 0px 0px 6px -1px;
  }
`;

export const Input = ({
  value,
  onChange,
  onClick,
  label,
  placeholder,
  icon,
  setCoordinates,
  removeCity,
  searchedList,
  isLoadingInProcess,
}: {
  value: string;
  onChange: (value: string | number) => void;
  onClick: () => void;
  label: string;
  placeholder: string;
  icon: any;
  setCoordinates: (city: CityType) => void;
  removeCity: () => void;
  searchedList?: CityType[];
  isLoadingInProcess?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpenSearchList, setIsOpenSearchList] = useState(false);
  const [validatingIsStarted, setValidatingIsStarted] = useState(false);
  const inputRef = useRef<any>(null);
  const withSearchList = searchedList && searchedList.length > 0;
  const isTextInput =
    label === "Origin city" ||
    label === "Destination city" ||
    label === "Intermediate city";

  const inputOnChange = (value: string | number) => {
    if (isTextInput && typeof value === "string") {
      setValidatingIsStarted(true);
      setIsOpenSearchList(true);
      if (value.length === 0) {
        setIsOpenSearchList(false);
      }
      onChange(value);
    } else {
      if (value >= 0 && value <= 50) {
        onChange(+value);
      }
    }
  };
  const inputOnFocus = () => {
    setIsFocused(true);
  };
  const inputOnBlur = () => {
    setIsFocused(false);
    if (!isTextInput && +value === 0) {
      onChange(1);
    }
  };
  const clearInput = () => {
    onChange("");
    setIsOpenSearchList(false);
  };
  const searchItemOnClick = (city: CityType) => {
    setIsOpenSearchList(false);
    setCoordinates(city);
  };
  const outsideHandler = useCallback(
    (e: any) => {
      if (
        value.length > 0 &&
        isOpenSearchList &&
        !inputRef.current.contains(e.target)
      ) {
        clearInput();
      }
    },
    [value, isOpenSearchList]
  );

  useEffect(() => {
    window.addEventListener("click", outsideHandler);
    return () => {
      window.removeEventListener("click", outsideHandler);
    };
  }, [outsideHandler]);

  return (
    <Wrapper>
      <Container
        value={value}
        placeholder={placeholder}
        label={label}
        isFocused={isFocused}
        icon={icon}
        inputOnChange={inputOnChange}
        inputOnFocus={inputOnFocus}
        inputOnBlur={inputOnBlur}
        inputOnClick={onClick}
        clearInput={clearInput}
        inputRef={inputRef}
        isLoadingInProcess={isLoadingInProcess}
        isTextInput={isTextInput}
      />
      {isTextInput && validatingIsStarted && value.length === 0 && (
        <ErrorMessageWrapper>
          <Error>
            {
              "Hey speedy. Looks like you missed this field. We can't keep you moving without it - help us help you?"
            }
          </Error>
        </ErrorMessageWrapper>
      )}
      {isOpenSearchList && (
        <SearchedList
          searchItemOnClick={searchItemOnClick}
          withSearchList={withSearchList}
          searchedList={searchedList}
          isLoadingInProcess={isLoadingInProcess}
          icon={icon}
        />
      )}
      {!!removeCity && <RemoveButton onClick={removeCity}>X</RemoveButton>}
    </Wrapper>
  );
};

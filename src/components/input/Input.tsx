// @ts-ignore
import styled from "@xstyled/styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { CityType } from "../../api/cities";
import { Container } from "./components/container/Container";
import { SearchedList } from "./components/searchedList/SearchedList";

const Wrapper = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: relative;
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

export const Input = ({
  value,
  onChange,
  onClick,
  label,
  placeholder,
  icon,
  setCoordinates,
  searchedList,
  isLoadingInProcess,
}: {
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
  label: string;
  placeholder: string;
  icon: any;
  setCoordinates: (city: CityType) => void;
  searchedList?: CityType[];
  isLoadingInProcess?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [validatingIsStarted, setValidatingIsStarted] = useState(false);
  const [isOpenSearchList, setIsOpenSearchList] = useState(false);
  const inputRef = useRef<any>(null);
  const withSearchList = searchedList && searchedList.length > 0;

  const inputOnChange = (value: string) => {
    setValidatingIsStarted(true);
    setIsOpenSearchList(true);
    if (value.length === 0) {
      setIsOpenSearchList(false);
    }
    onChange(value);
  };
  const inputOnFocus = () => {
    setIsFocused(true);
  };
  const inputOnBlur = () => {
    setIsFocused(false);
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
      />
      {validatingIsStarted && value.length === 0 && (
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
          icon={icon}
        />
      )}
    </Wrapper>
  );
};

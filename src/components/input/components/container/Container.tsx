// @ts-ignore
import styled from "@xstyled/styled-components";
import { CloseButton } from "../closeButton/CloseButton";
import { ReactComponent as Arrow } from "../../../../assets/arrow.svg";
import { getRequiredDateFormat } from "../../../../utils/date-format";
import { IncreaseDecrease } from "../../../increaseDecrease/IncreaseDecrease";

const Wrapper = styled.div`
  box-shadow: ${(props: any) =>
    props.isFocused ? "none" : "rgb(33 33 33) 0px 0px 6px -1px"};
  transition: all 0.3s linear;
  border-radius: 4px;
  position: relative;
`;
const LabelWrapper = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(55, 131, 197);
  border-radius: 4px 4px 0 0;
`;
const Label = styled.h3`
  color: rgb(255, 255, 255);
  font-size: 16px;
  margin: 0;
`;
const InputWrapper = styled.div`
  width: 100%;
  height: 36px;
  position: relative;
`;
const LocalInput = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 38px;
  border-radius: 0 0 4px 4px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  color: #212121;
  font-family: "Inter";
`;
const IconWrapper = styled.div`
  width: 38px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  & > svg {
    & > path {
      transition: all 0.3s linear;
      stroke: ${(props: any) =>
        props.isFocused ? "rgb(55, 131, 197)" : "#212121"};
    }
  }
  &.withFill > svg {
    & > path {
      fill: ${(props: any) =>
        props.isFocused ? "rgb(55, 131, 197)" : "#212121"};
    }
  }
`;
const DateContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 38px;
  border-radius: 0 0 4px 4px;
  background-color: #ffff;
  cursor: pointer;
  position: relative;
`;
const ArrowIcon = styled(Arrow)`
  position: absolute;
  right: 5px;
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #212121;
`;

export const Container = ({
  value,
  placeholder,
  label,
  isFocused,
  icon,
  inputOnChange,
  inputOnFocus,
  inputOnBlur,
  clearInput,
  inputOnClick,
  inputRef,
  isLoadingInProcess,
  isTextInput,
}: {
  value: string;
  placeholder: string;
  label: string;
  isFocused: boolean;
  icon: () => void;
  inputOnChange: (value: string) => void;
  inputOnFocus: () => void;
  inputOnBlur: () => void;
  clearInput: () => void;
  inputOnClick: () => void;
  inputRef: React.MutableRefObject<any>;
  isLoadingInProcess?: boolean;
  isTextInput?: boolean;
}) => {
  return (
    <Wrapper isFocused={isFocused}>
      <LabelWrapper>
        <Label>{label}</Label>
      </LabelWrapper>
      <InputWrapper>
        <IconWrapper
          className={label === "Number of passengers" ? "withFill" : ""}
          isFocused={isFocused}
        >
          {icon()}
        </IconWrapper>
        {!!inputOnClick ? (
          <DateContainer onClick={inputOnClick}>
            <Text>{getRequiredDateFormat(value, "MMMM DD")}</Text>
            <ArrowIcon />
          </DateContainer>
        ) : (
          <LocalInput
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={(e: any) => {
              inputOnChange(e.target.value);
            }}
            onClick={inputOnClick}
            onFocus={inputOnFocus}
            onBlur={inputOnBlur}
          />
        )}
        {value.length > 0 &&
          label !== "Date" &&
          label !== "Number of passengers" && (
            <CloseButton
              onClick={clearInput}
              isLoadingInProcess={isLoadingInProcess && isFocused}
            />
          )}
        {label === "Number of passengers" && (
          <IncreaseDecrease
            value={+value}
            onChange={(value: number) => {
              inputOnChange(`${value}`);
            }}
          />
        )}
      </InputWrapper>
    </Wrapper>
  );
};

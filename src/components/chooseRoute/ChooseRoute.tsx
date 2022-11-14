// @ts-ignore
import styled from "@xstyled/styled-components";
import { useCallback, useState } from "react";
import { Input } from "../input/Input";
import { ReactComponent as LocationIcon } from "../../assets/Location.svg";
import { ReactComponent as DateIcon } from "../../assets/Calendar.svg";
import { ReactComponent as PersonIcon } from "../../assets/user.svg";
import { CityType, useGetCities } from "../../api/cities";
import { getRequiredDateFormat } from "../../utils/date-format";
import { DateModal } from "../dateModal/DateModal";
import { CommonButton } from "../CommonButton/CommonButton";

const Wrapper = styled.div`
  width: 700px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`;
const Title = styled.h2`
  font-size: 34px;
  color: white;
  font-weight: 300;
  margin: 0 0 15px 0;
`;
const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const ChooseRoute = () => {
  const [data, setData] = useState({
    originCity: { inputValue: "", lat: 0, lng: 0 },
    intermediateCities: [],
    destinationCity: { inputValue: "", lat: 0, lng: 0 },
    date: getRequiredDateFormat(new Date()),
    numberOfPassengers: 1,
  });
  const [isLoadingInProcess, setIsLoadingInProcess] = useState(false);
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);
  const [validatingIsStarted, setValidatingIsStarted] = useState(false);
  const isAllFieldsValid =
    data.originCity.inputValue.length > 0 &&
    data.destinationCity.inputValue.length > 0 &&
    data.date.length > 0 &&
    data.numberOfPassengers > 0;

  const inputOnChange = useCallback(
    (
      value: string,
      fieldName:
        | "originCity"
        | "intermediateCities"
        | "destinationCity"
        | "date"
        | "numberOfPassengers"
    ) => {
      setData({
        ...data,
        [`${fieldName}`]:
          fieldName === "date" || fieldName === "numberOfPassengers"
            ? value
            : { ...data[`${fieldName}`], inputValue: value },
      });
    },
    [data]
  );
  const setCoordinates = (
    city: CityType,
    fieldName: "originCity" | "destinationCity"
  ) => {
    const { name, lat, lng } = city;
    setData({
      ...data,
      [`${fieldName}`]: { inputValue: name, lat, lng },
    });
  };
  const setDate = (date: string) => {
    setData({ ...data, date });
  };
  const setOnClickDateModal = (date: string) => {
    setDate(date);
    setIsOpenDateModal(false);
  };
  const cancelOnClickDateModal = () => {
    setIsOpenDateModal(false);
  };
  const setPassengersCount = (value: number) => {
    setData({ ...data, numberOfPassengers: value });
  };
  const searchOnClick = () => {
    setValidatingIsStarted(true);
    if (isAllFieldsValid) {
      console.log("data: ", data);
    }
  };
  const inputsList = [
    {
      val: { ...data.originCity },
      onChange: (value: string) => {
        inputOnChange(value, "originCity");
      },
      setCoordinates,
      cities: useGetCities(data.originCity.inputValue, setIsLoadingInProcess),
      label: "Origin city",
      fieldName: "originCity",
      placeholder: "Choose a city",
      icon: () => <LocationIcon />,
    },
    ...data.intermediateCities,
    {
      val: data.destinationCity,
      onChange: (value: string) => {
        inputOnChange(value, "destinationCity");
      },
      setCoordinates,
      cities: useGetCities(
        data.destinationCity.inputValue,
        setIsLoadingInProcess
      ),
      label: "Destination city",
      fieldName: "destinationCity",
      placeholder: "Choose a city",
      icon: () => <LocationIcon />,
    },
    {
      val: data.date,
      onClick: () => {
        setIsOpenDateModal(true);
      },
      label: "Date",
      placeholder: "",
      icon: () => <DateIcon />,
    },
    {
      val: data.numberOfPassengers,
      onChange: (value: number) => {
        setPassengersCount(value);
      },
      label: "Number of passengers",
      placeholder: "",
      icon: () => <PersonIcon />,
    },
  ];

  return (
    <Wrapper>
      <Title>Choose a route</Title>
      <InputsWrapper>
        {inputsList.map((item: any, index: number) => {
          const {
            val,
            onChange,
            onClick,
            setCoordinates,
            label,
            fieldName,
            placeholder,
            icon,
            cities,
          } = item;

          return (
            <Input
              key={index}
              value={
                label === "Number of passengers" || label === "Date"
                  ? val
                  : val.inputValue
              }
              onChange={onChange}
              onClick={onClick}
              label={label}
              placeholder={placeholder}
              icon={icon}
              searchedList={cities}
              isLoadingInProcess={isLoadingInProcess}
              validatingIsStarted={validatingIsStarted}
              setCoordinates={(city: CityType) => {
                setCoordinates(city, fieldName);
              }}
              setValidatingIsStarted={setValidatingIsStarted}
            />
          );
        })}
      </InputsWrapper>
      <ButtonWrapper>
        <CommonButton
          width={"168px"}
          height={"40px"}
          value={"SEARCH"}
          onClick={searchOnClick}
          backgroundColor={"rgb(246, 185, 0)"}
          backgroundColorHover={"rgb(211, 158, 0)"}
        />
      </ButtonWrapper>
      <DateModal
        isOpenModal={isOpenDateModal}
        setOnClick={setOnClickDateModal}
        cancelOnClick={cancelOnClickDateModal}
        date={data.date}
      />
    </Wrapper>
  );
};

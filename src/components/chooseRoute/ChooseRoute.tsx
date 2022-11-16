// @ts-ignore
import styled from "@xstyled/styled-components";
import { useCallback, useState } from "react";
import { Input } from "../input/Input";
import { ReactComponent as LocationIcon } from "../../assets/Location.svg";
import { ReactComponent as DateIcon } from "../../assets/Calendar.svg";
import { ReactComponent as PersonIcon } from "../../assets/user.svg";
import { CityType, useGetCitiesByKeyWord } from "../../api/cities";
import { getRequiredDateFormat } from "../../utils/date-format";
import { DateModal } from "../dateModal/DateModal";
import { CommonButton } from "../CommonButton/CommonButton";
import { ReactComponent as AddIcon } from "../../assets/Add.svg";
import { media } from "../../styles/media";
import { useCustomHistory } from "../../utils/react-router-dom-abstraction";
import { View } from "../../routes";

const Wrapper = styled.div`
  width: 700px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  ${media.tablet`
    width: 100%;
  `}
`;
const TitleWrapper = styled.div`
  width: max-content;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 0 10px;
  ${media.tablet`
    width: 100%;
  `}
`;
const Title = styled.h2`
  font-size: 34px;
  color: white;
  font-weight: 300;
  margin: 0;
`;
const Add = styled(AddIcon)`
  width: 32px;
  height: 32px;
  margin-left: 8px;
  cursor: pointer;
  & > path {
    transition: all 0.3s linear;
  }
  &:hover {
    & > path {
      stroke: #ebebf0;
      transition: all 0.3s linear;
    }
  }
`;
const InputsWrapper = styled.div`
  width: 100%;
  max-height: 515px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: auto;
  padding: 10px;
  ${media.tablet`
    flex-direction: column;
    flex-wrap: nowrap;
    max-height: 505px;
  `}
`;
const ButtonWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  ${media.tablet`
    & > button {
      width: 100%;
    }
  `};
`;

export const ChooseRoute = () => {
  const [data, setData] = useState<any>({
    originCity: { inputValue: "", lat: 0, lng: 0 },
    intermediateCities: [],
    destinationCity: { inputValue: "", lat: 0, lng: 0 },
    date: getRequiredDateFormat(new Date()),
    numberOfPassengers: 1,
  });
  const [isLoadingInProcess, setIsLoadingInProcess] = useState(false);
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);
  const [intermediateInputValue, setIntermediateInputValue] = useState("");
  const isIntermediateCitiesValid =
    data.intermediateCities.length ===
    data.intermediateCities.filter((item: any) => item.inputValue.length > 0)
      .length;
  const isAllFieldsValid =
    data.originCity.inputValue.length > 0 &&
    data.destinationCity.inputValue.length > 0 &&
    data.date.length > 0 &&
    data.numberOfPassengers > 0 &&
    isIntermediateCitiesValid;
  const intermediateCitiesList = useGetCitiesByKeyWord(
    intermediateInputValue,
    setIsLoadingInProcess
  );
  const history = useCustomHistory();

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
  const setCoordinates = useCallback(
    (city: CityType, fieldName: "originCity" | "destinationCity") => {
      const { name, lat, lng } = city;
      setData({
        ...data,
        [`${fieldName}`]: { inputValue: name, lat, lng },
      });
    },
    [data]
  );
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
    if (isAllFieldsValid) {
      const prepInterm = data.intermediateCities
        .map((item: any) => item.inputValue)
        .join(",");
      history.push(View.DESTINATION, {
        pathParams: {
          originCity: data.originCity.inputValue,
          destinationCity: data.destinationCity.inputValue,
          intermediateCities: prepInterm.length > 0 ? prepInterm : "no",
          date: data.date,
          numberOfPassengers: data.numberOfPassengers,
        },
      });
    }
  };
  const addIntermidiateCity = () => {
    const preparedCities = [
      ...data.intermediateCities,
      { inputValue: "", lat: 0, lng: 0 },
    ];
    setData({ ...data, intermediateCities: preparedCities });
  };
  const preparedIntermediateCitiesArr =
    data.intermediateCities.length === 0
      ? []
      : data.intermediateCities.map((city: any, index: number) => ({
          val: { ...city },
          onChange: (value: string) => {
            setIntermediateInputValue(value);
            setData({
              ...data,
              intermediateCities: data.intermediateCities.map(
                (item: any, i: number) =>
                  i === index ? { ...item, inputValue: value } : item
              ),
            });
          },
          setCoordinates: (city: CityType) => {
            const { name, lat, lng } = city;
            setData({
              ...data,
              intermediateCities: data.intermediateCities.map(
                (item: any, i: number) =>
                  i === index ? { inputValue: name, lat, lng } : item
              ),
            });
          },
          removeCity: () => {
            setData({
              ...data,
              intermediateCities: data.intermediateCities.filter(
                (item: any, i: number) => i !== index
              ),
            });
          },
          cities: intermediateCitiesList,
          label: "Intermediate city",
          fieldName: "intermediateCities",
          placeholder: "Choose a city",
          icon: () => <LocationIcon />,
        }));
  const inputsList = [
    {
      val: { ...data.originCity },
      onChange: (value: string) => {
        inputOnChange(value, "originCity");
      },
      setCoordinates,
      cities: useGetCitiesByKeyWord(
        data.originCity.inputValue,
        setIsLoadingInProcess
      ),
      label: "Origin city",
      fieldName: "originCity",
      placeholder: "Choose a city",
      icon: () => <LocationIcon />,
    },
    ...preparedIntermediateCitiesArr,
    {
      val: data.destinationCity,
      onChange: (value: string) => {
        inputOnChange(value, "destinationCity");
      },
      setCoordinates,
      cities: useGetCitiesByKeyWord(
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
      <TitleWrapper>
        <Title>Choose a route</Title>
        <Add onClick={addIntermidiateCity} />
      </TitleWrapper>
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
            removeCity,
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
              setCoordinates={(city: CityType) => {
                setCoordinates(city, fieldName);
              }}
              removeCity={removeCity}
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
          disabled={!isAllFieldsValid}
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

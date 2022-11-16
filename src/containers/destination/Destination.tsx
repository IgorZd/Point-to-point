// @ts-ignore
import styled from "@xstyled/styled-components";
import { CityType, useGetCities } from "../../api/cities";
import { DestinationPoint } from "../../components/destinationPoint/DestinationPoint";
import { DistanceLine } from "../../components/distanceLine/DistanceLine";
import { media } from "../../styles/media";
import { getRequiredDateFormat } from "../../utils/date-format";
import { findDistance } from "../../utils/distance";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  width: max-content;
  &.distance {
    margin-top: 50px;
  }
  ${media.tablet`
    width: 100%;
    text-align: center;
  `}
`;
const PointsWrapper = styled.div`
  width: max-content;
  box-sizing: border-box;
  max-width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  padding: 0 15px;
  ${media.tablet`
    flex-direction: column;
  `}
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet`
    flex-direction: column;
  `}
`;

export const Destination = ({ match }: { match: any }) => {
  const pathParams = match.params;
  const namesArrIntermediateCities = pathParams.intermediateCities.split(",");
  const cities = useGetCities();
  const isMiles = false;
  const originCity = cities.find(
    (item: CityType) => item.name === pathParams.originCity
  );
  const destinationCity = cities.find(
    (item: CityType) => item.name === pathParams.destinationCity
  );
  const intermediateCities =
    namesArrIntermediateCities[0] !== "no"
      ? namesArrIntermediateCities.map((name: string) => {
          const city = cities.filter((item: CityType) => item.name === name)[0];
          return city;
        })
      : [];
  const date = getRequiredDateFormat(pathParams.date, "MMMM DD");
  const numberOfPassengers = pathParams.numberOfPassengers;
  const routeArr = [originCity, ...intermediateCities, destinationCity];
  const generalDistance = routeArr.reduce((accumulator, value, index, arr) => {
    if (index + 1 < arr.length) {
      const distance = findDistance(
        [value.lat, value.lng],
        [arr[index + 1].lat, arr[index + 1].lng],
        isMiles
      );
      return accumulator + distance;
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <Wrapper>
      <Title>Your route</Title>
      {originCity && destinationCity && (
        <PointsWrapper>
          {routeArr.map((city: CityType, index: number, arr: CityType[]) => {
            const { name, lat, lng } = city;
            return (
              <Container key={index}>
                <DestinationPoint name={name} />
                {index + 1 < arr.length && (
                  <DistanceLine
                    distance={findDistance(
                      [lat, lng],
                      [arr[index + 1].lat, arr[index + 1].lng],
                      isMiles
                    )}
                    isMiles={isMiles}
                  />
                )}
              </Container>
            );
          })}
        </PointsWrapper>
      )}
      <Title className={"distance"}>{`General distance: ${generalDistance} ${
        isMiles ? "miles" : "km"
      }`}</Title>
      <Title>{`Date: ${date}`}</Title>
      <Title>{`Number of passengers: ${numberOfPassengers}`}</Title>
    </Wrapper>
  );
};

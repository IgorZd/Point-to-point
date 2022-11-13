// @ts-ignore
import styled from "@xstyled/styled-components";
import { useState } from "react";
import { useGetCities } from "../../api/cities";
import { Modal } from "../../components/modal/Modal";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = () => {
  const [isLoadingInProcess, setIsLoadingInProcess] = useState(false);
  const cities = useGetCities();

  console.log("cities: ", cities);

  return (
    <Wrapper>
      <Modal />
    </Wrapper>
  );
};

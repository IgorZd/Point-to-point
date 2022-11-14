// @ts-ignore
import styled from "@xstyled/styled-components";
import { Modal } from "../../components/modal/Modal";
import background from "../../assets/617993f114b981224d64278eaf108e17.jpeg";
import { useState } from "react";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props: any) => props.background});
  background-position: center;
  background-size: cover;
`;

export const Main = () => {
  return (
    <Wrapper background={background}>
      <Modal />
    </Wrapper>
  );
};

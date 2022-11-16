// @ts-ignore
import styled from "@xstyled/styled-components";
import { ReactComponent as LocationIcon } from "../../assets/Location.svg";

const Wrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;
const Name = styled.span``;

export const DestinationPoint = ({ name }: { name: string }) => {
  return (
    <Wrapper>
      <LocationIcon />
      <Name>{name}</Name>
    </Wrapper>
  );
};

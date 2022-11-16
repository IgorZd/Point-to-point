// @ts-ignore
import styled from "@xstyled/styled-components";
import { media } from "../../styles/media";

const Wrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.tablet`
    margin: 20px;
    position: relative;
  `}
`;
const Distance = styled.span`
  ${media.tablet`
    position: absolute;
    width: max-content;
    top: -10px;
    left: 28px;
  `}
`;
const Line = styled.div`
  width: 200px;
  height: 1px;
  background-color: #212121;
  ${media.tablet`
    width: 40px;
    transform: rotate(90deg);
  `}
`;

export const DistanceLine = ({
  distance,
  isMiles,
}: {
  distance: number;
  isMiles?: boolean;
}) => {
  return (
    <Wrapper>
      <Distance>{`${distance} ${isMiles ? "miles" : "km"}`}</Distance>
      <Line />
    </Wrapper>
  );
};

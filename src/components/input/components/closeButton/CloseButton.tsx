// @ts-ignore
import styled from "@xstyled/styled-components";
import { ReactComponent as Close } from "../../../../assets/Close.svg";

const Wrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 6px;
  z-index: 1;
`;
const Loader = styled.span`
  width: 26px;
  height: 26px;
  display: inline-block;
  position: relative;
  &::after,
  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgb(55, 131, 197);
    position: absolute;
    left: 3;
    top: 3;
    animation: animloader14 0.5s linear infinite;
  }
  &::after {
    animation-delay: 0s;
  }
  @keyframes animloader14 {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
const CloseIcon = styled(Close)`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

export const CloseButton = ({
  onClick,
  isLoadingInProcess,
}: {
  onClick: () => void;
  isLoadingInProcess?: boolean;
}) => {
  return (
    <Wrapper>
      {isLoadingInProcess && <Loader />}
      <CloseIcon onClick={onClick} />
    </Wrapper>
  );
};

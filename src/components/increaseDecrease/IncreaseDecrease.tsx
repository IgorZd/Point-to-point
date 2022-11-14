// @ts-ignore
import styled from "@xstyled/styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 9px;
  right: 6px;
  z-index: 1;
`;

const Box = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgb(55, 131, 197);
  color: #ffff;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    box-shadow: rgb(33 33 33) 0px 0px 6px -1px;
  }
  &.disabled {
    user-select: none;
    box-shadow: none;
    cursor: auto;
    opacity: 0.6;
  }
`;
const Text = styled.span`
  color: #ffff;
  font-size: 16px;
  font-weight: 800;
  line-height: 8px;
  user-select: none;
`;

export const IncreaseDecrease = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <Wrapper>
      <Box
        onClick={() => {
          value > 1 && onChange(+value - 1);
        }}
        className={value === 1 ? "disabled" : ""}
      >
        <Text>{"-"}</Text>
      </Box>
      <Box
        onClick={() => {
          value < 50 && onChange(+value + 1);
        }}
        className={value === 50 ? "disabled" : ""}
      >
        <Text>{"+"}</Text>
      </Box>
    </Wrapper>
  );
};

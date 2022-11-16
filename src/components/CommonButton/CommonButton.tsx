// @ts-ignore
import styled from "@xstyled/styled-components";

const Button = styled.button`
  width: ${(props: any) => (props.width ? props.width : "155px")};
  height: ${(props: any) => (props.width ? props.height : "34px")};
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props: any) => (props.color ? props.color : "#ffff")};
  background-color: ${(props: any) =>
    props.backgroundColor ? props.backgroundColor : "rgb(55, 131, 197)"};
  transition: all 0.3s linear;

  &:hover {
    color: ${(props: any) => (props.hoverColor ? props.hoverColor : "#ffff")};
    background-color: ${(props: any) =>
      props.backgroundColorHover ? props.backgroundColorHover : "#216ba5"};
  }
  &.disabled {
    opacity: 0.8;
    pointer-events: none;
  }
`;

export const CommonButton = ({
  value,
  onClick,
  width,
  height,
  color,
  hoverColor,
  backgroundColor,
  backgroundColorHover,
  disabled,
  className,
}: {
  value: string;
  onClick: () => void;
  width?: string;
  height?: string;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  backgroundColorHover?: string;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      width={width}
      height={height}
      color={color}
      hoverColor={hoverColor}
      backgroundColor={backgroundColor}
      backgroundColorHover={backgroundColorHover}
      className={`${disabled ? `disabled` : ""} ${className}`}
    >
      {value}
    </Button>
  );
};

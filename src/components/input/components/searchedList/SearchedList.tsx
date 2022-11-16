// @ts-ignore
import styled from "@xstyled/styled-components";
import { CityType } from "../../../../api/cities";

const Wrapper = styled.ul`
  width: 100%;
  box-sizing: border-box;
  max-height: 74px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 76px;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #ffffff;
  border-radius: 4px;
  z-index: 10;
  border: 1px solid;
  border-color: #ebebf0;
  transition: all 0.3s;
  &.disabled {
    user-select: none;
  }
`;
const Layer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0;
  position: absolute;
  z-index: 1;
  &.disabled {
    opacity: 0.6;
    z-index: 11;
  }
`;
const SearchedItem = styled.li`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s linear;
  position: relative;
  z-index: ${(props: any) => (props.disabled ? "1" : "10")};
  &.first {
    border-radius: 4px 4px 0 0;
  }
  &.last {
    border-radius: 0 0 4px 4px;
  }
  &.alone {
    border-radius: 4px;
  }
  &:hover {
    background-color: #ebebf0;
  }
`;
const Text = styled.span`
  margin-left: 5px;
  &.no_data {
    width: max-content;
    margin: 17px 0;
  }
`;

export const SearchedList = ({
  searchItemOnClick,
  searchedList,
  icon,
  withSearchList,
  isLoadingInProcess,
}: {
  searchItemOnClick: (city: CityType) => void;
  icon: () => void;
  withSearchList?: boolean;
  searchedList?: CityType[];
  isLoadingInProcess?: boolean;
}) => {
  return (
    <Wrapper className={isLoadingInProcess ? "disabled" : ""}>
      {withSearchList ? (
        searchedList?.map((item: any, index: number) => {
          return (
            <SearchedItem
              key={index}
              className={
                searchedList.length === 1 && index === 0
                  ? "alone"
                  : index === 0
                  ? "first"
                  : index === searchedList.length - 1
                  ? "last"
                  : ""
              }
              disabled={isLoadingInProcess}
              onClick={(e: any) => {
                e.stopPropagation();
                searchItemOnClick(item);
              }}
            >
              {icon()}
              <Text>{item.name}</Text>
            </SearchedItem>
          );
        })
      ) : (
        <Text className={"no_data"}>No Data</Text>
      )}
      <Layer className={isLoadingInProcess ? "disabled" : ""} />
    </Wrapper>
  );
};

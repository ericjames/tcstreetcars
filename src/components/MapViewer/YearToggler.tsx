import { Corridor, YearRange } from "../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { YEAR_RANGES } from "../../constants";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

type IProps = {
  yearRange: YearRange;
  selectedCorridor?: Corridor | null;
  setYearRange: Dispatch<SetStateAction<YearRange>>;
};

const YearToggler: FC<IProps> = ({
  selectedCorridor,
  yearRange,
  setYearRange,
}) => {
  const onButtonClick = (range: YearRange) => {
    setYearRange(range);
  };
  return (
    <Wrapper
      className={`btn-group`}
    >
      {YEAR_RANGES.map((range) => {
        const isAllYears = !range[0] && !range[1];
        const isSelected = isAllYears
          ? !yearRange[0] && !yearRange[1]
          : range === yearRange;

        return (
          <button
            onClick={() => onButtonClick(range)}
            className={`btn btn-small ${isSelected ? "btn-light" : ""}`}
          >
            {isAllYears ? "All Years" : `${range[0]} - ${range[1]}`}
          </button>
        );
      })}
    </Wrapper>
  );
};

export default YearToggler;

import { Corridor, IPropsYearToggler, YearRange } from "../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { YEAR_RANGES } from "../../constants";
import styled from "styled-components";

const Wrapper = styled.div``;

const YearToggler: FC<IPropsYearToggler> = ({
  selectedCorridor,
  yearRange,
  setYearRange,
}) => {
  const onButtonClick = (range: YearRange) => {
    setYearRange(range);
  };
  return (
    <Wrapper className={`btn-group`}>
      {YEAR_RANGES.map((range, i) => {
        const isAllYears = !range[0] && !range[1];
        const isSelected =
          isAllYears && yearRange
            ? !yearRange[0] && !yearRange[1]
            : range === yearRange;

        return (
          <button
            key={i}
            onClick={() => onButtonClick(range)}
            className={`btn btn-white p-3 fs-7 ${
              isSelected
                ? "btn-selected border-top-0 border-start-0 border-end-0 border-4 bg-transparent"
                : ""
            }`}>
            {isAllYears ? "All Time" : `${range[0]} - ${range[1]}`}
          </button>
        );
      })}
    </Wrapper>
  );
};

export default YearToggler;

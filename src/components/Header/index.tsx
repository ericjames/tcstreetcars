import React, { FC } from "react";

import { IPropsHeader } from "../../constants/types";
import { NAVIGATION } from "../../constants";
import YearToggler from "../YearToggler";
import styled from "styled-components";

const Wrapper = styled.div`
  button {
    font-family: var(--font-sans);
    font-weight: 300;
    &.btn-selected {
      font-weight: 400;
    }
  }
`;

const Header: FC<IPropsHeader> = ({
  navigation,
  setSiteNavigation,
  selectedCorridor,
  yearRange,
  setYearRange,
}) => {
  return (
    <Wrapper className="d-flex align-items-center border-bottom justify-content-between pe-2">
      <div className="btn-group">
        {NAVIGATION.map((nav, i) => (
          <button
            key={i}
            className={`btn btn-white p-3 fs-7 ${
              nav.title === navigation?.title
                ? "btn-selected border-top-0 border-start-0 border-end-0 border-4 bg-transparent"
                : ""
            }`}
            onClick={() => setSiteNavigation(nav)}>
            {nav.title}
          </button>
        ))}
      </div>

      <YearToggler
        selectedCorridor={selectedCorridor}
        yearRange={yearRange}
        setYearRange={setYearRange}
      />
    </Wrapper>
  );
};

export default Header;

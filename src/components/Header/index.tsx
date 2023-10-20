import React, { FC, SetStateAction } from "react";

import { IPropsHeader } from "../../constants/types";
import { NAVIGATION } from "../../constants";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Oswald";
`;

const Header: FC<IPropsHeader> = ({ navigation, setNavigation }) => {
  return (
    <Wrapper className="d-flex align-items-center">
      <div className="btn-group">
        {NAVIGATION.map((nav) => (
          <button
            className={`btn btn-white p-3 fs-5 ${
              nav.title === navigation?.title
                ? "btn-selected border-top-0 border-start-0 border-end-0"
                : ""
            }`}
            onClick={() => setNavigation(nav)}>
            {nav.title}
          </button>
        ))}
      </div>
    </Wrapper>
  );
};

export default Header;

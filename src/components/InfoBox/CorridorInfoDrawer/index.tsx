import React, { FC } from "react";

import { ArrowLeftCircle } from "react-bootstrap-icons";
import { IPropsCorridorInfo } from "../../../constants/types";
import Icon from "../../common/Icon";
import styled from "styled-components";

const Wrapper = styled.div<{ "data-isactive"?: string }>`
  top: 0;
  left: ${(p) => (p["data-isactive"] === "true" ? "0" : "110%")};
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: absolute;
  z-index: 10;
  transition: all 350ms ease-out;
`;

const StyledHeader = styled.div`
  display: flex;
  margin-bottom: 1em;
  img {
    margin-right: 0.5em;
    width: 2em;
    height: auto;
  }
`;

const CorridorInfoDrawer: FC<IPropsCorridorInfo> = ({
  selectedCorridor,
  setSelectedCorridor,
}) => {
  return (
    <Wrapper
      className="bg-sidebar shadow-lg"
      data-isactive={`${selectedCorridor !== null}`}>
      <button
        className="btn btn-lg"
        onClick={() => setSelectedCorridor(null)}>
        <ArrowLeftCircle />
      </button>

      <div className="p-3">
        <StyledHeader>
          <Icon name={selectedCorridor?.DATA_TYPE.toLowerCase()} />
          <h2>{selectedCorridor?.routeName}</h2>
        </StyledHeader>
        <ul>
          <li>Year Start: {selectedCorridor?.yearStart}</li>
          <li>Year End: {selectedCorridor?.yearEnd}</li>
        </ul>

        <p>{selectedCorridor?.description}</p>
      </div>
    </Wrapper>
  );
};

export default CorridorInfoDrawer;

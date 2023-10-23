import React, { FC } from "react";

import { IPropsCorridorInfo } from "../../../constants/types";
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

const CorridorInfo: FC<IPropsCorridorInfo> = ({
  selectedCorridor,
  setSelectedCorridor,
}) => {
  return (
    <Wrapper
      className="bg-sidebar shadow-lg"
      data-isactive={`${selectedCorridor !== null}`}>
      <button className="btn btn-lg" onClick={() => setSelectedCorridor(null)}>
        &larr;
      </button>

      <div className="p-3">
        <h1>{selectedCorridor?.routeName}</h1>
        <ul>
          <li>DATA_TYPE: {selectedCorridor?.DATA_TYPE}</li>
          <li>DATA_CORRIDOR: {selectedCorridor?.DATA_CORRIDOR}</li>
          <li>Route Name: {selectedCorridor?.routeName}</li>
          <li>Route Number: {selectedCorridor?.routeNumber}</li>
          <li>Year Start: {selectedCorridor?.yearStart}</li>
          <li>Year End: {selectedCorridor?.yearEnd}</li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default CorridorInfo;

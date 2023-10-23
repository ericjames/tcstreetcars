import { IPropsInfoBox, TransitTypes } from "../../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import TCStreetcar from "./TCStreetcar";
import graphicStreetcar from "../../../images/graphic_streetcar.png";
import styled from "styled-components";

const StyledImage = styled.div`
  height: 200px;
  overflow: hidden;
`;

const TCInfo: FC<IPropsInfoBox> = ({
  selectedCorridor,
  setSelectedCorridor,
  selectedType,
  setSelectedType,
  corridors,
  navigation,
}) => {
  return (
    <>
      <StyledImage className="bg-picture">
        {selectedType === TransitTypes.STREETCAR && (
          <img
            className="w-100 h-100 object-fit-cover"
            src={graphicStreetcar}
          />
        )}
      </StyledImage>
      <div className="p-4">
        {navigation?.types && (
          <div className="btn-group w-100 mb-4">
            {navigation?.types?.map((type, i) => (
              <button
                key={i}
                className={`btn btn-outline-secondary ${
                  selectedType === type ? "btn-secondary text-white" : ""
                }`}
                onClick={() => setSelectedType(type)}>
                {type}
              </button>
            ))}
          </div>
        )}

        <h1>Twin Cities</h1>
        {selectedType === TransitTypes.STREETCAR ? (
          <TCStreetcar
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            corridors={corridors}
          />
        ) : selectedType === TransitTypes.HORSECAR ? (
          <p>Horsecar</p>
        ) : selectedType === TransitTypes.BUS ? (
          <p>Bus</p>
        ) : (
          <></>
        )}
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default TCInfo;

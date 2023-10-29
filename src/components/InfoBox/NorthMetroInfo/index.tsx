import { IPropsInfoBox, TransitTypes } from "../../../constants/types";
import React, { FC } from "react";

import RouteList from "../RouteList";
import graphicStreetcar from "../../../images/graphic_streetcar.png";
import styled from "styled-components";

const StyledImage = styled.div`
  height: 100px;
  overflow: hidden;
`;

const NorthMetroInfo: FC<IPropsInfoBox> = ({
  selectedCorridor,
  setSelectedCorridor,
  selectedType,
  setSelectedType,
  corridors = null,
  navigation = null,
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
        <h1>North Metro</h1>
        <p></p>

        <RouteList
          corridors={corridors}
          selectedCorridor={selectedCorridor}
          setSelectedCorridor={setSelectedCorridor}
          filterOut={[["mainCity", "Anoka"]]}
          sortProperty="routeName"
          heading="Anoka"
        />
        <br />
        <br />
      </div>
    </>
  );
};

export default NorthMetroInfo;

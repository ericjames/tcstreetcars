import { IPropsInfoBox, TransitTypes } from "../../../constants/types";
import React, { FC } from "react";

import RouteList from "../RouteList";
import graphicStreetcar from "../../../images/graphic_streetcar.png";
import styled from "styled-components";

const StyledImage = styled.div`
  height: 100px;
  overflow: hidden;
`;

const EastMetroInfo: FC<IPropsInfoBox> = ({
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
        <h1>East Metro</h1>
        <p>
          An early streetcar system served Stillwater but it didn't become a
          bedroom community until TCRT extended a line out from White Bear Lake.
        </p>

        <RouteList
          corridors={corridors}
          selectedCorridor={selectedCorridor}
          setSelectedCorridor={setSelectedCorridor}
          filterOut={[
            ["mainCity", "East Metro"],
          ]}
          sortProperty="routeName"
          heading="Stillwater"
        />
        <br />
        <br />
      </div>
    </>
  );
};

export default EastMetroInfo;

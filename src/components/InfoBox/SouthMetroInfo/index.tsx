import { IPropsInfoBox, TransitTypes } from "../../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import ButtonGroup from "../../common/ButtonGroup";
import RouteList from "../RouteList";
import graphicStreetcar from "../../../images/graphic_streetcar.png";
import styled from "styled-components";

const StyledImage = styled.div`
  height: 100px;
  overflow: hidden;
`;

const SouthMetroInfo: FC<IPropsInfoBox> = ({
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
        <h1>South Metro</h1>
        <p>
          Commuter rail served the early suburbs and cities of Southern
          Minnesota. South St. Paul ran streetcars while Marion Savage's Dan
          Patch Line drew visitors to Lakeville. Transportation was generally
          limited due to the wide and flood-prone Minnesota River with
          precarious bridge connections.
        </p>

        <RouteList
          corridors={corridors}
          selectedCorridor={selectedCorridor}
          setSelectedCorridor={setSelectedCorridor}
          filterOut={[["mainCity", "South Metro"]]}
          sortProperty="routeName"
          heading="Southern Communities"
        />
        <br />
        <br />
      </div>
    </>
  );
};

export default SouthMetroInfo;

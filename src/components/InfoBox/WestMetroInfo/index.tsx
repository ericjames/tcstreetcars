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

const WestMetroInfo: FC<IPropsInfoBox> = ({
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
        <ButtonGroup
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          navigation={navigation}
        />

        <h1>West Metro</h1>
        {selectedType === TransitTypes.STREETCAR ? (
          <>
            <p>
              Streetcars originally served the growing western communities to
              industrial work centers in Minneapolis.
            </p>

            <RouteList
              corridors={corridors}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              filterOut={[
                ["mainCity", "West Metro"],
                ["DATA_TYPE", selectedType?.toString() || ""],
              ]}
              sortProperty="routeName"
              heading="Western Communities"
            />
          </>
        ) : selectedType === TransitTypes.FERRY ? (
          <>
            <p>
              Ferries sailed across Lake Minnetonka to serve local residents
              commuting to streetcar lines and during summer months vacationing southerners escaping
              the heat.
            </p>

            <RouteList
              corridors={corridors}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              filterOut={[
                ["mainCity", "West Metro"],
                ["DATA_TYPE", selectedType?.toString() || ""],
              ]}
              sortProperty="routeName"
              heading="Lake Minnetonka"
            />
          </>
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

export default WestMetroInfo;

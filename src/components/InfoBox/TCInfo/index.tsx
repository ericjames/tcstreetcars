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

const TCInfo: FC<IPropsInfoBox> = ({
  selectedCorridor,
  setSelectedCorridor,
  selectedType,
  setSelectedType,
  corridors = null,
  navigation = null,
}) => {
  return (
    <>
      {/* <StyledImage className="bg-picture">
        {selectedType === TransitTypes.STREETCAR && (
          <img
            className="w-100 h-100 object-fit-cover"
            src={graphicStreetcar}
          />
        )}
      </StyledImage> */}
      <div className="p-4">
        {/* <ButtonGroup
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          navigation={navigation}
        /> */}
        <h1>Twin Cities</h1>
        {selectedType === TransitTypes.STREETCAR ? (
          <>
            <p>
              A great streetcar system created the Twin Cities metro area and
              peaked at around 1947 until its demise in 1954. Explore the map by
              hovering over routes and clicking on them to enter. You can also
              directly select routes below or explore other regions in the
              navigation bar above.
            </p>
            <RouteList
              corridors={corridors}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              filterOut={[
                ["mainCity", "Minneapolis"],
                ["DATA_TYPE", selectedType?.toString() || ""],
              ]}
              sortProperty="routeName"
              heading="Minneapolis"
            />
            <RouteList
              corridors={corridors}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              filterOut={[
                ["mainCity", "Saint Paul"],
                ["DATA_TYPE", selectedType?.toString() || ""],
              ]}
              sortProperty="routeName"
              heading="Saint Paul"
            />
          </>
        ) : selectedType === TransitTypes.HORSECAR ? (
          <>
            <p>Horsecar </p>
            <RouteList
              corridors={corridors}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              filterOut={[
                ["mainCity", "Minneapolis"],
                ["DATA_TYPE", selectedType?.toString() || ""],
              ]}
              sortProperty="routeName"
              heading="Minneapolis"
            />
          </>
        ) : selectedType === TransitTypes.BUS ? (
          <>
            <p>Bus </p>
            <RouteList
              corridors={corridors}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              filterOut={[
                ["mainCity", "Minneapolis"],
                ["DATA_TYPE", selectedType?.toString() || ""],
              ]}
              sortProperty="routeName"
              heading="Minneapolis"
            />
            <RouteList
              corridors={corridors}
              selectedCorridor={selectedCorridor}
              setSelectedCorridor={setSelectedCorridor}
              filterOut={[
                ["mainCity", "Saint Paul"],
                ["DATA_TYPE", selectedType?.toString() || ""],
              ]}
              sortProperty="routeName"
              heading="Saint Paul"
            />
          </>
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

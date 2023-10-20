import { Corridor, IPropsInfoBox } from "../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import CorridorInfo from "./CorridorInfo";
import RouteList from "./RouteList";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const InfoBox: FC<IPropsInfoBox> = ({
  selectedCorridor,
  setSelectedCorridor,
  selectedType,
  setSelectedType,
  corridors,
  navigation,
}) => {
  // const [appState, setAppState] = useState<AppState>(null);

  return (
    <Wrapper className="bg-sidebar">
      <CorridorInfo
        selectedCorridor={selectedCorridor}
        setSelectedCorridor={setSelectedCorridor}
      />

      <div className={`p-4 h-100 overflow-scroll`}>
        <p>
          A grand transportation system created the Twin Cities metro area.
          Explore by metro region above and select routes below.
        </p>

        {navigation?.types && (
          <div className="btn-group w-100 mb-4">
            {navigation?.types?.map((type) => (
              <button
                className={`btn btn-outline-secondary ${
                  selectedType === type ? "btn-selected" : ""
                }`}
                onClick={() => setSelectedType(type)}>
                {type}
              </button>
            ))}
          </div>
        )}

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
        <br />
        <br />
        <br />
      </div>
    </Wrapper>
  );
};

export default InfoBox;

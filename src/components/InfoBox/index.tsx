import {
  Corridor,
  IPropsInfoBox,
  RegionName,
  TransitTypes,
} from "../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import CorridorInfo from "./CorridorInfo";
import TCInfo from "./TCInfo";
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

      <div className={`h-100 overflow-scroll`}>
        {navigation?.showPage === "About" ? (
          <div className="p-3">Created by Eric James</div>
        ) : navigation?.region === RegionName.tc ? (
          <TCInfo
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            corridors={corridors}
            navigation={navigation}
          />
        ) : (
          <></>
        )}
      </div>
    </Wrapper>
  );
};

export default InfoBox;

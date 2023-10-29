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
import EastMetroInfo from "./EastMetroInfo";
import NorthMetroInfo from "./NorthMetroInfo";
import SouthMetroInfo from "./SouthMetroInfo";
import TCInfo from "./TCInfo";
import WestMetroInfo from "./WestMetroInfo";
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
  navigation = null,
}) => {
  // const [appState, setAppState] = useState<AppState>(null);

  return (
    <Wrapper className="bg-sidebar">
      <CorridorInfo
        selectedCorridor={selectedCorridor}
        setSelectedCorridor={setSelectedCorridor}
      />

      <div className={`h-100 overflow-scroll`}>
        {navigation?.region === RegionName.tc ? (
          <TCInfo
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            corridors={corridors}
            navigation={navigation}
          />
        ) : navigation?.region === RegionName.west ? (
          <WestMetroInfo
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            corridors={corridors}
            navigation={navigation}
          />
        ) : navigation?.region === RegionName.east ? (
          <EastMetroInfo
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            corridors={corridors}
            navigation={navigation}
          />
        ) : navigation?.region === RegionName.north ? (
          <NorthMetroInfo
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            corridors={corridors}
            navigation={navigation}
          />
        ) : navigation?.region === RegionName.south ? (
          <SouthMetroInfo
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

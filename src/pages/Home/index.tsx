import {
  AppFeatureCollection,
  Corridor,
  NavigationStateProp,
  TransitTypes,
} from "../../constants/types";
import {
  NAVIGATION,
  getCorridors,
  getDataFeatureCollection,
} from "../../constants";
import React, { FC, useEffect, useState } from "react";

import Header from "../../components/Header";
import InfoBox from "../../components/InfoBox";
import MapViewer from "../../components/MapViewer";
import styled from "styled-components";

const StyledWrapper = styled.div`
  flex: 0 1 100%;
`;
const StyledHeader = styled.div`
  flex: 0 0 50px;
`;

const Home: FC = () => {
  const initialNav = NAVIGATION[1];
  const [geoJSON, setGeoJSON] = useState<AppFeatureCollection | null>(null);
  const [corridors, setCorridors] = useState<Array<Corridor> | null>(null);
  const [navigation, setNavigation] = useState<NavigationStateProp>(initialNav);
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor | null>(
    null
  );

  const [selectedType, setSelectedType] = useState<TransitTypes | null>(
    initialNav.types ? initialNav.types[0] : null
  );

  useEffect(() => {
    console.log("USEEFFECT");
    const featureCollection = getDataFeatureCollection();
    const corridors = getCorridors();
    setGeoJSON(featureCollection);
    setCorridors(corridors);
  }, []);

  return (
    <div className="vh-100 d-flex flex-column">
      <StyledHeader>
        <Header
          setNavigation={setNavigation}
          navigation={navigation}
        />
      </StyledHeader>
      <StyledWrapper className="row g-0 overflow-hidden">
        <div className="d-none d-md-block col-md-3 h-100">
          <InfoBox
            navigation={navigation}
            corridors={corridors}
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>

        <div className="col-12 col-md-9">
          <MapViewer
            navigation={navigation}
            corridors={corridors}
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            geoJSON={geoJSON}
            setGeoJSON={setGeoJSON}
          />
        </div>
      </StyledWrapper>
    </div>
  );
};

export default Home;

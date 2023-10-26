import {
  AppFeatureCollection,
  AppGeometryFeature,
  YearRange,
} from "../../constants/types";
import { EDITOR_MODE, getDataFeatureCollection } from "../../constants";
import { FC, useEffect, useState } from "react";
import { SOURCE_ID, SOURCE_LAYER_NAME } from "../../constants/mapbox";

import { ErrorBoundary } from "react-error-boundary";
import { IPropsMapViewer } from "../../constants/types";
import MapEditor from "./MapEditor";
import MapSource from "./MapSource";
import MapViewport from "./MapViewport";
import RouteLayer from "./RouteLayer";
import SystemLayer from "./SystemLayer";
import YearToggler from "./YearToggler";
import mapboxgl from "mapbox-gl";

const MapViewer: FC<IPropsMapViewer> = ({
  corridors,
  navigation,
  selectedCorridor,
  selectedType,
  setSelectedCorridor,
  setSelectedType,
}) => {
  // const [appState, setAppState] = useState<AppState>(null);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [yearRange, setYearRange] = useState<YearRange>([null, null]);
  const [geoJSON, setGeoJSON] = useState<AppFeatureCollection | null>(null);

  useEffect(() => {
    const FEATURES = getDataFeatureCollection();
    if (FEATURES) {
      setGeoJSON(FEATURES);
    }
  }, []);

  const onLineFeatureClick = (corridorName: string) => {
    if (corridors) {
      corridors.some((corridor) => {
        if (corridorName === corridor.DATA_CORRIDOR) {
          setSelectedCorridor(corridor);
          return true;
        }
        return false;
      });
    }
  };

  return (
    <div className="h-100 position-relative">
      <ErrorBoundary fallback={<>Map crashed! Refresh page.</>}>
        <MapViewport
          map={map}
          setMap={setMap}
          navigation={navigation}
          selectedCorridor={selectedCorridor}
        />
        <YearToggler
          selectedCorridor={selectedCorridor}
          yearRange={yearRange}
          setYearRange={setYearRange}
        />

        {/* <MapSource map={map} type="vector" id={SOURCE_ID} url={SOURCE_URL} /> */}
        <MapSource
          map={map}
          type="geojson"
          id={SOURCE_ID}
          data={geoJSON}
        />

        <SystemLayer
          map={map}
          layerName={"system-layer"}
          sourceLayerName={SOURCE_LAYER_NAME}
          sourceId={SOURCE_ID}
          yearRange={yearRange}
          selectedCorridor={selectedCorridor}
          selectedType={selectedType}
        />

        <RouteLayer
          map={map}
          selectedCorridor={selectedCorridor}
          layerName={`route-layer`}
          sourceId={SOURCE_ID}
          sourceLayerName={SOURCE_LAYER_NAME}
          yearRange={yearRange}
          onLineFeatureClick={onLineFeatureClick}
          selectedType={selectedType}
        />

        {EDITOR_MODE && (
          <MapEditor
            map={map}
            geoJSON={geoJSON}
            setGeoJSON={setGeoJSON}
            selectedCorridor={selectedCorridor}
          />
        )}

        {/* <RouteInfoBox corridor={selectedCorridor} resetMap={resetMap} /> */}
      </ErrorBoundary>
    </div>
  );
};

export default MapViewer;

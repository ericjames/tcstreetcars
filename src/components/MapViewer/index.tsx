import { ADMIN_MODE, getDataFeatureCollection } from "../../constants";
import { FC, useEffect, useState } from "react";
import { FeatureCorridorNames, IPropsMapViewer } from "../../constants/types";
import { SOURCE_ID, SOURCE_LAYER_NAME } from "../../constants/mapbox";

import DataTable from "../Admin/DataTable";
import { ErrorBoundary } from "react-error-boundary";
import MapEditor from "../Admin/MapEditor";
import MapLegend from "./MapLegend";
import MapSource from "./MapSource";
import MapViewport from "./MapViewport";
import RouteInfoBox from "./RouteInfoBox";
import RouteLayer from "./RouteLayer";
import StopsLayer from "./StopsLayer";
import SystemLayer from "./SystemLayer";
import mapboxgl from "mapbox-gl";

const MapViewer: FC<IPropsMapViewer> = ({
  geoJSON,
  setGeoJSON,
  corridors,
  navigation,
  selectedCorridor,
  selectedType,
  setSelectedCorridor,
  setSelectedType,
  yearRange,
}) => {
  // const [appState, setAppState] = useState<AppState>(null);
  const [map, setMap] = useState<mapboxgl.Map>();

  const onCorridorSelect = (corridorName: FeatureCorridorNames) => {
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
        <MapLegend />

        <MapViewport
          map={map}
          setMap={setMap}
          navigation={navigation}
          selectedCorridor={selectedCorridor}
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

        <StopsLayer map={map} />

        <RouteLayer
          map={map}
          corridors={corridors}
          selectedCorridor={selectedCorridor}
          layerName={`route-layer`}
          sourceId={SOURCE_ID}
          sourceLayerName={SOURCE_LAYER_NAME}
          yearRange={yearRange}
          onCorridorSelect={onCorridorSelect}
          selectedType={selectedType}
        />

        {ADMIN_MODE && (
          <MapEditor
            map={map}
            geoJSON={geoJSON}
            setGeoJSON={setGeoJSON}
            selectedCorridor={selectedCorridor}
          />
        )}

        {ADMIN_MODE && (
          <DataTable
            geoJSON={geoJSON}
            setGeoJSON={setGeoJSON}
          />
        )}

        <RouteInfoBox
          corridor={selectedCorridor}
          exitMethod={() => setSelectedCorridor(null)}
        />
      </ErrorBoundary>
    </div>
  );
};

export default MapViewer;

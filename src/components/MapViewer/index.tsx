import { Corridor, RegionName, YearRange } from "../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  SOURCE_ID,
  SOURCE_LAYER_NAME,
  SOURCE_URL,
  TC_CENTER,
  TC_ZOOM,
} from "../../constants/mapbox";

import { EDITOR_MODE } from "../../constants";
import { ErrorBoundary } from "react-error-boundary";
import { IPropsMapViewer } from "../../constants/types";
import MapEditor from "./MapEditor";
import MapSource from "./MapSource";
import MapViewport from "./MapViewport";
import RouteInfoBox from "./RouteInfoBox";
import RouteLayer from "./RouteLayer";
import SystemLayer from "./SystemLayer";
import YearToggler from "./YearToggler";
import featureCollectionGeoJson from "../../constants/DATA_FEATURE_COLLECTION.json";
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
  const [feature, setFeature] = useState<object | null>(null);
  const [geoJSON, setGeoJSON] = useState<object>(featureCollectionGeoJson);
  const [mapboxDraw, setMapboxDraw] = useState<any | null>(null);

  // Router toggles viewable stuff not data

  const onLineHover = () => {
    toggleLineSelected();
  };

  const toggleLineSelected = () => {};

  const onRouteLayerClick = (route: Corridor | null) => {
    setSelectedCorridor(route);
  };

  // useEffect(() => {
  //   if (selectedCorridor === null) {
  //     resetMap();
  //   }
  // }, [selectedCorridor]);

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

        {corridors &&
          corridors.map((corridor, i) => (
            <RouteLayer
              key={i}
              map={map}
              setFeature={setFeature}
              corridor={corridor}
              isSelected={
                selectedCorridor ? selectedCorridor?.id === corridor.id : null
              }
              layerName={`route-layer-${corridor.id}`}
              sourceId={SOURCE_ID}
              sourceLayerName={SOURCE_LAYER_NAME}
              onLineHover={onLineHover}
              onRouteLayerClick={onRouteLayerClick}
              yearRange={yearRange}
            />
          ))}

        {EDITOR_MODE && (
          <MapEditor
            map={map}
            feature={feature}
            setFeature={setFeature}
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

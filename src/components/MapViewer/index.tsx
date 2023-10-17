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
  STARTUP_ZOOM,
  TC_CENTER,
} from "../../constants";

import { Corridor } from "../../constants/types";
import { ErrorBoundary } from "react-error-boundary";
import MapSource from "./MapSource";
import MapViewport from "./MapViewport";
import RouteInfoBox from "./RouteInfoBox";
import RouteLayer from "./RouteLayer";
import SystemLayer from "./SystemLayer";

type IProps = {
  corridors: Array<Corridor>;
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
};

const MapViewer: FC<IProps> = ({
  corridors,
  selectedCorridor,
  setSelectedCorridor,
}) => {
  // const [appState, setAppState] = useState<AppState>(null);
  const [map, setMap] = useState<mapboxgl.Map>();

  // Router toggles viewable stuff not data

  const resetMap = () => {
    if (map) {
      map.flyTo({ zoom: STARTUP_ZOOM, center: TC_CENTER });
    }
    setSelectedCorridor(null);
  };

  const onLineHover = () => {
    toggleLineSelected();
  };

  const toggleLineSelected = () => {};

  const onRouteLayerClick = (route: Corridor | null) => {
    setSelectedCorridor(route);
  };

  return (
    <div className="h-100 position-relative">
      <ErrorBoundary fallback={<>Map couldn't load</>}>
        <MapViewport setMap={setMap} />
        <MapSource map={map} id={SOURCE_ID} url={SOURCE_URL} />
        <SystemLayer
          map={map}
          layerName={"system-layer"}
          sourceLayerName={SOURCE_LAYER_NAME}
          sourceId={SOURCE_ID}
        />

        {corridors.map((corridor, i) => (
          <RouteLayer
            key={i}
            map={map}
            corridor={corridor}
            isSelected={
              selectedCorridor ? selectedCorridor?.id === corridor.id : null
            }
            layerName={`route-layer-${corridor.id}`}
            sourceId={SOURCE_ID}
            sourceLayerName={SOURCE_LAYER_NAME}
            onLineHover={onLineHover}
            onRouteLayerClick={onRouteLayerClick}
          />
        ))}

        <RouteInfoBox corridor={selectedCorridor} resetMap={resetMap} />
      </ErrorBoundary>
    </div>
  );
};

export default MapViewer;

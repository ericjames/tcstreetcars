import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ALL_ROUTES } from "../../constants/routes";
import { ErrorBoundary } from "react-error-boundary";
import { IRouteProp } from "../../constants/props";
import Line from "./Line";
import MapViewport from "../common/MapboxLibrary/MapViewport";
import PhotoGallery from "../PhotoGallery";
import { Route } from "../../constants/types";
import RouteDetails from "./RouteDetails";

type IProps = {
  route: Route | null;
  setActiveRoute: Dispatch<SetStateAction<Route | null>>;
};

const MapViewer: FC<IProps> = ({ route, setActiveRoute }) => {
  // const [appState, setAppState] = useState<AppState>(null);
  const [map, setMap] = useState<mapboxgl.Map>();

  // Router toggles viewable stuff not data

  const onLineHover = () => {
    toggleLineSelected();
  };

  const toggleLineSelected = () => {};

  const onLineClick = (route: Route | null) => {
    setActiveRoute(route);
  };

  return (
    <div className="h-100 position-relative">
      <ErrorBoundary fallback={<>Map couldn't load</>}>
        <MapViewport setMap={setMap} />

        <RouteDetails route={route} />

        {ALL_ROUTES.map((route, i) => (
          <Line
            key={i}
            map={map}
            route={route}
            onLineHover={onLineHover}
            onLineClick={onLineClick}
          />
        ))}

        <PhotoGallery photos={route?.photos} />
      </ErrorBoundary>
    </div>
  );
};

export default MapViewer;

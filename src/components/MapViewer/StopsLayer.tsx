import {
  Corridor,
  FeatureCorridorNames,
  IPropsRouteLayer,
  InitialFilterType,
  MapboxFilterArray,
  TransitTypes,
  YearRange,
} from "../../constants/types";
import { FC, useEffect, useRef } from "react";
import {
  LABEL_SIZE_STOPS,
  ROUTE_FILTER_INDEX,
  getFeatureCorridorNames,
  getLineColorGradient,
} from "../../constants/mapbox";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";

import { COLORS } from "../../constants/colors";
import MapPopup from "./MapPopup";
import { YEAR_FILTER_HOOK } from "./maphooks";

const StopsLayer: FC<{ map: mapboxgl.Map | undefined }> = ({ map }) => {
  useEffect(() => {
    return () => {
      if (map) {
      }
    };
  }, [map]);
  return null;
};

export default StopsLayer;

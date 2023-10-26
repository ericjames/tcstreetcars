import {
  AppGeometryFeature,
  Corridor,
  TransitTypes,
  YearRange,
} from "../../constants/types";
import {
  HTML_POPUP,
  LINE_WIDTH_STOPS,
  RECEDED_LINE_OPACITY,
} from "../../constants/mapbox";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import mapboxgl, { MapboxGeoJSONFeature } from "mapbox-gl";

import { COLORS } from "../../constants/colors";
import { YEAR_FILTER_HOOK } from "./helpers";

type IProps = {
  layerName: string;
  sourceId: string;
  sourceLayerName: string;
  map: mapboxgl.Map | undefined;
  yearRange: YearRange;
  selectedCorridor: Corridor | null;
  selectedType: TransitTypes | null;
  onLineFeatureClick?: (corridorName: string) => void;
};

const SystemLayer: FC<IProps> = ({
  layerName,
  sourceId,
  sourceLayerName,
  map,
  yearRange,
  selectedCorridor,
  onLineFeatureClick,
  selectedType,
}) => {
  const systemLayerRef = useRef<{ popup?: mapboxgl.Popup | null }>({
    popup: null,
  });

  const highlightLayer = "highlight-layer";
  const highlightOutlineLayer = "highlight-outline-layer";
  const initialFilter = ["==", "TYPE", selectedType];

  useEffect(() => {
    addLayer();
    return () => {
      if (map) {
        map.removeLayer(layerName);
      }
    };
  }, [map]);

  const addLayer = () => {
    if (map) {
      map.on("style.load", () => {
        map.addLayer({
          id: layerName,
          source: sourceId,
          // "source-layer": sourceLayerName,
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": [
              "case",
              ["==", ["get", "TYPE"], "Streetcar"],
              COLORS.map_dark_red,
              ["==", ["get", "TYPE"], "Bus"],
              COLORS.bus,
              ["==", ["get", "TYPE"], "Ferry"],
              COLORS.ferry,
              ["==", ["get", "TYPE"], "Steam Power"],
              COLORS.steampower,
              ["==", ["get", "TYPE"], "Horsecar"],
              COLORS.horsecar,
              COLORS.black1,
            ],
            "line-width": LINE_WIDTH_STOPS,
          },
          filter: initialFilter,
        });
      });
    }
  };

  useEffect(() => {
    if (map) {
      if (selectedCorridor) {
        map.setPaintProperty(layerName, "line-opacity", RECEDED_LINE_OPACITY);
      } else {
        map.setPaintProperty(layerName, "line-opacity", 1);
      }
    }
  }, [selectedCorridor]);

  YEAR_FILTER_HOOK({
    map,
    yearRange,
    layerNames: [layerName],
    initialFilter,
  });

  return null;
};

export default SystemLayer;

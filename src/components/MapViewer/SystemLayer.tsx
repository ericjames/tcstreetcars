import {
  Corridor,
  FeatureCorridorNames,
  IPropsSystemLayer,
  InitialFilterType,
  TransitTypes,
  YearRange,
} from "../../constants/types";
import {
  LINE_WIDTH_STOPS,
  RECEDED_LINE_OPACITY,
  getLineColorGradient,
} from "../../constants/mapbox";
import React, { FC, useEffect } from "react";
import { YEAR_END_GRADIENT, YEAR_RANGES } from "../../constants";
import mapboxgl, { Expression } from "mapbox-gl";

import { COLORS } from "../../constants/colors";
import { Gradient } from "typescript-color-gradient";
import { YEAR_FILTER_HOOK } from "./maphooks";

const SystemLayer: FC<IPropsSystemLayer> = ({
  layerName,
  sourceId,
  sourceLayerName,
  map,
  yearRange,
  selectedCorridor,
  onCorridorSelect,
  selectedType,
}) => {
  const initialFilter: InitialFilterType = [
    "all",
    ["all", [">=", "YR_START1", 0]],
    [
      "any",
      ["==", "TYPE", "Streetcar"],
      ["==", "TYPE", "Ferry"],
      // ["==", "TYPE", "Train"],
    ],
  ];

  useEffect(() => {
    addLayer();
    return () => {
      if (map) {
        map.on("remove", () => {
          map.removeLayer(layerName);
        });
      }
    };
  }, [map]);

  const addLayer = () => {
    if (map) {
      map.on("style.load", () => {
        const lineColors = getLineColorGradient();
        // console.log(lineColors);
        map.addLayer({
          id: layerName,
          source: sourceId,
          // "source-layer": sourceLayerName,
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
            "line-sort-key": ["get", "YR_END1"],
          },
          paint: {
            "line-color": lineColors,
            // "line-color": [
            //   "case",
            //   ["==", ["get", "TYPE"], "Streetcar"],
            //   COLORS.streetcar,
            //   ["==", ["get", "TYPE"], "Bus"],
            //   COLORS.bus,
            //   ["==", ["get", "TYPE"], "Ferry"],
            //   COLORS.ferry,
            //   ["==", ["get", "TYPE"], "Train"],
            //   COLORS.train,
            //   ["==", ["get", "TYPE"], "Steam Power"],
            //   COLORS.steampower,
            //   ["==", ["get", "TYPE"], "Horsecar"],
            //   COLORS.horsecar,
            //   COLORS.black1,
            // ],
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
  });

  return null;
};

export default SystemLayer;

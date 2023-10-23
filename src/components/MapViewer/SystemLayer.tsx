import { Corridor, TransitTypes, YearRange } from "../../constants/types";
import {
  HTML_POPUP,
  LINE_WIDTH_STOPS,
  RECEDED_LINE_OPACITY,
} from "../../constants/mapbox";
import React, { FC, useEffect, useRef, useState } from "react";

import { COLORS } from "../../constants/colors";
import { YEAR_FILTER_HOOK } from "./helpers";
import mapboxgl from "mapbox-gl";

type IProps = {
  layerName: string;
  sourceId: string;
  sourceLayerName: string;
  map: mapboxgl.Map | undefined;
  yearRange: YearRange;
  selectedCorridor: Corridor | null;
  selectedType: TransitTypes | null;
};

const SystemLayer: FC<IProps> = ({
  layerName,
  sourceId,
  sourceLayerName,
  map,
  yearRange,
  selectedCorridor,
  selectedType,
}) => {
  const initialFilter = null;

  useEffect(() => {
    setupLayer();

    return () => {
      if (map) {
        map.removeLayer(layerName);
      }
    };
  }, [map]);

  const setupLayer = () => {
    if (map) {
      map.on("load", () => {
        if (map.getLayer(layerName)) {
          return null;
        }

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
          // filter: ["==", "TYPE", selectedType],
        });
      });

      // let popup: mapboxgl.Popup;

      map.on("click", layerName, (e) => {
        // if (e) {
        //   new mapboxgl.Popup()
        //     .setLngLat(e.lngLat)
        //     .setHTML(HTML_POPUP(e))
        //     .addTo(map);
        // }
      });

      // Change the cursor to a pointer when
      // the mouse is over the states layer.

      map.on("mouseenter", layerName, (e) => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.on("mouseleave", layerName, () => {
        map.getCanvas().style.cursor = "";
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

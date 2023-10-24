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
  const systemLayerRef = useRef<{ popup?: mapboxgl.Popup | null }>({
    popup: null,
  });

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
    }
  };

  useEffect(() => {
    if (map) {
      map.on("click", layerName, (e) => {});
      map.on("mouseenter", layerName, onMouseEnter);
      map.on("mouseleave", layerName, onMouseLeave);
      systemLayerRef.current.popup = new mapboxgl.Popup({ closeButton: false });
      return () => {
        // Tear down
        map.off("mouseenter", layerName, onMouseEnter);
        map.off("mouseleave", layerName, onMouseLeave);
        systemLayerRef.current.popup?.remove();
      };
    }
  }, [map]);

  const onMouseEnter = (e: any) => {
    if (map) {
      if (e && systemLayerRef.current.popup) {
        systemLayerRef.current.popup
          .setLngLat(e.lngLat)
          .setHTML(HTML_POPUP(e))
          .addTo(map);
      }
      map.getCanvas().style.cursor = "pointer";
    }
  };

  const onMouseLeave = (e: any) => {
    if (map) {
      map.getCanvas().style.cursor = "";
      if (systemLayerRef.current.popup) {
        systemLayerRef.current.popup?.remove();
      }
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

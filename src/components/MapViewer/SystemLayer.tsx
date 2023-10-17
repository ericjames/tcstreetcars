import { DEFAULT_LINE_WIDTH, HTML_POPUP } from "../../constants";
import React, { FC, useEffect, useRef, useState } from "react";

import { COLORS } from "../../constants/colors";
import mapboxgl from "mapbox-gl";

type IProps = {
  layerName: string;
  sourceId: string;
  sourceLayerName: string;
  map: mapboxgl.Map | undefined;
};

const SystemLayer: FC<IProps> = ({
  layerName,
  sourceId,
  sourceLayerName,
  map,
}) => {
  useEffect(() => {
    if (map) {
      map.on("load", () => {
        if (!map.getLayer(layerName)) {
          map.addLayer({
            id: layerName,
            source: sourceId,
            "source-layer": sourceLayerName,
            type: "line",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": COLORS.tcrt_olive,
              "line-width": 1,
            },
            filter: ["==", "TYPE", "Streetcar"],
          });

          let popup: mapboxgl.Popup;

          map.on("click", layerName, (e) => {
            if (e) {
              new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(HTML_POPUP(e))
                .addTo(map);
            }
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
      });
    }
  }, [map]);

  return null;
};

export default SystemLayer;

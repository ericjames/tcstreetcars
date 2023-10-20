import { Corridor, YearRange } from "../../constants/types";
import {
  DEFAULT_LINE_WIDTH,
  HTML_POPUP,
  LINE_WIDTH_STOPS,
  RECEDED_LINE_OPACITY,
  SELECTED_LINE_WIDTH,
} from "../../constants/mapbox";
import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import mapboxgl, {
  LngLatBounds,
  LngLatBoundsLike,
  MapboxGeoJSONFeature,
} from "mapbox-gl";

import { COLORS } from "../../constants/colors";
import { IRouteProp } from "../../constants/types";
import { YEAR_FILTER_HOOK } from "./helpers";

interface IProps extends IRouteProp {
  map: mapboxgl.Map | undefined;
  corridor: Corridor | null;
  isSelected: boolean | null;
  layerName: string;
  sourceId: string;
  sourceLayerName: string;
  onLineHover: () => void;
  onRouteLayerClick: (route: Corridor | null) => void;
  yearRange: YearRange;
}

interface Refs {
  popup?: mapboxgl.Popup | null;
}

const RouteLayer: FC<IProps> = ({
  layerName,
  sourceId,
  sourceLayerName,
  map,
  corridor,
  isSelected,
  onLineHover,
  onRouteLayerClick,
  yearRange,
}) => {
  const symbolLayerName = layerName + "-symbols";

  const [bounds, setBounds] =
    useState<SetStateAction<LngLatBounds | LngLatBoundsLike | null>>(null);

  const refLayer = useRef<Refs>({ popup: null });

  const initialFilter: Array<Array<string> | string> = [
    "all",
    ["==", "CORRIDOR", corridor?.DATA_CORRIDOR || ""],
    ["==", "TYPE", corridor?.DATA_TYPE || ""],
  ];

  useEffect(() => {
    setupLayer();

    return () => {
      if (map) {
        map.on("load", () => {
          map.removeLayer(layerName);
          map.removeLayer(symbolLayerName);
        });
      }
    };
  }, [map]);

  const setupLayer = () => {
    if (map) {
      map.on("load", () => {
        map.addLayer({
          id: layerName,
          source: sourceId,
          "source-layer": sourceLayerName,
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
            "line-sort-key": corridor?.id,
          },
          paint: {
            "line-color": COLORS.tcrt_map_red,
            "line-width": LINE_WIDTH_STOPS,
            // "line-translate": [corridor?.id ? corridor?.id * 0.25 : 0, 0],
            "line-opacity": 1,
          },
          filter: initialFilter,
        });

        map.addLayer({
          id: symbolLayerName,
          source: sourceId,
          "source-layer": sourceLayerName,
          type: "symbol",
          layout: {
            "text-field": corridor?.routeName,
            "symbol-placement": "line",
            "text-size": 14,
            // "text-size": ['match', ['get', 'id'], 0, 1, 0.8]
            "text-font": ["DIN Pro Bold"],
            "text-anchor": "top",
            "text-padding": 10,
          },
          paint: {
            "text-color": COLORS.tcrt_map_red,
            "text-halo-color": "#fff",
            "text-halo-width": 3,
          },
          filter: initialFilter,
        });

        map.once("idle", () => {
          if (!bounds) {
            const features = map.querySourceFeatures(sourceId, {
              sourceLayer: sourceLayerName,
              filter: initialFilter,
            });
            if (features && features.length) {
              // const allCoordinates:any = [];
              let newBounds = new mapboxgl.LngLatBounds();

              features.forEach((feature: MapboxGeoJSONFeature) => {
                if (feature.geometry.type === "LineString") {
                  feature.geometry.coordinates.forEach((coord) => {
                    newBounds.extend([coord[0], coord[1]]);
                  });
                }
              });
              setBounds(newBounds);
            } else {
              console.log("No features", features);
            }
          }
        });

        map.on("click", layerName, (e) => {
          if (refLayer.current.popup) {
            refLayer.current.popup.remove();
          }
          if (e) {
            onRouteLayerClick(corridor);
          }
        });

        refLayer.current.popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
      });
    }
  };

  useEffect(() => {
    if (map) {
      // Any listeners that need to continually use state values must be setup below

      const onMouseEnter = (e: { lngLat: mapboxgl.LngLatLike }) => {
        map.getCanvas().style.cursor = "pointer";
        map.setPaintProperty(layerName, "line-width", SELECTED_LINE_WIDTH);
        if (e && refLayer.current.popup) {
          refLayer.current.popup
            .setLngLat(e.lngLat)
            .trackPointer()
            .setHTML(HTML_POPUP(e))
            .addTo(map);
        }
      };

      const onMouseLeave = () => {
        if (refLayer.current.popup) {
          refLayer.current.popup.remove();
        }
        if (map) {
          map.getCanvas().style.cursor = "";
          map.setPaintProperty(
            layerName,
            "line-width",
            isSelected ? SELECTED_LINE_WIDTH : DEFAULT_LINE_WIDTH
          );
        }
      };
      map.on("mouseleave", layerName, onMouseLeave);
      map.on("mouseleave", symbolLayerName, onMouseLeave);
      map.on("mouseenter", layerName, onMouseEnter);
      map.on("mouseenter", symbolLayerName, onMouseEnter);
      return () => {
        map.off("mouseleave", layerName, onMouseLeave);
        map.off("mouseenter", layerName, onMouseEnter);
        map.off("mouseleave", symbolLayerName, onMouseLeave);
        map.off("mouseenter", symbolLayerName, onMouseEnter);
        if (refLayer.current.popup) {
          refLayer.current.popup.remove();
        }
      };
    }
  }, [map, isSelected]);

  YEAR_FILTER_HOOK({
    map,
    yearRange,
    layerName,
    initialFilter,
  });

  useEffect(() => {
    if (map && map.getLayer(layerName)) {
      const styleSelectedLayer = () => {
        // Highlight selected layer
        map.setPaintProperty(layerName, "line-opacity", 1);
        map.setPaintProperty(layerName, "line-width", SELECTED_LINE_WIDTH);
        map.setLayoutProperty(layerName, "line-sort-key", 1000);
        if (bounds) {
          map.fitBounds(bounds as LngLatBoundsLike, {
            padding: 200,
            offset: [0, -50],
          });
        }
      };

      const styleOtherLayers = () => {
        map.setPaintProperty(layerName, "line-opacity", RECEDED_LINE_OPACITY);
        map.setPaintProperty(layerName, "line-width", DEFAULT_LINE_WIDTH);
        map.setLayoutProperty(layerName, "line-sort-key", corridor?.id);
      };

      const resetMapStyles = () => {
        map.setPaintProperty(layerName, "line-opacity", 1);
        map.setPaintProperty(layerName, "line-width", DEFAULT_LINE_WIDTH);
        map.setLayoutProperty(layerName, "line-sort-key", corridor?.id);
      };

      if (isSelected !== null) {
        if (isSelected) {
          styleSelectedLayer();
        } else {
          styleOtherLayers();
        }
      } else {
        resetMapStyles();
      }
    }
  });

  return null;
};

export default RouteLayer;

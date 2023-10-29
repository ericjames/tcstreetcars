import { Corridor, TransitTypes, YearRange } from "../../constants/types";
import {
  DEFAULT_LINE_WIDTH,
  HTML_POPUP,
  LABEL_SIZE_STOPS,
  LINE_WIDTH_STOPS,
  RECEDED_LINE_OPACITY,
  SELECTED_LINE_WIDTH,
} from "../../constants/mapbox";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import mapboxgl, {
  LngLatBounds,
  LngLatBoundsLike,
  MapboxGeoJSONFeature,
} from "mapbox-gl";

import { COLORS } from "../../constants/colors";
import { YEAR_FILTER_HOOK } from "./helpers";

interface IProps {
  map: mapboxgl.Map | undefined;
  selectedCorridor: Corridor | null;
  corridors?: Array<Corridor> | null;
  layerName: string;
  sourceId: string;
  sourceLayerName?: string;
  yearRange: YearRange;
  onLineFeatureClick: (corridorName: string) => void;
  selectedType?: TransitTypes | null;
}

interface Refs {
  popup?: mapboxgl.Popup | null;
}

const RouteLayer: FC<IProps> = ({
  layerName,
  sourceId,
  corridors = null,
  sourceLayerName,
  map,
  selectedCorridor,
  yearRange,
  selectedType,
  onLineFeatureClick,
}) => {
  const routeLayerRef = useRef<{ popup?: mapboxgl.Popup | null }>({
    popup: null,
  });

  const selectorLayer = layerName + "-selector";
  const highlightLayer = "highlight-layer";
  const highlightOutlineLayer = "highlight-outline-layer";
  const symbolLayerName = layerName + "-symbols";
  const initialFilter = ["==", "TYPE", selectedType || ""];

  const [bounds, setBounds] =
    useState<SetStateAction<LngLatBounds | LngLatBoundsLike | null>>(null);

  useEffect(() => {
    setupLayer();

    return () => {
      if (map) {
        map.removeLayer(layerName);
        map.removeLayer(highlightOutlineLayer);
        map.removeLayer(highlightLayer);
        map.removeLayer(symbolLayerName);
      }
    };
  }, [map]);

  const setupLayer = () => {
    if (map) {
      map.on("style.load", () => {
        map.addLayer({
          id: highlightOutlineLayer,
          source: sourceId,
          // "source-layer": sourceLayerName,
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#fff",
            "line-width": 14,
            "line-opacity": 0,
          },
        });
        map.addLayer({
          id: highlightLayer,
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
              COLORS.map_bright_red,
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
            "line-width": 8,
            "line-opacity": 0,
          },
        });

        map.addLayer({
          id: symbolLayerName,
          source: sourceId,
          // "source-layer": sourceLayerName,
          type: "symbol",
          layout: {
            "text-field": "",
            "symbol-placement": "line",
            "text-size": LABEL_SIZE_STOPS,
            // "text-size": ['match', ['get', 'id'], 0, 1, 0.8]
            "text-font": ["DIN Pro Bold"],
            "text-anchor": "bottom",
            "text-transform": "uppercase",
          },
          paint: {
            "text-color": COLORS.map_dark_red,
            "text-halo-color": COLORS.map_bg_beige,
            "text-halo-width": 2,
            "text-opacity": 0,
          },
        });

        map.addLayer({
          id: selectorLayer,
          source: sourceId,
          // "source-layer": sourceLayerName,
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-width": 14,
            "line-opacity": 0,
          },
          filter: initialFilter,
        });

        routeLayerRef.current.popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
      });
    }
  };

  const onMouseEnter = (e: any) => {
    if (selectedCorridor === null) {
      if (
        e.features[0] &&
        e.features[0].properties.CORRIDOR &&
        e.features[0].properties.TYPE === selectedType
      ) {
        // console.log("mouse enter", e.features[0].properties.CORRIDOR);
        setHighlightedCorridor(e.features[0].properties.CORRIDOR);
      }
    }
    if (map) {
      map.getCanvas().style.cursor = "pointer";
      if (e && routeLayerRef.current.popup) {
        routeLayerRef.current.popup
          .setLngLat(e.lngLat)
          .setHTML(HTML_POPUP(e))
          .addTo(map);
      }
    }
  };

  const onMouseLeave = (e: any) => {
    if (selectedCorridor === null) {
      deHighlightCorridors();
    }
    if (map) {
      map.getCanvas().style.cursor = "";
      if (routeLayerRef.current.popup) {
        routeLayerRef.current.popup?.remove();
      }
    }
  };

  const setHighlightedCorridor = (corridorName: string) => {
    if (map) {
      // Highlight shared routes
      corridors?.some((corridor) => {
        if (corridor.DATA_CORRIDOR === corridorName) {
          const filter = [
            "any",
            ["==", "CORRIDOR", corridor.DATA_CORRIDOR || ""],
            ["==", "CORRIDOR", corridor.DATA_CORRIDOR_SHARED || ""],
            // ["==", "CORRIDOR", corridor.DATA_CORRIDOR_PAIRED || ""],
          ];
          map.setFilter(highlightLayer, filter);
          map.setFilter(highlightOutlineLayer, filter);
          return true;
        } else {
          return false;
        }
      });

      map.setPaintProperty(highlightLayer, "line-opacity", 1);
      map.setPaintProperty(highlightOutlineLayer, "line-opacity", 1);

      // map.setLayoutProperty(highlightLayer, "visibility", "visible");
      // map.setLayoutProperty(highlightOutlineLayer, "visibility", "visible");
      // map.setLayoutProperty(symbolLayerName, "visibility", "visible");
    }
  };

  const deHighlightCorridors = () => {
    if (map) {
      map.setPaintProperty(highlightLayer, "line-opacity", 0);
      map.setPaintProperty(highlightOutlineLayer, "line-opacity", 0);
      // map.setLayoutProperty(highlightLayer, "visibility", "none");
      // map.setLayoutProperty(highlightOutlineLayer, "visibility", "none");
    }
  };

  const styleSelectedCorridor = () => {
    if (map) {
      const filter = [
        "any",
        ["==", "CORRIDOR", selectedCorridor?.DATA_CORRIDOR || ""],
        ["==", "CORRIDOR", selectedCorridor?.DATA_CORRIDOR_SHARED || ""],
        ["==", "CORRIDOR", selectedCorridor?.DATA_CORRIDOR_PAIRED || ""],
      ];

      map.setFilter(highlightLayer, filter);
      map.setFilter(highlightOutlineLayer, filter);

      // Highlight selected layer
      // map.setLayoutProperty(highlightLayer, "visibility", "visible");
      // map.setLayoutProperty(highlightOutlineLayer, "visibility", "visible");
      // map.setLayoutProperty(symbolLayerName, "visibility", "visible");
      map.setPaintProperty(
        symbolLayerName,
        "text-color",
        COLORS.map_bright_red
      );
      map.setPaintProperty(symbolLayerName, "text-opacity", 1);
      map.setPaintProperty(highlightLayer, "line-opacity", 1);
      map.setPaintProperty(highlightOutlineLayer, "line-opacity", 1);
    }
  };

  const styleInactiveLayer = () => {
    if (map) {
      map.setPaintProperty(symbolLayerName, "text-color", COLORS.map_dark_red);
      map.setPaintProperty(symbolLayerName, "text-opacity", 0);
      map.setPaintProperty(highlightLayer, "line-opacity", 0);
      map.setPaintProperty(highlightOutlineLayer, "line-opacity", 0);
      // map.setLayoutProperty(layerName, "visibility", "none");
      // map.setLayoutProperty(selectorLayer, "visibility", "none");
      // map.setLayoutProperty(symbolLayerName, "visibility", "none");
      // map.setPaintProperty(selectorLayer, "line-opacity", 0);
      // map.setLayoutProperty(selectorLayer, "line-sort-key", corridor?.id);
    }
  };

  const onClickLayer = (e: any) => {
    if (map) {
      if (selectedCorridor === null) {
        const features = map.queryRenderedFeatures(e.point);
        const corridorName = features[0].properties?.CORRIDOR;
        onLineFeatureClick(corridorName);
      } else {
        // actions when selected
      }
    }
    // if (setFeature) {
    //   const feature = e.features[0];
    //   setFeature(feature);
    // }
    // if (routeLayerRef.current.popup) {
    //   routeLayerRef.current.popup.remove();
    // }
  };

  useEffect(() => {
    // Mapbox event listeners must be Reactified here
    if (map) {
      map.on("mouseleave", selectorLayer, onMouseLeave);
      map.on("mouseenter", selectorLayer, onMouseEnter);
      map.on("click", selectorLayer, onClickLayer);
      // map.on("mouseleave", symbolLayerName, onMouseLeave);
      // map.on("mouseenter", symbolLayerName, onMouseEnter);
      if (map.isStyleLoaded()) {
        if (selectedCorridor) {
          styleSelectedCorridor();
        } else {
          styleInactiveLayer();
        }
      }
    }

    return () => {
      if (map) {
        // Tear down
        map.off("mouseleave", selectorLayer, onMouseLeave);
        map.off("mouseenter", selectorLayer, onMouseEnter);
        map.off("click", selectorLayer, onClickLayer);
        // map.off("mouseleave", symbolLayerName, onMouseLeave);
        // map.off("mouseenter", symbolLayerName, onMouseEnter);
        if (routeLayerRef.current.popup) {
          routeLayerRef.current.popup.remove();
        }
      }
    };
  }, [map, selectedCorridor]); // Dependent variables in methods above must be added

  YEAR_FILTER_HOOK({
    map,
    yearRange,
    layerNames: [
      highlightLayer,
      highlightOutlineLayer,
      selectorLayer,
      symbolLayerName,
    ],
  });

  return null;
};

export default RouteLayer;

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
} from "../../constants/mapbox";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";

import { COLORS } from "../../constants/colors";
import MapPopup from "./MapPopup";
import { YEAR_FILTER_HOOK } from "./maphooks";

const RouteLayer: FC<IPropsRouteLayer> = ({
  layerName,
  sourceId,
  corridors = null,
  sourceLayerName,
  map,
  selectedCorridor,
  yearRange,
  selectedType,
  onCorridorSelect,
}) => {
  const activeCorridor = useRef<FeatureCorridorNames[] | null>(null);

  const selectorLayer = layerName + "-selector";
  const highlightLayer = "highlight-layer";
  const highlightOutlineLayer = "highlight-outline-layer";
  const symbolLayerName = layerName + "-symbols";
  const initialFilter: InitialFilterType = [
    "all",
    ["all", [">=", "YR_START1", 0]],
    [
      "any",
      ["==", "TYPE", `${selectedType || ""}`],
      ["==", "TYPE", "Ferry"],
      // ["==", "TYPE", "Train"],
    ],
  ];

  const isDiscoveryMode = selectedCorridor === null; // User is searching around map for a route to click on

  useEffect(() => {
    setupLayer();
    return () => {
      if (map) {
        map.removeLayer(selectorLayer);
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
          filter: initialFilter,
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
          filter: initialFilter,
        });

        map.addLayer({
          id: symbolLayerName,
          source: sourceId,
          // "source-layer": sourceLayerName,
          type: "symbol",
          layout: {
            "text-field": "{CORRIDOR_NAME}",
            "symbol-placement": "line",
            "text-size": LABEL_SIZE_STOPS,
            // "text-size": ['match', ['get', 'id'], 0, 1, 0.8]
            "text-font": ["DIN Pro Bold"],
            "text-anchor": "bottom",
            "text-transform": "uppercase",
          },
          paint: {
            "text-color": COLORS.map_bright_red,
            "text-halo-color": COLORS.map_bg_beige,
            "text-halo-width": 2,
            "text-opacity": 0,
          },
          filter: initialFilter,
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
      });
    }
  };

  const onMouseEnter = (e: MapMouseEvent) => {
    if (map) {
      map.getCanvas().style.cursor = "pointer";
      tryToHighlight(map, e);
    }
  };

  const onMouseMove = (e: MapMouseEvent) => {
    if (map) {
      tryToHighlight(map, e);
    }
  };

  const tryToHighlight = (map: mapboxgl.Map, e: MapMouseEvent) => {
    if (isDiscoveryMode) {
      const corridorNames = getFeatureCorridorNames(map, e);
      if (corridorNames) {
        if (
          activeCorridor.current === null ||
          (activeCorridor.current &&
            activeCorridor.current[0] !== corridorNames[0])
        ) {
          // console.log("HIGHLIGHT?", activeCorridor.current);
          activeCorridor.current = corridorNames;
          highlightCorridor(corridorNames);
        }
      }
    }
  };

  const onMouseLeave = (e: MapMouseEvent) => {
    if (map) {
      map.getCanvas().style.cursor = "";

      // Do not dehighlight for button popups
      if (
        isDiscoveryMode &&
        e.originalEvent.relatedTarget instanceof HTMLButtonElement === false
      ) {
        activeCorridor.current = null;
        deHighlightCorridors();
      }
    }
  };

  const onPopupButtonClick = (corridorName: FeatureCorridorNames) => {};

  const highlightCorridor = (corridorNames: FeatureCorridorNames[]) => {
    if (map) {
      let highlightFilter: MapboxFilterArray = ["any"];
      corridorNames.forEach((corridorName) => {
        // Grab all routes in each corridor
        corridors?.some((corridor) => {
          if (corridor.DATA_CORRIDOR === corridorName) {
            highlightFilter.push([
              "==",
              "CORRIDOR",
              corridor.DATA_CORRIDOR || "",
            ]);
            highlightFilter.push([
              "==",
              "CORRIDOR",
              corridor.DATA_CORRIDOR_SHARED || "",
            ]);
            return true;
          }
          return false;
        });
      });

      const newFilter = map.getFilter(highlightLayer);

      newFilter[ROUTE_FILTER_INDEX] = highlightFilter;
      map.setFilter(highlightLayer, newFilter);
      map.setFilter(highlightOutlineLayer, newFilter);

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
      const newFilter = map.getFilter(highlightLayer);
      const newRouteFilter = [
        "any",
        ["==", "CORRIDOR", selectedCorridor?.DATA_CORRIDOR || ""],
        ["==", "CORRIDOR", selectedCorridor?.DATA_CORRIDOR_SHARED || ""],
        // ["==", "CORRIDOR", selectedCorridor?.DATA_CORRIDOR_PAIRED || ""],
      ];
      newFilter[ROUTE_FILTER_INDEX] = newRouteFilter;

      map.setFilter(highlightLayer, newFilter);
      map.setFilter(highlightOutlineLayer, newFilter);

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
      map.setPaintProperty(
        symbolLayerName,
        "text-color",
        COLORS.map_bright_red
      );
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

  const onClickLayer = (e: MapMouseEvent) => {
    if (map) {
      const corridorNames = getFeatureCorridorNames(map, e);
      if (corridorNames && isDiscoveryMode) {
        if (corridorNames.length === 1) {
          onCorridorSelect(corridorNames[0]);
        } else {
          // Multiple
        }
      } else {
        // actions when selected
      }
    }
  };

  const onSelectedCorridor = () => {
    if (map && map.isStyleLoaded()) {
      if (selectedCorridor) {
        styleSelectedCorridor();
      } else {
        styleInactiveLayer();
      }
    }
  };

  useEffect(() => {
    if (map) {
      map.on("mouseenter", selectorLayer, onMouseEnter);
      map.on("mousemove", selectorLayer, onMouseMove);
      map.on("mouseleave", selectorLayer, onMouseLeave);
      map.on("click", selectorLayer, onClickLayer);
      onSelectedCorridor();

      return () => {
        map.off("mouseenter", selectorLayer, onMouseEnter);
        map.off("mousemove", selectorLayer, onMouseMove);
        map.off("mouseleave", selectorLayer, onMouseLeave);
        map.off("click", selectorLayer, onClickLayer);
      };
    }
  }, [map, selectedCorridor]); // Dependent variables in methods above must be added

  // YEAR_FILTER_HOOK({
  //   map,
  //   yearRange,
  //   layerNames: [
  //     highlightLayer,
  //     highlightOutlineLayer,
  //     selectorLayer,
  //     symbolLayerName,
  //   ],
  // });

  return (
    <MapPopup
      map={map}
      selectorLayer={selectorLayer}
      selectedCorridor={selectedCorridor}
      onCorridorSelect={onCorridorSelect}
    />
  );
};

export default RouteLayer;

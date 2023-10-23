import { Corridor, YearRange } from "../../constants/types";
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
  setFeature?: Dispatch<SetStateAction<object | null>>;
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
  setFeature,
}) => {
  const symbolLayerName = layerName + "-symbols";

  const [bounds, setBounds] =
    useState<SetStateAction<LngLatBounds | LngLatBoundsLike | null>>(null);

  const refLayer = useRef<Refs>({ popup: null });

  const initialFilter: Array<Array<string> | string> = [
    "any",
    ["==", "CORRIDOR", corridor?.DATA_CORRIDOR || ""],
    ["==", "CORRIDOR", corridor?.DATA_THROUGHROUTE || ""],
    ["==", "CORRIDOR", corridor?.DATA_CORRIDOR_SHARED || ""],
  ];

  useEffect(() => {
    setupLayer();

    return () => {
      if (map) {
        map.removeLayer(layerName);
        map.removeLayer(symbolLayerName);
      }
    };
  }, [map]);

  const setupLayer = () => {
    if (map) {
      map.on("load", () => {
        map.addLayer({
          id: layerName,
          source: sourceId,
          // "source-layer": sourceLayerName,
          type: "line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
            "line-sort-key": 10,
          },
          paint: {
            "line-color": COLORS.tcrt_map_red,
            "line-width": 10,
            // "line-translate": [corridor?.id ? corridor?.id * 0.25 : 0, 0],
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
            "text-field": corridor?.routeName,
            "symbol-placement": "line",
            "text-size": LABEL_SIZE_STOPS,
            // "text-size": ['match', ['get', 'id'], 0, 1, 0.8]
            "text-font": ["DIN Pro Bold"],
            "text-anchor": "bottom",
          },
          paint: {
            "text-color": COLORS.map_dark_red,
            "text-halo-color": COLORS.map_bg_beige,
            "text-halo-width": 2,
          },
          filter: initialFilter,
        });

        map.once("idle", () => {
          if (!bounds) {
            const features = map.querySourceFeatures(sourceId, {
              // sourceLayer: sourceLayerName,
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
              console.log("No features for " + corridor?.DATA_CORRIDOR);
            }
          }
        });

        refLayer.current.popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
      });
    }
  };

  const styleSelectedLayer = () => {
    if (map) {
      // Highlight selected layer
      map.setLayoutProperty(layerName, "visibility", "visible");
      map.setLayoutProperty(symbolLayerName, "visibility", "visible");
      map.setPaintProperty(layerName, "line-opacity", 1);
      map.setLayoutProperty(layerName, "line-sort-key", 1000);
      if (bounds) {
        map.fitBounds(bounds as LngLatBoundsLike, {
          padding: 200,
          offset: [0, -50],
        });
      }
    }
  };

  const styleInactiveLayer = () => {
    if (map) {
      map.setLayoutProperty(layerName, "visibility", "none");
      map.setLayoutProperty(symbolLayerName, "visibility", "none");
      // map.setPaintProperty(layerName, "line-opacity", 0);
      // map.setLayoutProperty(layerName, "line-sort-key", corridor?.id);
    }
  };

  const resetLayerStyle = () => {
    if (map) {
      map.setLayoutProperty(layerName, "visibility", "visible");
      map.setLayoutProperty(symbolLayerName, "visibility", "visible");
      map.setPaintProperty(layerName, "line-opacity", 0);
      map.setLayoutProperty(layerName, "line-sort-key", corridor?.id);
    }
  };

  const onMouseEnter = (e: { lngLat: mapboxgl.LngLatLike }) => {
    if (map) {
      map.getCanvas().style.cursor = "pointer";
      map.setPaintProperty(layerName, "line-opacity", 1);
      // if (e && refLayer.current.popup) {
      //   refLayer.current.popup
      //     .setLngLat(e.lngLat)
      //     .trackPointer()
      //     .setHTML(HTML_POPUP(e))
      //     .addTo(map);
      // }
    }
  };
  const onMouseLeave = () => {
    if (map) {
      if (refLayer.current.popup) {
        refLayer.current.popup.remove();
      }
      if (map) {
        map.getCanvas().style.cursor = "";
        if (!isSelected) {
          map.setPaintProperty(layerName, "line-opacity", isSelected ? 1 : 0);
        }
      }
    }
  };

  const onClickLayer = (e: any) => {
    // if (setFeature) {
    //   const feature = e.features[0];
    //   setFeature(feature);
    // }
    if (refLayer.current.popup) {
      refLayer.current.popup.remove();
    }
    onRouteLayerClick(corridor);
  };

  useEffect(() => {
    if (isSelected === null) {
      resetLayerStyle();
    } else if (isSelected === true) {
      styleSelectedLayer();
    } else {
      styleInactiveLayer();
    }
  }, [isSelected]);

  useEffect(() => {
    // Mapbox event listeners must be Reactified here
    if (map) {
      map.on("mouseleave", layerName, onMouseLeave);
      map.on("mouseenter", layerName, onMouseEnter);
      map.on("click", layerName, onClickLayer);
      // map.on("mouseleave", symbolLayerName, onMouseLeave);
      // map.on("mouseenter", symbolLayerName, onMouseEnter);
      return () => {
        // Tear down
        map.off("mouseleave", layerName, onMouseLeave);
        map.off("mouseenter", layerName, onMouseEnter);
        map.off("click", layerName, onClickLayer);
        // map.off("mouseleave", symbolLayerName, onMouseLeave);
        // map.off("mouseenter", symbolLayerName, onMouseEnter);
        if (refLayer.current.popup) {
          refLayer.current.popup.remove();
        }
      };
    }
  }, [map, isSelected]); // Dependent variables in methods above must be added

  YEAR_FILTER_HOOK({
    map,
    yearRange,
    layerNames: [layerName, symbolLayerName],
    initialFilter,
  });

  return null;
};

export default RouteLayer;

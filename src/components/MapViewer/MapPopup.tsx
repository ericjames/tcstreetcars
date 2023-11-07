import { Corridor, FeatureCorridorNames } from "../../constants/types";
import { FC, useEffect, useRef, useState } from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";

import CORRIDOR_NAMES from "../../constants/CORRIDOR_NAMES.json";
import { createPortal } from "react-dom";
import { getFeatureCorridorNames } from "../../constants/mapbox";

const MapPopup: FC<{
  map: mapboxgl.Map | undefined;
  selectorLayer: string;
  selectedCorridor: Corridor | null;
  onCorridorSelect: (corridorName: FeatureCorridorNames) => void;
}> = ({ map, selectorLayer, selectedCorridor, onCorridorSelect }) => {
  const [corridorNames, setCorridorNames] =
    useState<Array<FeatureCorridorNames> | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const mapPopup = useRef<mapboxgl.Popup>(
    new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, 10],
    })
  );
  const popupNode = useRef<HTMLDivElement>(document.createElement("div"));
  const isSticky = useRef<boolean>(false);

  useEffect(() => {
    if (map) {
      mapPopup.current.setDOMContent(popupNode.current).addTo(map);
      map.on("click", onLayerClick);
      map.on("mouseenter", selectorLayer, onLayerMouseEnter);
      map.on("mousemove", selectorLayer, onLayerMouseMove);
      map.on("mouseleave", selectorLayer, onLayerMouseLeave);
      return () => {
        map.off("click", onLayerClick);
        map.off("mouseenter", selectorLayer, onLayerMouseEnter);
        map.off("mousemove", selectorLayer, onLayerMouseMove);
        map.off("mouseleave", selectorLayer, onLayerMouseLeave);
      };
    }
  }, [map, selectedCorridor, corridorNames]);

  useEffect(() => {
    if (selectedCorridor) {
      isSticky.current = false;
      mapPopup.current?.remove();
    }
  }, [selectedCorridor]);

  const onLayerMouseEnter = (e: MapMouseEvent) => {
    if (map && !isSticky.current && !selectedCorridor) {
      mapPopup.current?.trackPointer().addTo(map);
    }
  };

  const onLayerMouseMove = (e: MapMouseEvent) => {
    if (map && !isSticky.current && !selectedCorridor) {
      const hoveredCorridors = getFeatureCorridorNames(map, e);
      const compare = corridorNames ? corridorNames[0] : "";
      if (hoveredCorridors && hoveredCorridors[0] !== compare) {
        getFeatureProperties(e);
        setCorridorNames(hoveredCorridors);
      }
    }
  };

  const getFeatureProperties = (e: MapMouseEvent) => {
    if (map) {
      const features = map.queryRenderedFeatures(e.point);
      if (features && features.length > 0) {
        let text = `${features[0].properties?.YR_START1 || "--"} - ${
          features[0].properties?.YR_END1
        }`;
        if (features[0].properties?.YR_START2) {
          text += ` / ${features[0].properties?.YR_START2} - ${features[0].properties?.YR_END2}`;
        }
        setYear(text);
      }
    }
  };

  const onLayerMouseLeave = (e: MapMouseEvent) => {
    if (!isSticky.current) {
      mapPopup.current?.remove();
    }
  };

  const onLayerClick = (e: MapMouseEvent) => {
    if (map) {
      if (!isSticky.current) {
        if (!selectedCorridor) {
          isSticky.current = true;
          mapPopup.current.remove();
          mapPopup.current.setLngLat(e.lngLat).addTo(map);
        } else {
          // Corridor is selected
        }
        // const hoveredCorridors = getFeatureCorridorNames(map, e);
        // setCorridorNames(hoveredCorridors);
      } else {
        isSticky.current = false;
        mapPopup.current.remove();
      }
    }
  };

  const onButtonClick = (corridorName: FeatureCorridorNames) => {
    onCorridorSelect(corridorName);
  };

  const niceMap = CORRIDOR_NAMES as any;

  return createPortal(
    <div
      className="mapbox-popup-inner"
      style={{ zIndex: 100 }}>
      {corridorNames &&
        corridorNames.map((corridorName: FeatureCorridorNames, i: number) => {
          const niceName = niceMap[corridorName] || corridorName;
          return (
            <button
              key={corridorName}
              className="btn w-100"
              onClick={() => onButtonClick(corridorName)}>
              {niceName}
              <br />
              <small>{year}</small>
            </button>
          );
        })}
    </div>,
    popupNode.current
  );
};

export default MapPopup;

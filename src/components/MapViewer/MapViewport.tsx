import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import {
  Corridor,
  NavigationStateProp,
  RegionName,
} from "../../constants/types";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import {
  EASTMETRO_CENTER,
  EASTMETRO_ZOOM,
  NORTHMETRO_CENTER,
  NORTHMETRO_ZOOM,
  SOUTHMETRO_CENTER,
  SOUTHMETRO_ZOOM,
  TC_CENTER,
  TC_MAP_STYLE,
  TC_ZOOM,
  WESTMETRO_CENTER,
  WESTMETRO_ZOOM,
} from "../../constants/mapbox";

import mapboxgl from "mapbox-gl";

type IProps = {
  map: mapboxgl.Map | undefined;
  setMap: Dispatch<SetStateAction<mapboxgl.Map | undefined>>;
  navigation?: NavigationStateProp;
  selectedCorridor?: Corridor | null;
};

const MapViewport: FC<IProps> = ({
  map,
  setMap,
  selectedCorridor,
  navigation,
}) => {
  // this is where the map instance will be stored after initialization
  // const [map, setMap] = useState<mapboxgl.Map>();

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      style: TC_MAP_STYLE,
      center: TC_CENTER,
      zoom: 11,
      // zoom: 10,
    });

    // setTimeout(() => {
    //   requestAnimationFrame(() => {
    //     mapboxMap.flyTo({ duration: 5000, zoom: STARTUP_ZOOM, essential: true });
    //   });
    // }, 500);

    setMap(mapboxMap);

    mapboxMap.on("click", () => {
      console.log(mapboxMap.getCenter(), mapboxMap.getZoom());
    });

    return () => {
      mapboxMap.remove();
    };
  }, [setMap]);

  useEffect(() => {
    if (selectedCorridor === null) {
      resetMap();
    }
  }, [selectedCorridor, navigation]);

  const resetMap = () => {
    if (map) {
      switch (navigation?.region) {
        case RegionName.tc:
          map.flyTo({ zoom: TC_ZOOM, center: TC_CENTER });
          break;
        case RegionName.west:
          map.flyTo({ zoom: WESTMETRO_ZOOM, center: WESTMETRO_CENTER });
          break;
        case RegionName.east:
          map.flyTo({ zoom: EASTMETRO_ZOOM, center: EASTMETRO_CENTER });
          break;
        case RegionName.north:
          map.flyTo({ zoom: NORTHMETRO_ZOOM, center: NORTHMETRO_CENTER });
          break;
        case RegionName.south:
          map.flyTo({ zoom: SOUTHMETRO_ZOOM, center: SOUTHMETRO_CENTER });
          break;
        default:
      }
    }
  };

  return (
    <div
      ref={mapNode}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MapViewport;

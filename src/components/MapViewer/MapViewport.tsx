import "mapbox-gl/dist/mapbox-gl.css";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { STARTUP_ZOOM, TC_CENTER, TC_MAP_STYLE } from "../../constants/mapbox";

import mapboxgl from "mapbox-gl";

type IProps = {
  setMap: Dispatch<SetStateAction<mapboxgl.Map | undefined>>;
};

const MapViewport: FC<IProps> = ({ setMap }) => {
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
      zoom: 10,
    });

    // setTimeout(() => {
    //   requestAnimationFrame(() => {
    //     mapboxMap.flyTo({ duration: 5000, zoom: STARTUP_ZOOM, essential: true });
    //   });
    // }, 500);

    if (setMap) {
      setMap(mapboxMap);
    }

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
};

export default MapViewport;

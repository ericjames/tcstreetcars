import "mapbox-gl/dist/mapbox-gl.css";

import React, { FC, useEffect, useRef, useState } from "react";

import { TC_CENTER } from "../../../../constants";
import mapboxgl from "mapbox-gl";

type IProps = {
  map: mapboxgl.Map | undefined;
};

const Path: FC<IProps> = ({ map }) => {
  useEffect(() => {
    if (map) {
    }
  }, []);

  return null;
};

export default Path;

import React, { FC, useEffect, useRef, useState } from "react";

import mapboxgl from "mapbox-gl";

type IProps = {
  id: string;
  url: string;
  map: mapboxgl.Map | undefined;
};

const MapSource: FC<IProps> = ({ id, url, map }) => {
  useEffect(() => {
    if (map) {
      map.on("load", () => {
        if (!map.getSource(id)) {
          map.addSource(id, {
            type: "vector",
            url: url,
          });
        }
      });
    }
  }, [map]);

  return null;
};

export default MapSource;

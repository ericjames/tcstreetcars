import React, { FC, useEffect, useRef, useState } from "react";
import {
  SOURCE_DATASET_URL,
  SOURCE_ID,
  SOURCE_LAYER_NAME,
} from "../../constants/mapbox";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";

import { ADMIN_MODE } from "../../constants";

type IProps = {
  id: string;
  type: string;
  url?: string;
  map: mapboxgl.Map | undefined;
  data?: any;
};

const MapSource: FC<IProps> = ({ id, url, map, type, data }) => {
  useEffect(() => {
    if (map) {
      map.on("style.load", () => {
        if (type === "vector") {
          map.addSource(id, {
            type,
            url,
          });
        } else if (type === "geojson") {
          // Assign new IDs
          // data.features.forEach((feature: any, i: number) => {
          //   feature.id = i + 1;
          // });
          map.addSource(id, {
            type,
            data,
            // generateId: ADMIN_MODE,
          });
        }
      });
    }
    return () => {
      if (map) {
        map.on("remove", () => {
          map.removeSource(id);
        });
      }
    };
  }, [map]);

  useEffect(() => {
    if (data && map) {
      const source = map.getSource(id) as GeoJSONSource;
      if (source) {
        source.setData(data);
      }
    }
  }, [data]);

  return null;
};

export default MapSource;

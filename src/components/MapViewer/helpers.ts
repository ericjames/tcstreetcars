import { YearRange } from "../../constants/types";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

interface YFHProps {
  map: mapboxgl.Map | undefined;
  yearRange: YearRange;
  layerNames: Array<string>;
  initialFilter?: Array<any> | null;
}

export const YEAR_FILTER_HOOK = ({
  map,
  yearRange,
  layerNames,
  initialFilter,
}: YFHProps) => {
  useEffect(() => {
    if (map) {
      if (!yearRange[0] && !yearRange[1]) {
        // Year range is null, make all features on layer appear
        if (initialFilter) {
          layerNames.forEach((layerName) => {
            map.setFilter(layerName, initialFilter);
          });
        } else {
          layerNames.forEach((layerName) => {
            map.setFilter(layerName, null);
          });
        }
      } else {
        // Filter out layers
        const startYear = yearRange[0];
        const endYear =
          yearRange[1] && yearRange[1] > 9999
            ? yearRange[1].toString().substring(-4)
            : yearRange[1];

        // console.log(startYear, endYear);

        const rangeFilter = [
          // [">=", "YR_START1", startYear],
          // ["<=", "YR_END1", endYear],
          ["<=", "YR_START1", endYear],
        ];

        if (initialFilter) {
          layerNames.forEach((layerName) => {
            map.setFilter(layerName, ["all", initialFilter, ...rangeFilter]);
          });
        } else {
          layerNames.forEach((layerName) => {
            map.setFilter(layerName, ...rangeFilter);
          });
        }
      }
    }
  }, [yearRange]);
};

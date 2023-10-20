import { YearRange } from "../../constants/types";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

interface YFHProps {
  map: mapboxgl.Map | undefined;
  yearRange: YearRange;
  layerName: string;
  initialFilter: Array<any> | null;
}

export const YEAR_FILTER_HOOK = ({
  map,
  yearRange,
  layerName,
  initialFilter,
}: YFHProps) => {
  useEffect(() => {
    if (map) {
      if (!yearRange[0] && !yearRange[1]) {
        if (initialFilter) {
          map.setFilter(layerName, initialFilter);
        } else {
          map.setFilter(layerName, null);
        }
      } else {
        const startYear = yearRange[0];
        const endYear =
          yearRange[1] && yearRange[1] > 9999
            ? yearRange[1].toString().substring(-4)
            : yearRange[1];

        console.log(startYear, endYear);

        const rangeFilter = [
          // [">=", "YR_START1", startYear],
          // ["<=", "YR_END1", endYear],
          ["<=", "YR_START1", endYear],
        ];

        if (initialFilter) {
          map.setFilter(layerName, ["all", initialFilter, ...rangeFilter]);
        } else {
          map.setFilter(layerName, ...rangeFilter);
        }
      }
    }
  }, [yearRange]);
};

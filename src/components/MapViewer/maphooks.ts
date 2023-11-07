import { MapboxFilterArray, YearRange } from "../../constants/types";

import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

interface YFHProps {
  map: mapboxgl.Map | undefined;
  yearRange: YearRange | null;
  layerNames: Array<string>;
}

export const YEAR_FILTER_HOOK = ({ map, yearRange, layerNames }: YFHProps) => {
  const setFilterOnLayers = (
    yearFilter: Array<string | MapboxFilterArray> | null
  ) => {
    if (map) {
      layerNames.forEach((layerName) => {
        const existingFilter = map?.getFilter(layerName);
        if (existingFilter) {
          existingFilter[1] = yearFilter; // @NOTE ARBITRARILY note 3rd position for year filter
          console.log("YEAR_FILTER_HOOK", existingFilter);
          map.setFilter(layerName, existingFilter);
        }
      });
    }
  };

  useEffect(() => {
    if (map) {
      map.once("render", () => {
        setYearFilter();
      });
    }
  }, [map]);

  useEffect(() => {
    setYearFilter();
  }, [yearRange]);

  const setYearFilter = () => {
    if (!yearRange) {
      // Year range is null, make all features on layer appear
      setFilterOnLayers(null);
    } else if (yearRange.length === 2) {
      // Filter out layers
      const startYear = yearRange[0];
      const endYear =
        yearRange[1] && yearRange[1] > 9999
          ? yearRange[1].toString().substring(-4)
          : yearRange[1];

      console.log(startYear, endYear);

      const yearFilter: Array<"all" | MapboxFilterArray> = ["all"];

      const range1 = [
        "all",
        ["<=", "YR_START1", endYear],
        [">", "YR_END1", startYear],
      ];

      const range2 = [
        "all",
        ["<=", "YR_START2", endYear],
        [">", "YR_END2", startYear],
      ];

      yearFilter.push(["any", range1, range2]);

      setFilterOnLayers(yearFilter);
    }
  };
};

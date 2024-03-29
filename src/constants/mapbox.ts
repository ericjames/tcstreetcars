import { FeatureCorridorNames, YearRange } from "./types";
import { YEAR_END_GRADIENT, disambiguateCorridorNames } from ".";
import mapboxgl, { Expression, MapMouseEvent } from "mapbox-gl";

import { COLORS } from "./colors";
import CORRIDOR_NAMES from "./CORRIDOR_NAMES.json";

export const TC_CENTER: [number, number] = [-93.201, 44.9675];
export const WESTMETRO_CENTER: [number, number] = [-93.48, 44.932];
export const EASTMETRO_CENTER: [number, number] = [-92.918, 45.024];
export const NORTHMETRO_CENTER: [number, number] = [-93.319, 45.123];
export const SOUTHMETRO_CENTER: [number, number] = [-93.121, 44.786];

export const TC_ZOOM = 11;
export const WESTMETRO_ZOOM = 10.5;
export const EASTMETRO_ZOOM = 10.9;
export const NORTHMETRO_ZOOM = 11;
export const SOUTHMETRO_ZOOM = 10.1;

// export const TC_MAP_STYLE =
//   "mapbox://styles/fluidicmethod/ckvdayqly5n1714pca4qep17o";

export const TC_MAP_STYLE =
  "mapbox://styles/fluidicmethod/clolu4e61000w01nwhlrw7ssi";

export const SATELLITE_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";

export const SOURCE_ID = "historic-routes-source";

export const SOURCE_URL =
  "mapbox://fluidicmethod.cja7kfi3dax6q2qpa97jgg3sz-1hsge";

export const SOURCE_DATASET_URL =
  "mapbox://fluidicmethod.cja7kfi3dax6q2qpa97jgg3sz";

export const SOURCE_LAYER_NAME = "Historic_Transit_Routes_-_Twin_C";

export const SOURCE_LAYER_ID = "historic-routes-layer";

export const YEAR_FILTER_INDEX = 1;
export const TYPE_FILTER_INDEX = 2;
export const ROUTE_FILTER_INDEX = 3;

export const DEFAULT_LINE_WIDTH = 2;

export const SELECTED_LINE_WIDTH = 8;

export const RECEDED_LINE_OPACITY = 0.3;

export const LINE_WIDTH_STOPS = {
  stops: [
    [8, DEFAULT_LINE_WIDTH],
    [12, 4],
  ],
};

export const LABEL_SIZE_STOPS = {
  stops: [
    [8, 8],
    [11, 10],
    [13, 15],
  ],
};

// export const CONVERT_GEOJSON_TO_FEATURE = (
//   mbFeature: MapboxGeoJSONFeature
// ): AppGeometryFeature | null => {
//   console.log("TEST", mbFeature);
//   if (AllowedGeometryTypes.indexOf(mbFeature.geometry.type) !== -1) {
//     return {
//       id: mbFeature?.id || 9999,
//       properties: mbFeature?.properties,
//       type: mbFeature.type,
//       geometry: {
//         type: mbFeature.geometry.type as "LineString" | "Point",
//         // geometry: mbFeature.geometry,
//       },
//     };
//   }
//   return null;
// };

export const getLineColorGradient = (): Expression => {
  const gradients: any = COLORS.getYearGradients();
  const cases: Array<string | Array<any>> = [];
  YEAR_END_GRADIENT.forEach((yearEnd, i) => {
    cases.push([
      "all",
      ["<=", ["get", "YR_END1"], yearEnd],
      // [">=", ["get", "YR_START1"], startYear],
      // ["<=", ["get", "YR_END1"], endYear],
    ]);
    cases.push(gradients[i]);
  });

  return ["case", ...cases, "#00ff00"] as Expression;
};

export const getPopupHTML = (
  corridorNames: Array<FeatureCorridorNames>,
  onButtonClick?: () => void
) => {
  const niceMap = CORRIDOR_NAMES as any;
  let buttons = "";
  corridorNames.forEach((corridorName) => {
    const niceName = niceMap[corridorName] || corridorName;
    buttons += `<button class="btn w-100" onClick="onButtonClick">${niceName}</button>`;
  });

  return `
  <div className="mapbox-popup-inner">
  ${buttons}
  </div>
  `;
};

export const getFeatureCorridorNames = (
  map: mapboxgl.Map,
  e: MapMouseEvent
): Array<FeatureCorridorNames> | null => {
  // Identify overlapped routes
  if (map) {
    const features = map.queryRenderedFeatures(e.point);
    const rawCorridorName = features[0].properties
      ?.CORRIDOR as FeatureCorridorNames;

    // return [rawCorridorName];
    const corridorNames = disambiguateCorridorNames(rawCorridorName);
    return corridorNames;
  }
  return null;
};

export const addAnimation = (map: mapboxgl.Map) => {
  // add a line layer without line-dasharray defined to fill the gaps in the dashed line
  map.addLayer({
    type: "line",
    source: "line",
    id: "line-background",
    paint: {
      "line-color": "yellow",
      "line-width": 6,
      "line-opacity": 0.4,
    },
  });

  // add a line layer with line-dasharray set to the first value in dashArraySequence
  map.addLayer({
    type: "line",
    source: "line",
    id: "line-dashed",
    paint: {
      "line-color": "yellow",
      "line-width": 6,
      "line-dasharray": [0, 4, 3],
    },
  });

  // technique based on https://jsfiddle.net/2mws8y3q/
  // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern
  const dashArraySequence = [
    [0, 4, 3],
    [0.5, 4, 2.5],
    [1, 4, 2],
    [1.5, 4, 1.5],
    [2, 4, 1],
    [2.5, 4, 0.5],
    [3, 4, 0],
    [0, 0.5, 3, 3.5],
    [0, 1, 3, 3],
    [0, 1.5, 3, 2.5],
    [0, 2, 3, 2],
    [0, 2.5, 3, 1.5],
    [0, 3, 3, 1],
    [0, 3.5, 3, 0.5],
  ];

  let step = 0;

  function animateDashArray(timestamp: number) {
    // Update line-dasharray using the next value in dashArraySequence. The
    // divisor in the expression `timestamp / 50` controls the animation speed.
    const newStep = parseInt(`${(timestamp / 50) % dashArraySequence.length}`);

    if (newStep !== step) {
      map.setPaintProperty(
        "line-dashed",
        "line-dasharray",
        dashArraySequence[step]
      );
      step = newStep;
    }

    // Request the next frame of the animation.
    requestAnimationFrame(animateDashArray);
  }

  // start the animation
  animateDashArray(0);
};

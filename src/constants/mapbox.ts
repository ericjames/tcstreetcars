import { YearRange } from "./types";
import mapboxgl from "mapbox-gl";

export const TC_CENTER: [number, number] = [-93.201, 44.9675];

export const TC_MAP_STYLE =
  "mapbox://styles/fluidicmethod/ckvdayqly5n1714pca4qep17o";

export const STARTUP_ZOOM = 11.5;

export const SOURCE_ID = "historic-routes-source";

export const SOURCE_URL =
  "mapbox://fluidicmethod.cja7kfi3dax6q2qpa97jgg3sz-1hsge";

export const SOURCE_LAYER_NAME = "Historic_Transit_Routes_-_Twin_C";

export const SOURCE_LAYER_ID = "historic-routes-layer";

export const DEFAULT_LINE_WIDTH = 2;

export const SELECTED_LINE_WIDTH = 8;

export const RECEDED_LINE_OPACITY = 0.3;

export const YEAR_RANGES: Array<YearRange> = [
  [null, 1888],
  [1889, 1899],
  [1904, 1917],
  [1917, 1927],
  [1928, 1930],
  [1931, 1954],
  [null, null],
];

export const LINE_WIDTH_STOPS = {
  stops: [
    [8, 1],
    [12, DEFAULT_LINE_WIDTH],
  ],
};

export const HTML_POPUP = (e: any) => `
<div style="padding: 0.5em; border-radius: 0.5em; background: #000; color: #fff">
ID: ${e?.features[0]?.properties.ID}<br/>
CORRIDOR: ${e?.features[0]?.properties.CORRIDOR}<br/>
TYPE: ${e?.features[0]?.properties.TYPE}<br/>
YEARS: ${e?.features[0]?.properties.YR_START1} - ${e?.features[0]?.properties.YR_END1}<br/>
</div>
`;

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

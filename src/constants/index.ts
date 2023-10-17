import { LngLatLike } from "mapbox-gl";

export const TC_CENTER: [number, number] = [-93.201, 44.9675];

export const TC_MAP_STYLE =
  "mapbox://styles/fluidicmethod/ckvdayqly5n1714pca4qep17o";

export const STARTUP_ZOOM = 11.5;

export const SOURCE_ID = "historic-routes-source";

export const SOURCE_URL =
  "mapbox://fluidicmethod.cja7kfi3dax6q2qpa97jgg3sz-1hsge";

export const SOURCE_LAYER_NAME = "Historic_Transit_Routes_-_Twin_C";

export const SOURCE_LAYER_ID = "historic-routes-layer";

export const DEFAULT_LINE_WIDTH = 4;

export const SELECTED_LINE_WIDTH = 10;

export const RECEDED_LINE_OPACITY = 0.3;

export const HTML_POPUP = (e: any) => `
<div style="padding: 0.5em; border-radius: 0.5em; background: #000; color: #fff">
CORRIDOR: ${e?.features[0]?.properties.CORRIDOR}<br/>
TYPE: ${e?.features[0]?.properties.TYPE}<br/>
</div>
`;

import {
  AppFeatureCollection,
  AppGeometryFeature,
  NavigationState,
  RegionName,
  TransitTypes,
} from "./types";
import { TC_CENTER, TC_ZOOM, WESTMETRO_CENTER, WESTMETRO_ZOOM } from "./mapbox";

import FEATURE_COLLECTION from "./DATA_FEATURE_COLLECTION.json";

export const EDITOR_MODE: boolean = false;

export const NAVIGATION: Array<NavigationState> = [
  {
    title: "About",
    showPage: "About",
  },
  {
    title: RegionName.tc.toString(),
    types: [TransitTypes.STREETCAR, TransitTypes.HORSECAR, TransitTypes.BUS],
    region: RegionName.tc,
    zoom: TC_ZOOM,
    center: TC_CENTER,
  },
  {
    title: RegionName.west.toString(),
    types: [
      TransitTypes.FERRY,
      TransitTypes.STEAMPOWER,
      TransitTypes.STREETCAR,
      TransitTypes.BUS,
    ],
    region: RegionName.west,
    zoom: WESTMETRO_ZOOM,
    center: WESTMETRO_CENTER,
  },
  {
    title: RegionName.east.toString(),
    types: [TransitTypes.STEAMPOWER, TransitTypes.STREETCAR, TransitTypes.BUS],
    region: RegionName.east,
  },
  {
    title: RegionName.north.toString(),
    types: [TransitTypes.STREETCAR, TransitTypes.BUS],
    region: RegionName.north,
  },
  {
    title: RegionName.south.toString(),
    types: [TransitTypes.STREETCAR, TransitTypes.BUS],
    region: RegionName.south,
  },
];

export const getDataFeatureCollection = () => {
  const fc = FEATURE_COLLECTION as AppFeatureCollection;
  let col: any = {};
  fc.features.forEach((feature: AppGeometryFeature) => {
    let corridorName = feature?.properties?.CORRIDOR;

    if (corridorName) {
      corridorName = corridorName
        .toUpperCase()
        .replace("-", "")
        .replaceAll(" ", "_");
      if (!col[corridorName]) {
        col[corridorName] = corridorName;
      }
    } else {
      console.log("MISSING", feature);
    }
  });
  console.log(col);
  return fc;
};

export const CORRIDOR_TO_ROUTEKEY = {
  CH: "Como - Harriet",
  OH: "Oak - Harriet",
  BJ: "Bryant - Johnson",
  NIC: "Nicollet - 2nd St NE",
  CHIFRE: "Chicago - Fremont",
  CHIPEN: "Chicago - Penn",
  MINNE: "Minnehaha - Ft. Snelling",
};

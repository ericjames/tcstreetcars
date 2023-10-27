import {
  AppFeatureCollection,
  AppGeometryFeature,
  Corridor,
  GenericObjectMap,
  NavigationState,
  RegionName,
  TransitTypes,
} from "./types";
import { TC_CENTER, TC_ZOOM, WESTMETRO_CENTER, WESTMETRO_ZOOM } from "./mapbox";

import CORRIDOR_NAMES from "./CORRIDOR_NAMES.json";
import DATA_CORRIDORS from "./DATA_CORRIDORS.json";
import FEATURE_COLLECTION from "./DATA_FEATURE_COLLECTION.json";

export const EDITOR_MODE: boolean = true;

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
  const fc = JSON.parse(
    JSON.stringify(FEATURE_COLLECTION)
  ) as AppFeatureCollection;
  return fc;
  // let col: any = {};
  // console.log("data");
  // fc.features.forEach((feature: AppGeometryFeature) => {
  //   const corridorNameType = `${feature?.properties?.CORRIDOR} ${feature?.properties?.TYPE}`;

  //   const transformedName = corridorNameType
  //     .toUpperCase()
  //     .replace("-", "")
  //     .replaceAll(" ", "_");
  //   feature.properties.CORRIDOR = transformedName;
  //   if (!col[corridorNameType]) {
  //     col[corridorNameType] = transformedName;
  //   }
  // });
  // console.log(col);
  // return fc;
};

export const getCorridors = () => {
  // const names = CORRIDOR_NAMES as GenericObjectMap;
  const corridors = JSON.parse(
    JSON.stringify(DATA_CORRIDORS)
  ) as Array<Corridor>;
  // corridors.forEach((corridor) => {
  //   const oldName = corridor.DATA_CORRIDOR;
  //   corridor.DATA_CORRIDOR = names[oldName];
  // });
  // console.log(corridors);
  return corridors;
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

import {
  AppFeatureCollection,
  Corridor,
  FeatureCorridorNames,
  NavigationState,
  RegionName,
  TransitTypes,
  YearRange,
} from "./types";
import { TC_CENTER, TC_ZOOM, WESTMETRO_CENTER, WESTMETRO_ZOOM } from "./mapbox";

import DATA_CORRIDORS_BUS from "./DATA_CORRIDORS_BUS.json";
import DATA_CORRIDORS_FERRY from "./DATA_CORRIDORS_FERRY.json";
import DATA_CORRIDORS_HORSECAR from "./DATA_CORRIDORS_HORSECAR.json";
import DATA_CORRIDORS_STREETCAR from "./DATA_CORRIDORS_STREETCAR.json";
import FEATURE_COLLECTION from "./DATA_FEATURE_COLLECTION.json";
import SHARED_FEATURE_CORRIDORS from "./SHARED_FEATURE_CORRIDORS.json";

// DATA_CORRIDORS_BUS.forEach((bus) => {
//   const names = CORRIDOR_NAMES as any;
//   bus.DATA_CORRIDOR = names[bus.DATA_CORRIDOR] || bus.DATA_CORRIDOR;
// });
// console.log(DATA_CORRIDORS_BUS);

export const ADMIN_MODE: boolean = true;
export const PRODUCTION_MODE: boolean = false;

export const NAVIGATION: Array<NavigationState> = [
  {
    title: "About",
    modal: "About",
  },
  {
    title: RegionName.tc.toString(),
    types: [
      TransitTypes.STREETCAR,
      TransitTypes.BUS,
      TransitTypes.HORSECAR,
      TransitTypes.STEAMPOWER,
    ],
    region: RegionName.tc,
    zoom: TC_ZOOM,
    center: TC_CENTER,
  },
  {
    title: RegionName.west.toString(),
    types: [
      TransitTypes.STREETCAR,
      TransitTypes.FERRY,
      TransitTypes.BUS,
      TransitTypes.STEAMPOWER,
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

export const YEAR_RANGES: Array<YearRange> = [
  [1880, 1900],
  [1901, 1917],
  [1918, 1926],
  [1927, 1932],
  [1933, 1954],
  // [null, null],
];

export const YEAR_END_GRADIENT: Array<number> = [1909, 1933, 1947, 1954];

export const getDataFeatureCollection = () => {
  const fc = JSON.parse(
    JSON.stringify(FEATURE_COLLECTION)
  ) as AppFeatureCollection;
  return fc;
};

export const getCorridors = () => {
  const corridors = [
    ...(JSON.parse(
      JSON.stringify(DATA_CORRIDORS_STREETCAR)
    ) as Array<Corridor>),
    ...(JSON.parse(JSON.stringify(DATA_CORRIDORS_FERRY)) as Array<Corridor>),
    ...(JSON.parse(JSON.stringify(DATA_CORRIDORS_BUS)) as Array<Corridor>),
    ...(JSON.parse(JSON.stringify(DATA_CORRIDORS_HORSECAR)) as Array<Corridor>),
  ];
  // // Generate list of CORRIDOR_NAMES
  // const names = CORRIDOR_NAMES as GenericObjectMap;
  // corridors.forEach((corridor) => {
  //   const oldName = corridor.DATA_CORRIDOR_PAIRED;
  //   corridor.DATA_CORRIDOR_SHARED = oldName ? names[oldName] : "";
  //   corridor.DATA_CORRIDOR_PAIRED = oldName ? names[oldName] : "";
  // });
  // console.log(corridors);

  // // Generate { CORRIDOR: routeName } list
  // let list: any = {};
  // corridors.forEach((corridor) => {
  //   list[corridor.DATA_CORRIDOR] = corridor.routeName;
  // });
  // console.log(list);

  return corridors;
};

// Disambiguates shared keys
export const disambiguateCorridorNames = (
  featureCorridor: FeatureCorridorNames
): FeatureCorridorNames[] => {
  const shared = SHARED_FEATURE_CORRIDORS as {
    [key: string]: Array<FeatureCorridorNames>;
  };
  return shared[featureCorridor] || [featureCorridor];
};

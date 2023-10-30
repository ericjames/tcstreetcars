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
import DATA_CORRIDORS_BUS from "./DATA_CORRIDORS_BUS.json";
import DATA_CORRIDORS_FERRY from "./DATA_CORRIDORS_FERRY.json";
import DATA_CORRIDORS_HORSECAR from "./DATA_CORRIDORS_HORSECAR.json";
import DATA_CORRIDORS_STREETCAR from "./DATA_CORRIDORS_STREETCAR.json";
import FEATURE_COLLECTION from "./DATA_FEATURE_COLLECTION.json";

// DATA_CORRIDORS_BUS.forEach((bus) => {
//   const names = CORRIDOR_NAMES as any;
//   bus.DATA_CORRIDOR = names[bus.DATA_CORRIDOR] || bus.DATA_CORRIDOR;
// });
// console.log(DATA_CORRIDORS_BUS);

export const EDITOR_MODE: boolean = false;
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

export const getDataFeatureCollection = () => {
  const fc = JSON.parse(
    JSON.stringify(FEATURE_COLLECTION)
  ) as AppFeatureCollection;
  // _featureEditor(fc);
  return fc;
};

const _featureEditor = (fc: AppFeatureCollection) => {
  // Get types not in list
  let leftovers: any = {};
  const names: any = CORRIDOR_NAMES;
  fc.features.forEach((feature: AppGeometryFeature) => {
    if (!names[feature.properties.CORRIDOR]) {
      leftovers[feature.properties.CORRIDOR] = "";
    }
  });
  console.log(leftovers);
  // Get list of types
  // const corridorNameTypes: Array<string> = [];
  // fc.features.forEach((feature: AppGeometryFeature) => {
  //   if (corridorNameTypes.indexOf(feature?.properties?.CORRIDOR) === -1) {
  //     corridorNameTypes.push(feature?.properties?.CORRIDOR);
  //   }
  // });
  // console.log(corridorNameTypes.sort());

  // // Edit names
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

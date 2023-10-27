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
import DATA_CORRIDORS_STREETCAR from "./DATA_CORRIDORS_STREETCAR.json";
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
  const fc = JSON.parse(
    JSON.stringify(FEATURE_COLLECTION)
  ) as AppFeatureCollection;
  // _getCorridorTypes(fc);
  return fc;
};

const _getCorridorTypes = (fc: AppFeatureCollection) => {
  // Get list of types
  const corridorNameTypes: Array<string> = [];
  fc.features.forEach((feature: AppGeometryFeature) => {
    if (corridorNameTypes.indexOf(feature?.properties?.CORRIDOR) === -1) {
      corridorNameTypes.push(feature?.properties?.CORRIDOR);
    }
  });
  console.log(corridorNameTypes.sort());

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
  const corridors = JSON.parse(
    JSON.stringify(DATA_CORRIDORS_STREETCAR)
  ) as Array<Corridor>;

  // // Generate list of CORRIDOR_NAMES
  // const names = CORRIDOR_NAMES as GenericObjectMap;
  // corridors.forEach((corridor) => {
  //   const oldName = corridor.DATA_CORRIDOR_PAIRED;
  //   corridor.DATA_CORRIDOR_SHARED = oldName ? names[oldName] : "";
  //   corridor.DATA_CORRIDOR_PAIRED = oldName ? names[oldName] : "";
  // });
  // console.log(corridors);

  return corridors;
};

import { Dispatch, SetStateAction } from "react";

import { Type } from "typescript";

// export enum AllowedGeometryTypes {
//   LineString = "LineString",
//   Point = "Point",
// }
export type AppFeatureCollection = {
  type: "FeatureCollection";
  features: Array<AppGeometryFeature>;
};
export type AllowedGeometryTypes = "LineString" | "Point";

export type AppGeometryFeature = {
  id: number | string;
  properties: any;
  type: "Feature";
  geometry: {
    type: AllowedGeometryTypes;
    coordinates?: Array<[number, number]> | Array<Array<[number, number]>>;
  };
};

export enum TransitTypes {
  STREETCAR = "Streetcar",
  HORSECAR = "Horsecar",
  FERRY = "Ferry",
  STEAMPOWER = "Steam Power",
  BUS = "Bus",
  TRAIN = "Train",
  FREIGHT = "Freight",
}

export type NavigationState = {
  title: string;
  description?: string;
  modal?: string;
  types?: Array<TransitTypes>;
  region?: RegionName;
  zoom?: number;
  center?: [number, number];
};

export type NavigationStateProp = NavigationState | null;

export type SetNavigationType = Dispatch<SetStateAction<NavigationStateProp>>;

export enum RegionName {
  tc = "Twin Cities",
  west = "West Metro",
  east = "East Metro",
  north = "North Metro",
  south = "South Metro",
}
export type RoutePhoto = {
  previewUrl: string;
  fullSizeUrl: string;
  title: string;
  source?: string;
  sourceUrl?: string;
};

export type Corridor = {
  id: number; // Internal
  DATA_TYPE: FeatureType; // Reference Mapbox tileset
  DATA_CORRIDOR: FeatureCorridorNames; // Reference Mapbox tileset
  DATA_CORRIDOR_PAIRED?: FeatureCorridorNames;
  DATA_CORRIDOR_SHARED?: FeatureCorridorNames;
  yearStart?: number | null;
  yearEnd?: number | null;
  routeName?: string;
  routeNumber?: string;
  terminus?: string;
  description?: string;
  mainColor?: string;
  sources?: string;
  photos?: Array<RoutePhoto>;
  overlapIndex?: number | null;
  mainCity?: string;
  operators?: string;
};

export type YearRange = [number | null, number | null];

export type GenericObjectMap = {
  [key: string]: string;
};

export type CorridorNameMap = {
  [key: string]: FeatureCorridorNames | Array<FeatureCorridorNames>;
};

export interface IPropsHeader {
  navigation: NavigationStateProp;
  setSiteNavigation: (nav: NavigationStateProp) => void;
}

export interface IPropsInfoBox {
  navigation?: NavigationStateProp | null;
  corridors?: Array<Corridor> | null;
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
  selectedType: TransitTypes | null;
  setSelectedType: Dispatch<SetStateAction<TransitTypes | null>>;
}

export interface IPropsMapViewer {
  navigation?: NavigationStateProp;
  corridors?: Array<Corridor> | null;
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
  selectedType: TransitTypes | null;
  setSelectedType: Dispatch<SetStateAction<TransitTypes | null>>;
  geoJSON: AppFeatureCollection | null;
  setGeoJSON: Dispatch<SetStateAction<AppFeatureCollection | null>>;
}

export interface IPropsCorridorInfo {
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
}

export type SetSelectedType = Dispatch<SetStateAction<TransitTypes | null>>;

export type FeatureType =
  | "Streetcar"
  | "Bus"
  | "Ferry"
  | "Horsecar"
  | "Steam Power"
  | "Train"
  | "Freight";

export type FeatureCorridorNames =
  | "25TH_ST_E_STREETCAR"
  | "28TH_AVE_34TH_AVE_STREETCAR"
  | "28TH_AVE_STREETCAR"
  | "2ND_ST_NE_BUS"
  | "2ND_ST_NE_STREETCAR"
  | "34TH_AVE_STREETCAR"
  | "38TH_ST_BUS"
  | "4TH_AVE_STREETCAR"
  | "50TH_ST_BUS"
  | "6TH_AVE_N_STREETCAR"
  | "AIRPORT_BUS"
  | "ANOKA_STREETCAR"
  | "BLOOMINGTON_AVE_STREETCAR"
  | "BROADWAY_STREETCAR"
  | "BROOKSIDE_HOPKINS_BUS"
  | "BRYANT_AVE_S_STREETCAR"
  | "BRYN_MAUR_STREETCAR"
  | "BRYN_MAWR_NW_TERMINAL_BUS"
  | "CABLE_CAR_CABLE_CAR"
  | "CHEROKEE_STREETCAR"
  | "CHICAGO_AVE_BUS"
  | "CHICAGO_AVE_STREETCAR"
  | "COLUMBIA_HEIGHTS_STREETCAR"
  | "COMO_HARRIET_OAK_XER_STREETCAR"
  | "COMO_HARRIET_STREETCAR"
  | "COMO_HOPKINS_STREETCAR"
  | "DALE_HOYT_BUS"
  | "DALE_ST_STREETCAR"
  | "DAN_PATCH_TRAIN"
  | "DEEPHAVEN_STREETCAR"
  | "EXCELSIOR_FERRY"
  | "EXCELSIOR_TONKA_BAY_STREETCAR"
  | "E_6TH_ST_BUS"
  | "FERRY_FERRY"
  | "FERRY_FREIGHT"
  | "FORT_SNELLING_STREETCAR"
  | "FRANKLIN_AVE_N_LYNDALE_BUS"
  | "FRANKLIN_N_LYNDALE_BUS"
  | "FRANKLIN_STREETCAR"
  | "GLENWOOD_AVE_STREETCAR"
  | "GRAND_AVE_STREETCAR"
  | "GRAND_AVE_S_STREETCAR"
  | "HAMLINE_STREETCAR"
  | "HAZEL_PARK_STREETCAR"
  | "HENNEPIN_FRANCE_BUS"
  | "HIGHLAND_PARK_CLEVELAND_BUS"
  | "HOPE_STREETCAR"
  | "HOPKINS_STREETCAR"
  | "HORSECAR_HORSECAR"
  | "HUMBOLDT_AVE_BUS"
  | "JACKSON_ROBERT_ST_BUS"
  | "JACKSON_ST_STREETCAR"
  | "JOHNSON_ST_NE_STREETCAR"
  | "KENWOOD_SLP_RUSSELL_BUS"
  | "KENWOOD_STLOUISPARK_STREETCAR"
  | "KENWOOD_STREETCAR"
  | "LOWRY_AVE_BUS"
  | "MARIA_STREETCAR"
  | "MINNEHAHA_STREETCAR"
  | "MISSISSIPPI_ST_STREETCAR"
  | "MONROE_ST_NE_STREETCAR"
  | "MPLS_ST_PAUL_EXPRESS_BUS"
  | "NICOLLET_HENNEPIN_BUS"
  | "NICOLLET_STREETCAR"
  | "NW_TERMINAL_STREETCAR"
  | "N_SAINT_PAUL_STREETCAR"
  | "OAK_HARRIET_STREETCAR"
  | "PAYNE_AVE_STREETCAR"
  | "PENN_AVE_S_BUS"
  | "PENN_FREMONT_STREETCAR"
  | "PHALEN_STREETCAR"
  | "PLYMOUTH_AVE_STREETCAR"
  | "RANDOLPH_STREETCAR"
  | "RICE_ST_PAYNE_AVE_BUS"
  | "RICE_ST_STREETCAR"
  | "ROBBINSDALE_STREETCAR"
  | "ROBERT_ST_STREETCAR"
  | "RONDO_STREETCAR"
  | "RONDO_STRYKER_BUS"
  | "SAINT_CLAIR_STREETCAR"
  | "SELBY_LAKE_STREETCAR"
  | "SHARED__NICOLLET_NW_TERMINAL_STREETCAR"
  | "SNELLING_AVE_STREETCAR"
  | "SOUTH_ST_PAUL_HASTINGS_STREETCAR"
  | "SOUTH_ST_PAUL_STREETCAR"
  | "STEAM_POWER_STEAM_POWER"
  | "STILLWATER_EXTENSION_STREETCAR"
  | "STILLWATER_STREETCAR_STREETCAR"
  | "STPAUL_MINNEAPOLIS_STREETCAR"
  | "STRYKER_AVE_STREETCAR"
  | "ST_PAUL_AIRPORT_BUS"
  | "U_OF_M_TRANSITWAY_STREETCAR"
  | "WASHINGTON_AVE_N_STREETCAR"
  | "WESTERN_AVE_BUS"
  | "WESTERN_STREETCAR"
  | "WHITE_BEAR_BUS"
  | "WHITE_BEAR_LAKE_STREETCAR"
  | "WILDHURST_FERRY"
  | "W_39TH_ST_BUS";

//////////

// export enum AppState {
//   Setup = "Setup",
//   Start = "Start",
//   End = "End",
//   Open = "Open", // blocking and pathing time
// }

// export enum CellType {
//   Start = "Start",
//   End = "End",
//   Open = "Open",
//   Passed = "Passed",
//   Blocked = "Blocked",
// }

// export type OnCellClick = (cell: CellStatus) => void;

// export interface GridForm {
//   rows: number;
//   columns: number;
// }

// export type CellIndex = number;
// export interface CellStatus {
//   x: number | null;
//   y: number | null;
//   type: CellType;
//   index: CellIndex; // location in main array
//   boundaryLeft: boolean;
//   boundaryRight: boolean;
//   boundaryTop: boolean;
//   boundaryBottom: boolean;
// }

// export type CellGrid = Array<Array<CellStatus>>;

// // Pathfinder Types

// export enum Direction {
//   Up = "Up",
//   Down = "Down",
//   Left = "Left",
//   Right = "Right",
// }
// export interface PathCell {
//   cellIndex: CellIndex; // location in main array
//   result: PathSearchResult; // help determine if we've reached the end of a path
//   prevDirection: Direction; // help UI draw arrows
//   nextDirection: Direction; // help UI draw arrows
// }
// export type Path = Array<PathCell>;
// export type PathsThroughMatrix = Array<Path>;
// export type MatrixGrid = Array<Array<MatrixCell>>;

// export interface MatrixCell {
//   cellIndex: CellIndex;
//   type: CellType;
// }

// export interface QueueCell extends MatrixCell {
//   y: number;
//   x: number;
//   path: Path;
//   prevDirection: Direction; // Gets passed into PathCell later
//   nextDirection: Direction; // Gets passed into PathCell later
// }

// export enum PathSearchResult {
//   Reached = "Reached",
//   Blocked = "Blocked",
//   Passed = "Passed",
// }

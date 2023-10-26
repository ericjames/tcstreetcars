import { Dispatch, SetStateAction } from "react";

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
  showPage?: string;
  types?: Array<TransitTypes>;
  region?: RegionName;
  zoom?: number;
  center?: [number, number];
};

export type NavigationStateProp = NavigationState | undefined | null;

export enum RegionName {
  tc = "Twin Cities",
  west = "West Metro",
  east = "East Metro",
  north = "North Metro",
  south = "South Metro",
}
export type RoutePhoto = {
  previewUrl?: string;
  fullSizeUrl?: string;
  name?: string;
  source?: string;
  sourceUrl?: string;
};

export type Corridor = {
  id: number; // Internal
  DATA_CORRIDOR: string; // Reference Mapbox tileset
  DATA_TYPE: string; // Reference Mapbox tileset
  DATA_THROUGHROUTE?: string;
  DATA_CORRIDOR_SHARED?: string;
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
export interface IPropsHeader {
  navigation: NavigationStateProp;
  setNavigation: Dispatch<SetStateAction<NavigationStateProp>>;
}

export interface IPropsInfoBox {
  navigation?: NavigationStateProp;
  corridors?: Array<Corridor>;
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
  selectedType: TransitTypes | null;
  setSelectedType: Dispatch<SetStateAction<TransitTypes | null>>;
}

export interface IPropsMapViewer {
  navigation?: NavigationStateProp;
  corridors?: Array<Corridor>;
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
  selectedType: TransitTypes | null;
  setSelectedType: Dispatch<SetStateAction<TransitTypes | null>>;
}

export interface IPropsCorridorInfo {
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
}

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

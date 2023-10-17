export interface RoutePhoto {
  previewUrl?: string;
  fullSizeUrl?: string;
  name?: string;
  source?: string;
  sourceUrl?: string;
}

export interface Corridor {
  id: number;
  corridorName: string;
  terminus: string;
  type: string;
  description: string;
  routeName: string;
  mainColor: string;
  yearStart: number | null;
  yearEnd: number | null;
  source: string;
  photos: Array<RoutePhoto>;
  offset?: boolean;
}

export enum AppState {
  Setup = "Setup",
  Start = "Start",
  End = "End",
  Open = "Open", // blocking and pathing time
}

export enum CellType {
  Start = "Start",
  End = "End",
  Open = "Open",
  Passed = "Passed",
  Blocked = "Blocked",
}

export type OnCellClick = (cell: CellStatus) => void;

export interface GridForm {
  rows: number;
  columns: number;
}

export type CellIndex = number;
export interface CellStatus {
  x: number | null;
  y: number | null;
  type: CellType;
  index: CellIndex; // location in main array
  boundaryLeft: boolean;
  boundaryRight: boolean;
  boundaryTop: boolean;
  boundaryBottom: boolean;
}

export type CellGrid = Array<Array<CellStatus>>;

// Pathfinder Types

export enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}
export interface PathCell {
  cellIndex: CellIndex; // location in main array
  result: PathSearchResult; // help determine if we've reached the end of a path
  prevDirection: Direction; // help UI draw arrows
  nextDirection: Direction; // help UI draw arrows
}
export type Path = Array<PathCell>;
export type PathsThroughMatrix = Array<Path>;
export type MatrixGrid = Array<Array<MatrixCell>>;

export interface MatrixCell {
  cellIndex: CellIndex;
  type: CellType;
}

export interface QueueCell extends MatrixCell {
  y: number;
  x: number;
  path: Path;
  prevDirection: Direction; // Gets passed into PathCell later
  nextDirection: Direction; // Gets passed into PathCell later
}

export enum PathSearchResult {
  Reached = "Reached",
  Blocked = "Blocked",
  Passed = "Passed",
}

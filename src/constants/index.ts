import { NavigationState, RegionName, TransitTypes } from "./types";
import { TC_CENTER, TC_ZOOM, WESTMETRO_CENTER, WESTMETRO_ZOOM } from "./mapbox";

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

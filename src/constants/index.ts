import { NavigationState, RegionName, TransitTypes } from "./types";

export const NAVIGATION: Array<NavigationState> = [
  {
    title: "About",
    showPage: "About",
  },
  {
    title: RegionName.tc,
    types: [TransitTypes.STREETCAR, TransitTypes.HORSECAR, TransitTypes.BUS],
  },
  {
    title: RegionName.west,
    types: [
      TransitTypes.FERRY,
      TransitTypes.STEAMPOWER,
      TransitTypes.STREETCAR,
      TransitTypes.BUS,
    ],
  },
  {
    title: RegionName.east,
    types: [TransitTypes.STEAMPOWER, TransitTypes.STREETCAR, TransitTypes.BUS],
  },
  {
    title: RegionName.north,
    types: [TransitTypes.STREETCAR, TransitTypes.BUS],
  },
  {
    title: RegionName.south,
    types: [TransitTypes.STREETCAR, TransitTypes.BUS],
  },
];

import { Route } from "./types";

export const mockRoute1: Route = {
  routeNumber: "5",
  routeName: "Lowry Ave",
  mainColor: "#ff00ff",
  info: "The 5 ran from North Mpls to Northeast Mpls for decades.",
  photos: [
    { previewUrl: "", name: "Photo 1", source: "MNHS" },
    { previewUrl: "", name: "Photo 2", source: "MNHS" },
    { previewUrl: "", name: "Photo 3", source: "MNHS" },
  ]
}

export const mockRoute2: Route = {
  routeNumber: "10",
  routeName: "Hennepin Ave",
  mainColor: "#00ff00",
  info: "The 10 ran from Uptown to South.",
  photos: [
    { previewUrl: "", name: "Photo 1", source: "MNHS" },
    { previewUrl: "", name: "Photo 2", source: "MNHS" },
    { previewUrl: "", name: "Photo 3", source: "MNHS" },
  ]
}
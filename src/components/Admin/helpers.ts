import {
  SnapDirectSelect,
  SnapLineMode,
  SnapPointMode,
  SnapPolygonMode,
} from "mapbox-gl-draw-snap-mode";

import CutLineMode from "mapbox-gl-draw-cut-line-mode";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

export const mapStyles = [
  // line stroke
  {
    id: "gl-draw-line-static",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "false"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-dasharray": [0.2, 2],
      "line-width": 4,
    },
  },
  // ACTIVE (being drawn)
  // line stroke
  {
    id: "gl-draw-line-active",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#0088ff",
      "line-dasharray": [0.2, 1.5],
      "line-width": 10,
    },
  },
  // polygon fill
  {
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "active", "false"]],
    paint: {
      "fill-color": "#D20C0C",
      "fill-outline-color": "#D20C0C",
      "fill-opacity": 0.1,
    },
  },
  // polygon mid points
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b",
    },
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "active", "true"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#D20C0C",
      "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
  // vertex point halos
  {
    id: "gl-draw-polygon-and-line-vertex-halo-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["==", "active", "true"],
    ],
    paint: {
      "circle-radius": 12,
      "circle-color": "#000",
    },
  },
  // vertex points
  {
    id: "gl-draw-polygon-and-line-vertex-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["==", "active", "true"],
    ],
    paint: {
      "circle-radius": 8,
      "circle-color": "#00ffff",
    },
  },
  {
    id: "gl-draw-polygon-and-line-vertex-halo-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["==", "active", "false"],
    ],
    paint: {
      "circle-radius": 6,
      "circle-color": "#000",
    },
  },
  {
    id: "gl-draw-polygon-and-line-vertex-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["==", "active", "false"],
    ],
    paint: {
      "circle-radius": 4,
      "circle-color": "#00ffff",
    },
  },

  // INACTIVE (static, already drawn)

  // polygon fill
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "active", "true"]],
    paint: {
      "fill-color": "#000",
      "fill-outline-color": "#000",
      "fill-opacity": 0.1,
    },
  },
  // polygon outline
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "active", "true"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  },
];

export const getCutButtonClass = (componentRef: any) => {
  return class CutButton {
    onAdd(map: any) {
      const div = document.createElement("div");
      div.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
      div.innerHTML = `<button>CUT</button>`;
      div.addEventListener("contextmenu", (e) => e.preventDefault());
      div.addEventListener("click", (e) => {
        const dom: any = e.target;
        const comp = componentRef.current.mapboxDraw as any;
        if (comp.getMode() === "cut_line") {
          comp.changeMode("simple_select");
          dom.className = "";
          comp.cut = false;
        } else {
          comp.changeMode("cut_line");
          dom.className = "bg-selected";
          comp.cut = true;
        }
      });

      return div;
    }
    onRemove() {}
  };
};

export const getMapOptions = () => {
  return {
    styles: mapStyles,
    modes: {
      ...MapboxDraw.modes,
      cut_line: CutLineMode,
      draw_point: SnapPointMode,
      draw_polygon: SnapPolygonMode,
      draw_line_string: SnapLineMode,
      direct_select: SnapDirectSelect,
    },
    snap: true,
    snapOptions: {
      snapPx: 15, // defaults to 15
      snapToMidPoints: true, // defaults to false
      snapVertexPriorityDistance: 0.0025, // defaults to 1.25
    },
  };
};

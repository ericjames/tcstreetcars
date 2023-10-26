import {
  AllowedGeometryTypes,
  AppGeometryFeature,
} from "../../constants/types";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { GeoJSONSource, MapboxGeoJSONFeature } from "mapbox-gl";
import { SOURCE_ID, SOURCE_LAYER_NAME } from "../../constants/mapbox";
import {
  SnapDirectSelect,
  SnapLineMode,
  SnapModeDrawStyles,
  SnapPointMode,
  SnapPolygonMode,
} from "mapbox-gl-draw-snap-mode";

import CutLineMode from "mapbox-gl-draw-cut-line-mode";
import { FeatureCollection } from "geojson";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

interface IProps {
  map: mapboxgl.Map | undefined;
  feature?: AppGeometryFeature | undefined;
  setFeature?: Dispatch<SetStateAction<AppGeometryFeature | null>>;
  geoJSON?: any;
  setGeoJSON?: any;
  selectedCorridor?: any;
}

const MapEditor: FC<IProps> = ({
  map,
  geoJSON,
  setGeoJSON,
  selectedCorridor,
}) => {
  const [editableFeature, setEditableFeature] =
    useState<AppGeometryFeature | null>(null);
  const componentRef = useRef<any>({ mapboxDraw: null });

  const exportData = (data: object) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "DATA_FEATURE_COLLECTION.json";

    link.click();
  };

  const updateFeatureProps = () => {
    if (map) {
      const updatedFeatures = geoJSON.features?.map(
        (feature: any, i: number) => {
          const newFeature =
            feature?.id === editableFeature?.id ? editableFeature : feature;
          return { ...newFeature, id: i + 1 };
        }
      );
      // console.log("updatedFeatures", updatedFeatures);
      setGeoJSON({ ...geoJSON, features: updatedFeatures });

      // const source = map.getSource(SOURCE_ID) as GeoJSONSource;
      // source.setData({ ...geoJSON, features: updatedFeatures });
    }
  };

  const onExportButtonClick = () => {
    exportData(geoJSON);
  };

  useEffect(() => {
    if (map) {
      const options: any = {
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

      class CutButton {
        onAdd(map: any) {
          const div = document.createElement("div");
          div.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
          div.innerHTML = `<button>CUT</button>`;
          div.addEventListener("contextmenu", (e) => e.preventDefault());
          div.addEventListener("click", (e) => {
            const dom: any = e.target;
            mapboxDraw.changeMode("cut_line");
            if (componentRef.current.cut) {
              dom.className = "";
              componentRef.current.cut = false;
              mapboxDraw.changeMode("simple_select");
            } else {
              dom.className = "bg-selected";
              componentRef.current.cut = true;
              mapboxDraw.changeMode("cut_line");
            }
          });

          return div;
        }
        onRemove() {}
      }
      const cutButton = new CutButton();

      const mapboxDraw = new MapboxDraw(options);
      componentRef.current.mapboxDraw = mapboxDraw;

      map.on("load", () => {
        map.addControl(mapboxDraw, "top-left");
        map.addControl(cutButton, "top-left");

        geoJSON.features.forEach((feature: any) => {
          componentRef.current.mapboxDraw.add(feature);
        });

        const updateArea = (e: any) => {
          const featureCollection = mapboxDraw.getAll();
          console.log("Draw update", featureCollection);
          // const merged = { ...geoJSON };
          // featureCollection.features.forEach((feature: any) => {
          //   merged.features.forEach((mergeFeature: any) => {
          //     if (feature.id === mergeFeature.id) {
          //       mergeFeature = { ...feature };
          //     }
          //   });
          // });
          setGeoJSON(featureCollection);
        };

        map.on("draw.create", updateArea);
        map.on("draw.delete", updateArea);
        map.on("draw.update", updateArea);
        map.on("click", () => {
          const featureCollection = mapboxDraw.getSelected();
          if (featureCollection?.features[0]) {
            console.log(featureCollection?.features[0]);
            const feature = featureCollection?.features[0];

            const geometry = feature.geometry as {
              type: AllowedGeometryTypes;
              coordinates: Array<any>;
            };
            setEditableFeature({
              id: feature?.id || 9999,
              type: feature?.type,
              properties: feature?.properties,
              geometry: {
                type: geometry.type,
                coordinates: geometry?.coordinates || null,
              },
            });
          }
        });
      });

      return () => {
        map.removeControl(mapboxDraw);
        map.removeControl(cutButton);
        geoJSON.features.forEach((feature: any) => {
          componentRef.current.mapboxDraw.delete(feature);
        });
        componentRef.current.mapboxDraw = null;
      };
    }
  }, [map]);

  useEffect(() => {
    if (selectedCorridor) {
      geoJSON.features.forEach((feature: any) => {
        if (feature.properties.CORRIDOR === selectedCorridor.DATA_CORRIDOR) {
          componentRef.current.mapboxDraw.add(feature);
        }
      });
    }
  }, [selectedCorridor]);

  return (
    <div
      className="position-absolute bg-light"
      style={{
        width: 300,
        overflow: "scroll",
        height: 400,
        right: 0,
        top: 50,
        zIndex: 10,
        border: "1px solid #888",
      }}>
      <b>Editor</b>
      {editableFeature &&
        Object.entries(editableFeature).map(([key, value], i) => (
          <div key={i}>
            {key}:{" "}
            {typeof value === "string" || typeof value === "number" ? (
              <input
                type="text"
                className="w-100"
                value={`${value}` || ""}
                onChange={(e) => {
                  const newFeature: any = { ...editableFeature };
                  newFeature[key] = e.target.value;
                  setEditableFeature(newFeature);
                }}></input>
            ) : typeof value === "object" ? (
              <textarea
                className="w-100"
                onChange={(e) => {
                  const newFeature: any = { ...editableFeature };
                  newFeature[key] = JSON.parse(e.target.value);
                  setEditableFeature(newFeature);
                }}
                value={JSON.stringify(value)}></textarea>
            ) : (
              <></>
            )}
          </div>
        ))}
      <br />
      <button onClick={updateFeatureProps}>Update Feature Properties</button>
      <br />
      <button onClick={onExportButtonClick}>Download All</button>
    </div>
  );
};

export default MapEditor;

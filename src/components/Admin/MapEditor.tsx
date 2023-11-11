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
import {
  FeatureIdentifier,
  GeoJSONSource,
  MapboxGeoJSONFeature,
} from "mapbox-gl";
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
import styled from "styled-components";

const Wrapper = styled.div`
  > div {
    min-height: 200px;
  }
`;

interface IProps {
  map: mapboxgl.Map | undefined;
  geoJSON: any;
  setGeoJSON: any;
  selectedCorridor: any;
}

const MapEditor: FC<IProps> = ({
  map,
  geoJSON,
  setGeoJSON,
  selectedCorridor,
}) => {
  const [editableFeature, setEditableFeature] =
    useState<AppGeometryFeature | null>(null);
  const [hasError, setHasError] = useState(false);
  const componentRef = useRef<{ mapboxDraw: MapboxDraw | null }>({
    mapboxDraw: null,
  });

  const exportData = (data: object) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "DATA_FEATURE_COLLECTION.json";

    link.click();
  };

  const updateGeoJSON = () => {
    const updatedFeatureCollection =
      componentRef?.current?.mapboxDraw?.getAll();

    if (updatedFeatureCollection) {
      const newJson = {
        ...geoJSON,
        features: [...geoJSON.features, ...updatedFeatureCollection.features],
      };
      console.log("newJson", newJson);
      setGeoJSON(newJson);
    }
  };

  const updateFeatureProps = () => {
    if (map) {
      try {
        if (editableFeature) {
          const feats = componentRef?.current?.mapboxDraw?.getSelected();
          console.log("getSelected", feats);

          Object.entries(editableFeature).forEach(([key, value]) => {
            componentRef?.current?.mapboxDraw?.setFeatureProperty(
              `${editableFeature.id}`,
              key,
              value
            );
          });

          const feature = componentRef?.current?.mapboxDraw?.get(
            `${editableFeature.id}`
          );
          console.log("newfeature", feature);
          if (feature) {
            componentRef?.current?.mapboxDraw?.add(feature);
          }

          setHasError(false);
          updateGeoJSON();
          return;
        }
      } catch (e) {
        setHasError(true);
      }

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
            if (componentRef.current.mapboxDraw) {
              dom.className = "";
              // componentRef.current.mapboxDraw?.cut = false;
              mapboxDraw.changeMode("simple_select");
            } else {
              dom.className = "bg-selected";
              // componentRef.current.mapboxDraw?.cut = true;
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
          if (feature.id === 131) {
            componentRef?.current?.mapboxDraw?.add(feature);
          }
        });

        // eslint-disable-next-line
        const window2 = window as any;
        window2._mapboxDraw = mapboxDraw;

        const updateArea = (e: any) => {
          console.log("UPDATEAREA");
          updateGeoJSON();
        };

        map.on("draw.create", updateArea);
        map.on("draw.delete", updateArea);
        map.on("draw.update", updateArea);
        map.on("click", () => {
          const featureCollection = mapboxDraw.getSelected();
          if (featureCollection?.features[0]) {
            const feature = featureCollection?.features[0];

            const geometry = feature.geometry as {
              type: AllowedGeometryTypes;
              coordinates: Array<any>;
            };
            setEditableFeature({
              id: `${feature?.id}`,
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
        if (componentRef.current.mapboxDraw) {
          geoJSON.features.forEach((feature: any) => {
            componentRef?.current?.mapboxDraw?.delete(feature);
          });
        }
        componentRef.current.mapboxDraw = null;
      };
    }
  }, [map]);

  // useEffect(() => {
  //   if (selectedCorridor) {
  //     geoJSON.features.forEach((feature: any) => {
  //       if (feature.properties.CORRIDOR === selectedCorridor.DATA_CORRIDOR) {
  //         componentRef?.current?.mapboxDraw?.add(feature);
  //       }
  //     });
  //   }
  // }, [selectedCorridor]);

  const getFields = (valueObj: any) => {
    return Object.entries(valueObj).map(([key, value]) => {
      return (
        <div className="mb-2">
          {key}
          <input
            type="text"
            className="w-100"
            value={`${value}` || ""}
            onChange={(e) => {
              const newFeature: any = { ...editableFeature };
              newFeature[key] = e.target.value;
              setEditableFeature(newFeature);
            }}></input>
        </div>
      );
    });
  };

  return (
    <Wrapper
      className="position-absolute bg-light"
      style={{
        width: 300,
        overflow: "scroll",
        height: "80vh",
        right: 0,
        top: 50,
        zIndex: 10,
        border: "1px solid #888",
        padding: 20,
      }}>
      <b>Editor</b>
      <div>
        {editableFeature &&
          Object.entries(editableFeature).map(([key, value], i) => (
            <div key={i}>
              {key}:{" "}
              {typeof value === "string" || typeof value === "number" ? (
                <input
                  type="text"
                  className="w-100"
                  value={`${value}` || ""}
                  disabled={key !== "properties"}
                  onChange={(e) => {
                    const newFeature: any = { ...editableFeature };
                    newFeature[key] = e.target.value;
                    setEditableFeature(newFeature);
                  }}></input>
              ) : typeof value === "object" ? (
                getFields(value)
              ) : (
                <></>
              )}
            </div>
          ))}
      </div>
      <br />
      <button
        className={`btn btn-outline-dark ${hasError ? "btn-danger" : ""}`}
        onClick={updateFeatureProps}>
        Update Feature Props
      </button>
      <br />
      <button
        className={`btn btn-outline-dark`}
        onClick={onExportButtonClick}>
        Download GEOJSON
      </button>
    </Wrapper>
  );
};

export default MapEditor;

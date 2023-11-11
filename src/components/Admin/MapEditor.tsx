import {
  AllowedGeometryTypes,
  AppGeometryFeature,
  FeatureType,
} from "../../constants/types";
import { FC, useEffect, useRef, useState } from "react";
import { getCutButtonClass, getMapOptions, mapStyles } from "./helpers";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { exportFile } from "./admin";
import styled from "styled-components";

const Wrapper = styled.div`
  > div {
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
  const [needSave, setNeedSave] = useState(false);
  const [chooseFeatures, setChooseFeatures] =
    useState<Array<AppGeometryFeature> | null>(null);
  const componentRef = useRef<{ mapboxDraw: MapboxDraw | null }>({
    mapboxDraw: null,
  });

  // useEffect(() => {
  //   console.log("change");
  // }, [editableFeature]);

  const exportData = (data: object) => {
    exportFile(data, "DATA_FEATURE_COLLECTION.json");
  };

  const updateGeoJSON = () => {
    const mapboxDrawFeatureCollection =
      componentRef?.current?.mapboxDraw?.getAll();

    if (mapboxDrawFeatureCollection) {
      // Find and replace in the existing json
      // mapboxDraw returns tons of virtual elements and trash

      const newJSON = { ...geoJSON };
      newJSON.features.forEach((feature: any, i: number) => {
        const newFeature = mapboxDrawFeatureCollection.features.find(
          (mdFeature) => `${mdFeature.id}` === `${feature.id}`
        );
        if (newFeature) {
          console.log("update feature", newFeature);
          newJSON.features[i] = { ...newFeature };
        }
      });
      console.log("updateGeoJSON", newJSON);
      setGeoJSON(newJSON);
    }
  };

  const updateFeatureProps = () => {
    if (map) {
      try {
        if (editableFeature && componentRef.current.mapboxDraw !== null) {
          const mapboxDraw = componentRef.current.mapboxDraw;

          const featureCollection = mapboxDraw.getSelected();
          const drawFeature = featureCollection?.features[0];

          const editedProperties = editableFeature.properties;

          // console.log("editedProperties", editedProperties);

          Object.entries(editedProperties).forEach(([key, value]) => {
            mapboxDraw.setFeatureProperty(`${editableFeature.id}`, key, value);
          });

          const feature = mapboxDraw.get(`${editableFeature.id}`);
          // console.log("To Be Added", feature);
          if (feature) {
            mapboxDraw.add(feature);
          }

          setHasError(false);
          updateGeoJSON();
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
      const mapboxDraw = new MapboxDraw(getMapOptions());
      componentRef.current.mapboxDraw = mapboxDraw;

      // eslint-disable-next-line
      const window2 = window as any;
      window2._mapboxDraw = mapboxDraw;

      const cutButtonClass = getCutButtonClass(mapboxDraw);
      const cutButton = new cutButtonClass();

      map.on("load", () => {
        map.addControl(mapboxDraw, "top-left");
        map.addControl(cutButton, "top-left");

        geoJSON.features.forEach((feature: any) => {
          if (feature.id === 131) {
            componentRef?.current?.mapboxDraw?.add(feature);
          }
        });

        const updateArea = (e: any) => {
          // console.log("UPDATEAREA", e);
          updateGeoJSON();
        };

        map.on("draw.create", updateArea);
        map.on("draw.delete", updateArea);
        map.on("draw.update", updateArea);
        map.on("click", (e) => {
          const features = mapboxDraw.getFeatureIdsAt(e.point);
          const decide = features.map((id) =>
            mapboxDraw.get(id)
          ) as Array<AppGeometryFeature>;
          setChooseFeatures(decide);

          if (features.length === 1) {
            selectFeatureForEditing(
              mapboxDraw.get(features[0]) as AppGeometryFeature
            );
          }
        });
      });

      return () => {
        if (map) {
          map.on("remove", () => {
            if (componentRef.current.mapboxDraw) {
              componentRef.current.mapboxDraw.deleteAll();
              map.removeControl(componentRef.current.mapboxDraw);
              map.removeControl(cutButton);
              componentRef.current.mapboxDraw = null;
            }
          });
        }
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

  const selectFeatureForEditing = (feature: AppGeometryFeature) => {
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
  };

  const getSubFields = (key: string, valueObj: any) => {
    return (
      <div className="flex-fill">
        {Object.entries(valueObj).map(([subKey, subValue]) => {
          return (
            <div
              className="mb-2 d-flex gap-1 align-items-center"
              key={subKey}>
              <label>{subKey}</label>
              <input
                type="text"
                disabled={key !== "properties"}
                className="w-100 input"
                value={`${subValue}` || ""}
                onChange={(e) => {
                  const newFeature: any = { ...editableFeature };

                  // console.log("UPDATE", e.target.value);
                  newFeature[key][subKey] = e.target.value;
                  setEditableFeature(newFeature);
                }}></input>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Wrapper
      className="position-absolute bg-light"
      style={{
        width: 350,
        overflow: "scroll",
        height: "80vh",
        right: 0,
        top: 50,
        zIndex: 10,
        border: "1px solid #888",
        padding: 20,
      }}>
      <h4>Clicked Features</h4>
      <div className="mt-2 btn-group">
        {chooseFeatures &&
          chooseFeatures?.map((feature) => (
            <button
              className="btn btn-small btn-gray w-100 text-nowrap"
              onClick={() => selectFeatureForEditing(feature)}>
              {feature?.id} {feature?.properties?.TYPE}{" "}
              {feature?.properties?.CORRIDOR}
            </button>
          ))}
      </div>
      <div className="mt-2">
        <h4>Editor</h4>
        {editableFeature &&
          Object.entries(editableFeature).map(([key, value], i) =>
            typeof value === "string" || typeof value === "number" ? (
              <div
                key={i}
                className="d-flex gap-1 align-items-center text-gray">
                <label>{key}</label>
                <input
                  type="text"
                  className="w-100 text-gray"
                  value={`${value}` || ""}
                  disabled={key !== "properties"}
                  onChange={(e) => {
                    const newFeature: any = { ...editableFeature };
                    newFeature[key] = e.target.value;
                    setEditableFeature(newFeature);
                  }}></input>
              </div>
            ) : typeof value === "object" ? (
              <div
                key={i}
                className="d-flex gap-1 align-items-center flex-wrap">
                <label className="text-gray">{key}</label>
                {getSubFields(key, value)}
              </div>
            ) : (
              <div key={i}></div>
            )
          )}
      </div>
      {editableFeature && (
        <button
          className={`btn w-100 btn-sm btn-outline-dark ${
            hasError ? "btn-danger" : ""
          }`}
          onClick={updateFeatureProps}>
          Update Feature Props
        </button>
      )}
      <button
        className={`btn w-100 btn-outline-dark mt-5`}
        onClick={onExportButtonClick}>
        Download GEOJSON
      </button>
    </Wrapper>
  );
};

export default MapEditor;

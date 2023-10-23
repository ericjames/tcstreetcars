import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { SOURCE_ID, SOURCE_LAYER_NAME } from "../../constants/mapbox";

import { FeatureCollection } from "geojson";
import { GeoJSONSource } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

interface IProps {
  map: mapboxgl.Map | undefined;
  feature?: any;
  setFeature?: Dispatch<SetStateAction<any | null>>;
  geoJSON?: any;
  setGeoJSON?: any;
  selectedCorridor?: any;
}

const MapEditor: FC<IProps> = ({
  map,
  feature,
  setFeature,
  geoJSON,
  setGeoJSON,
  selectedCorridor,
}) => {
  const [editableFeature, setEditableFeature] = useState<any | null>(null);
  const [mapboxDraw, setMapboxDraw] = useState<any | null>(null);

  useEffect(() => {
    if (feature) {
      setEditableFeature({
        id: feature?.id,
        type: feature?.type,
        properties: feature?.properties,
        geometry: feature?.geometry,
      });
    }
  }, [feature]);

  const exportData = (data: object) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

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
      const mapboxDraw = new MapboxDraw();
      map.addControl(mapboxDraw, "top-left");

      setMapboxDraw(mapboxDraw);
      map.on("load", () => {
        geoJSON.features.forEach((feature: any) => {
          mapboxDraw.add(feature);
        });
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
        if (setFeature && featureCollection?.features[0]) {
          setFeature(featureCollection?.features[0]);
        }
      });
    }
  }, [map]);

  useEffect(() => {
    if (selectedCorridor) {
      geoJSON.features.forEach((feature: any) => {
        if (feature.properties.CORRIDOR === selectedCorridor.DATA_CORRIDOR) {
          mapboxDraw.add(feature);
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

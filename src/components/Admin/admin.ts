import {
  AppFeatureCollection,
  AppGeometryFeature,
} from "../../constants/types";

import CORRIDOR_NAMES from "../../constants/CORRIDOR_NAMES.json";
import DATA_FEATURE_COLLECTION from "../../constants/DATA_FEATURE_COLLECTION.json";
import { JsonObjectExpression } from "typescript";
import { PHOTO_JSON } from "../../api-cache/photos";

export const exportFile = (jsonObject: any, fileName: string) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(jsonObject)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = fileName;
  link.click();
};

export const _collatePhotos = () => {
  const jsonArray: Array<any> = [];

  Object.values(PHOTO_JSON).forEach((file: any) => {
    jsonArray.push(...file.data);
  });
  console.log(jsonArray);
  // exportFile();
};

export const _generateNewIds = () => {
  const newFC = { ...DATA_FEATURE_COLLECTION };
  newFC.features.forEach((feature: any, i: any) => {
    const stop = feature.properties?.STOP_NAME
      ? feature.properties?.STOP_NAME[0].toLowerCase()
      : "";
    const f = newFC.features[i];
    f.id = 100 + i;
    f.properties.ID = `f${feature.properties.TYPE[0].toLowerCase()}${feature.properties?.CORRIDOR[0]?.toLowerCase()}${stop}${i}`;
  });
  console.log(newFC);
  // exportFile(fc, "DATA_FEATURE_COLLECTION.json");
};

// eslint-disable-next-line
export const _featureQuery = (fc: AppFeatureCollection) => {
  // Reduce data down
  let leftovers: any = {};
  const names: any = CORRIDOR_NAMES;
  fc.features.forEach((feature: AppGeometryFeature) => {
    if (feature.properties.TYPE === "Streetcar") {
      if (!feature.properties.YR_END1) console.log("OMG", feature);
      leftovers[feature.properties.YR_END1] = "";
    }
  });
  console.log(leftovers);
  // Get list of types
  // const corridorNameTypes: Array<string> = [];
  // fc.features.forEach((feature: AppGeometryFeature) => {
  //   if (corridorNameTypes.indexOf(feature?.properties?.CORRIDOR) === -1) {
  //     corridorNameTypes.push(feature?.properties?.CORRIDOR);
  //   }
  // });
  // console.log(corridorNameTypes.sort());

  // // Edit names
  // let col: any = {};
  // console.log("data");
  // fc.features.forEach((feature: AppGeometryFeature) => {
  //   const corridorNameType = `${feature?.properties?.CORRIDOR} ${feature?.properties?.TYPE}`;

  //   const transformedName = corridorNameType
  //     .toUpperCase()
  //     .replace("-", "")
  //     .replaceAll(" ", "_");
  //   feature.properties.CORRIDOR = transformedName;
  //   if (!col[corridorNameType]) {
  //     col[corridorNameType] = transformedName;
  //   }
  // });
  // console.log(col);
};

const window2 = window as any;
window2._admin = {
  _collatePhotos,
  _generateNewIds,
};

import {
  AppFeatureCollection,
  AppGeometryFeature,
} from "../../constants/types";

import CORRIDOR_NAMES from "../../constants/CORRIDOR_NAMES.json";

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

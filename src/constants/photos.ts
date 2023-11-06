import { FeatureCorridorNames, RoutePhoto } from "./types";

import { PHOTO_JSON } from "../api-cache/photos";

const getFullSizeLink = (msn: string) => {
  if (process.env.REACT_APP_MSN_FULLSIZE_LINK) {
    const scaler = 600; // pixels
    const dims = `${scaler},${scaler}`;

    // if (dimensions) {
    //   const size = dimensions.split(" x ");
    //   if (size.length === 2) {
    //     const width = parseFloat(size[0]);
    //     const height = parseFloat(size[1]);
    //     const ratio = width / height;
    //     if (ratio) {
    //       dims = `${600},${600 * ratio}`;
    //     }
    //   }
    // }
    // console.log(dims);

    return `${process.env.REACT_APP_MSN_FULLSIZE_LINK}/${msn}/full/${dims}/0/default.jpg`;
  }
  return "";
};

const getThumbLink = (msn: string) => {
  const id = msn.split(":")[1];
  if (id && process.env.REACT_APP_MSN_THUMB_LINK) {
    return `${process.env.REACT_APP_MSN_THUMB_LINK}/${id}`;
  }
  return "";
};

const sanitizeHTML = (json: any) => {
  return json?.data?.map((record: any) => {
    const attrs = record.attributes;
    for (const key in attrs) {
      const row = attrs[key];
      if (row.attributes) {
        row.attributes.value = row?.attributes?.value.replace(
          /<(\w|\/)*>/g,
          ""
        );
      }
    }
    return record;
  });
};

export const GET_PHOTO_JSON = async (
  corridorName: FeatureCorridorNames | undefined
) => {
  const importName = `P_${corridorName}`;
  if (corridorName && PHOTO_JSON[importName]) {
    const json = PHOTO_JSON[importName];
    const sanitizedJson = sanitizeHTML(json);
    // console.log(sanitizedJson);
    return sanitizedJson.map(
      (record: any): RoutePhoto => ({
        title: record?.attributes?.title,
        sourceLink: record?.links?.self,
        previewUrl: getThumbLink(record?.id),
        fullSizeUrl: getFullSizeLink(record?.id),
        description: record?.attributes?.description_ts?.attributes.value,
        date: record?.attributes?.dat_tesi?.attributes.value,
        source:
          record?.attributes?.contributing_organization_tesi?.attributes.value,
      })
    );
  }
  return null;
};

import { FeatureCorridorNames, RoutePhoto } from "./types";

import SECOND_ST_NE_STREETCAR from "../api-cache/photos/2ND_AVE_STREETCAR.json";

export const PHOTO_API = `https://collection.mndigital.org/catalog.json`;
export const PHOTO_OPTIONS: any = {
  op: "AND",
  all_fields: "",
  county: "Hennepin OR Ramsey",
  "f_inclusive[topic_ssim][]": "Transportation",
  "f_inclusive[type_ssi][]": "Moving+Image,Still+Image",
  sort: "score+desc,+dat_sort+desc,+title_sort+asc",
  search_field: "advanced",
  commit: "Search",
};

export const MSN_LINK = (msn: string) =>
  `https://cdm16022.contentdm.oclc.org/iiif/2/${msn}/0,0,10000,10000/800,/0/default.jpg`;

const ROUTE_TO_FILE: any = {
  "2ND_ST_NE_STREETCAR": SECOND_ST_NE_STREETCAR,
};

const sanitizeHTML = (json: any) => {
  return json?.data?.map((record: any) => {
    const attrs = record.attributes;
    for (const key in attrs) {
      const row = attrs[key];
      if (row.attributes) {
        row.attributes.value = row?.attributes?.value.replace(
          /\<(\w|\/)*\>/g,
          ""
        );
      }
    }
    return record;
  });
};

export const GET_PHOTO_JSON = (
  corridorName: FeatureCorridorNames | undefined
) => {
  if (corridorName && ROUTE_TO_FILE[corridorName]) {
    const json = ROUTE_TO_FILE[corridorName];

    const sanitizedJson = sanitizeHTML(json);

    return sanitizedJson.map(
      (record: any): RoutePhoto => ({
        title: record?.attributes?.title,
        sourceLink: record?.links?.self,
        previewUrl: MSN_LINK(record?.id),
        fullSizeUrl: MSN_LINK(record?.id),
        description: record?.attributes?.description_ts.attributes.value,
        date: record?.attributes?.dat_tesi.attributes.value,
        source:
          record?.attributes?.contributing_organization_tesi.attributes.value,
      })
    );
  }
  return null;
};

export const GET_PHOTOS_API = (options: any) => {
  const finalOptions = { ...PHOTO_OPTIONS, ...options };
  return fetch(PHOTO_API, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

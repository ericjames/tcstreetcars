import { Corridor, RoutePhoto } from "../../constants/types";
import React, { FC, useEffect, useState } from "react";

import { GET_PHOTO_JSON } from "../../constants/photos";
import PhotoGallery from "../PhotoGallery";
import PhotoViewer from "../PhotoGallery/PhotoViewer";
import styled from "styled-components";

const Wrapper = styled.div<{
  "data-hascorridor": boolean;
  "data-hasphoto": boolean;
}>`
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 100;
  bottom: ${(props) =>
    props["data-hascorridor"]
      ? "0"
      : props["data-hasphoto"]
      ? "100%"
      : "-250px"};
  height: ${(props) => (props["data-hasphoto"] ? "100%" : "200px")};
`;

const StyledPhotoGallery = styled.div`
  position: absolute;
  width: 100%;
  bottom: 2em;
  left: 0;
`;

type IProps = {
  corridor: Corridor | null;
  exitMethod: () => void;
  externalPhotoCallback?: (coordinate: mapboxgl.LngLatLike) => void;
};

const RouteInfoBox: FC<IProps> = ({
  corridor,
  exitMethod,
  externalPhotoCallback,
}) => {
  const [photos, setPhotos] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState<RoutePhoto | null>(null);

  const hasCorridor = corridor !== null;
  const hasSelectedPhoto = selectedPhoto !== null;

  useEffect(() => {
    GET_PHOTO_JSON(corridor?.DATA_CORRIDOR).then((response) => {
      if (response && response.length > 0) {
        setPhotos(response);
      }
    });
  }, [corridor]);

  const exitPhotoViewer = () => {
    setSelectedPhoto(null);
  };

  return (
    <Wrapper
      data-hascorridor={hasCorridor}
      data-hasphoto={hasSelectedPhoto}>
      <StyledPhotoGallery>
        <PhotoGallery
          photos={photos}
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        />
      </StyledPhotoGallery>
      <PhotoViewer
        photo={selectedPhoto}
        exitPhotoViewer={exitPhotoViewer}
      />
    </Wrapper>
  );
};

export default RouteInfoBox;

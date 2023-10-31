import React, { FC } from "react";
import { RoutePhoto, SetSelectedPhotoType } from "../../constants/types";

import Photo from "./Photo";
import styled from "styled-components";

const Wrapper = styled.div`
  transition: all ease-in 150ms;
`;

type IProps = {
  photos: Array<RoutePhoto> | null | undefined;
  selectedPhoto: RoutePhoto | null;
  setSelectedPhoto: SetSelectedPhotoType;
};

const PhotoGallery: FC<IProps> = ({
  photos,
  selectedPhoto,
  setSelectedPhoto,
}) => {
  return (
    <Wrapper
      className={`d-flex align-items-center gap-3 w-100 overflow-scroll p-3 ${
        selectedPhoto ? "opacity-0" : "opacity-100"
      }`}>
      {photos?.map((photo, i) => (
        <Photo
          key={i}
          photo={photo}
          isSelected={selectedPhoto && selectedPhoto === photo}
          setSelectedPhoto={setSelectedPhoto}
        />
      ))}
      {/* {!photos && (
        <>
          <Photo />
          <Photo />
          <Photo />
        </>
      )} */}
    </Wrapper>
  );
};

export default PhotoGallery;

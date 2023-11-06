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
  const limit = 6;
  return (
    <Wrapper
      className={`d-flex align-items-center gap-3 w-100 overflow-scroll p-3 ${
        selectedPhoto ? "opacity-0" : "opacity-100"
      }`}>
      {photos?.map(
        (photo, i) =>
          i < limit && (
            <Photo
              key={i}
              photo={i < limit ? photo : null}
              isSelected={selectedPhoto && selectedPhoto === photo}
              setSelectedPhoto={setSelectedPhoto}
            />
          )
      )}
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

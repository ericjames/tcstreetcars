import React, { FC } from "react";
import { RoutePhoto, SetSelectedPhotoType } from "../../constants/types";

import mapboxgl from "mapbox-gl";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 0 0 250px;
  height: 175px;
  border: 10px solid;
  box-shadow: 0 0.5em 1em #ccc;
  transition: all ease-in 50ms;
  &:hover {
    cursor: pointer;
    margin-top: -0.5em;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type IProps = {
  photo: RoutePhoto;
  isSelected: boolean | null;
  setSelectedPhoto: SetSelectedPhotoType;
};

const Photo: FC<IProps> = ({ photo = null, isSelected, setSelectedPhoto }) => {
  const onPhotoClick = () => {
    if (photo?.location) {
    }
    setSelectedPhoto(photo);
  };

  return (
    <Wrapper
      data-isselected={isSelected}
      className={`p-1 bg-picture border-white ${!photo ? "placeholder" : ""}`}
      onClick={onPhotoClick}>
      {photo ? (
        <img src={photo.previewUrl} />
      ) : (
        <div className="placeholder placeholder-glow"></div>
      )}
    </Wrapper>
  );
};

export default Photo;

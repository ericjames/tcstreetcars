import React, { FC, useEffect, useState } from "react";

import { RoutePhoto } from "../../constants/types";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 0 0 250px;
  height: 175px;
  border: 10px solid;
  box-shadow: 0 0.5em 1em #ccc;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type IProps = {
  photo?: RoutePhoto;
};

const clickPhoto = () => {};

const Photo: FC<IProps> = ({ photo }) => {
  return (
    <Wrapper
      className="p-1 bg-picture border-white"
      onClick={clickPhoto}>
      {photo ? <img src={photo.previewUrl} /> : <div className=""></div>}
    </Wrapper>
  );
};

export default Photo;

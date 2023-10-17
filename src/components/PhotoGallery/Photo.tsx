import React, { FC, useEffect, useState } from "react";

import { RoutePhoto } from "../../constants/types";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 0 1 250px;
  min-height: 150px;
  height: auto;
  border: 10px solid;
`;

type IProps = {
  photo?: RoutePhoto;
};

const Photo: FC<IProps> = ({ photo }) => {
  return (
    <Wrapper className="p-1 bg-picture border-white">
      {photo ? <img src={photo.previewUrl} /> : <div className=""></div>}
    </Wrapper>
  );
};

export default Photo;

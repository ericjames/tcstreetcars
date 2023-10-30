import React, { FC } from "react";

import Photo from "./Photo";
import { RoutePhoto } from "../../constants/types";
import styled from "styled-components";

const Wrapper = styled.div``;

type IProps = {
  photos: Array<RoutePhoto> | null | undefined;
};

const PhotoGallery: FC<IProps> = ({ photos }) => {
  // const [appState, setAppState] = useState<AppState>(null);

  return (
    <Wrapper className="d-flex gap-3 w-100 overflow-scroll">
      {photos?.map((photo) => (
        <Photo photo={photo} />
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

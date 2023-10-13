import React, { FC, useEffect, useState } from 'react';

import Photo from './Photo';
import { RoutePhoto } from '../../constants/types';
import styled from 'styled-components';

const Wrapper = styled.div`
padding: 20px;
background: #fff;
height: 200px;
`;

type IProps = {
  photos: Array<RoutePhoto> | null | undefined
}


const PhotoGallery: FC<IProps> = ({ photos }) => {

  // const [appState, setAppState] = useState<AppState>(null);



  return (
    <Wrapper>
      {photos?.map((photo) => (<Photo photo={photo} />))}
    </Wrapper>
  );
}

export default PhotoGallery;

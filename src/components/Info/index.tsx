import React, { FC, useEffect, useState } from 'react';

import { Route } from '../../constants/types';
import styled from 'styled-components';

const Wrapper = styled.div`
padding: 20px;
background: #fff;
height: 100%;
`;

type IProps = {
  route: Route | null
}

const Info: FC<IProps> = ({ route }) => {

  // const [appState, setAppState] = useState<AppState>(null);


  return (
    <Wrapper>
      Lorem ipsum


      {route?.info}

    </Wrapper>
  );
}

export default Info;

import React, { FC, useEffect, useState } from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
flex: 0 1 80px;
display: flex;
align-items: center;
`;

const Header: FC = () => {

  // const [appState, setAppState] = useState<AppState>(null);


  return (
    <Wrapper>
      <h1>TC Streetcars</h1>
    </Wrapper>
  );
}

export default Header;

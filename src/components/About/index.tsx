import React, { FC } from "react";

import styled from "styled-components";

const Wrapper = styled.div``;

const Header: FC = () => {
  return (
    <Wrapper className="d-flex p-3 align-items-center">
      Isaacs A. & Diers J.W. 2007. Twin City Lines. The Streetcar Era in
      Minneapolis and St. Paul. University of Minnesota Press.

      <a href="https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_metc/trans_historical_transit_routes/metadata/metadata.html">Met Council Data</a>
    </Wrapper>
  );
};

export default Header;

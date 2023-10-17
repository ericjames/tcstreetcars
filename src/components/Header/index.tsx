import React, { FC } from "react";

import styled from "styled-components";

const Wrapper = styled.div``;

const Header: FC = () => {
  return (
    <Wrapper className="d-flex p-3 align-items-center">
      <h1 className="fs-3 m-0">TC Streetcars</h1>
    </Wrapper>
  );
};

export default Header;

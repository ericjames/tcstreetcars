import React, { FC, useEffect, useState } from "react";

import { Route } from "../../constants/types";
import styled from "styled-components";

type IProps = {
  route: Route | null;
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
`;

const RouteDetails: FC<IProps> = ({ route }) => {
  return (
    <div className={`${Wrapper} bg-light`}>
      {route?.routeNumber} {route?.routeName}
    </div>
  );
};

export default RouteDetails;

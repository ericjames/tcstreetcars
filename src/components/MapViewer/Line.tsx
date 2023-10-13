import { FC } from "react";
import { IRouteProp } from "../../constants/props";
import Path from "../common/MapboxLibrary/Path";
import { Route } from "../../constants/types";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 10px;
  background: red;
`;

interface IProps extends IRouteProp {
  map: mapboxgl.Map | undefined;
  onLineHover: () => void;
  onLineClick: (route: Route | null) => void;
}

const Line: FC<IProps> = ({ map, route, onLineHover, onLineClick }) => {
  return (
    // <Wrapper onMouseOver={onLineHover} onClick={() => onLineClick(route)} />
    <Path map={map} />
  );
};

export default Line;

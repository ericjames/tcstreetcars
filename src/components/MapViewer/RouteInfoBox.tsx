import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Corridor } from "../../constants/types";
import PhotoGallery from "../PhotoGallery";
import styled from "styled-components";

const Wrapper = styled.div`
  transition: all 450ms ease-in;
  height: 250px;
  width: 100%;
`;

type IProps = {
  corridor: Corridor | null;
  resetMap: () => void;
};

const RouteInfoBox: FC<IProps> = ({ corridor, resetMap }) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (corridor) {
      setIsActive(true);
    }
  }, [corridor]);

  const onButtonClick = () => {
    setIsActive(!isActive);
    resetMap();
  };
  return (
    <Wrapper
      className={`position-absolute p-3`}
      style={{
        bottom: isActive ? 0 : -250,
      }}>
      <button onClick={onButtonClick}>Exit</button>
      <PhotoGallery photos={corridor?.photos} />
    </Wrapper>
  );
};

export default RouteInfoBox;

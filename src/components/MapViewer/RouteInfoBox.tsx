import { GET_PHOTOS_API, GET_PHOTO_JSON } from "../../constants/photos";
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
  exitMethod: () => void;
};

const RouteInfoBox: FC<IProps> = ({ corridor, exitMethod }) => {
  const [isActive, setIsActive] = useState(false);
  const [photos, setPhotos] = useState(null);
  useEffect(() => {
    if (corridor) {
      setIsActive(true);
    }
  }, [corridor]);

  const onButtonClick = () => {
    setIsActive(!isActive);
    exitMethod();
  };

  useEffect(() => {
    const fetchData = async () => {
      return await GET_PHOTO_JSON(corridor?.DATA_CORRIDOR);
    };

    const photos = fetchData()
      .catch(console.error)
      .then((photos) => {
        setPhotos(photos);
      });
  }, [corridor]);

  return (
    <Wrapper
      className={`position-absolute p-3`}
      style={{
        bottom: isActive ? 0 : -250,
      }}>
      {/* <button onClick={onButtonClick}>Exit</button> */}
      <PhotoGallery photos={photos} />
    </Wrapper>
  );
};

export default RouteInfoBox;

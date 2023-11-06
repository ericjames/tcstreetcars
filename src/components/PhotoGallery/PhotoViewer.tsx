import { FC, useEffect } from "react";

import { RoutePhoto } from "../../constants/types";
import { XSquare } from "react-bootstrap-icons";
import styled from "styled-components";

const Wrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 100;
  background: rgb(0, 0, 0, 0.6);
`;

type IProps = {
  photo: RoutePhoto | null;
  exitPhotoViewer: () => void;
};

const PhotoViewer: FC<IProps> = ({ photo, exitPhotoViewer }) => {
  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.keyCode === 8 || e.keyCode === 27) {
        exitPhotoViewer();
      }
    };
    window.onkeydown = onKeyDown;
    return () => {
      window.onkeydown = null;
    };
  }, []);

  return (
    <Wrapper
      className={`position-absolute w-100 h-100 ${
        photo ? "d-block" : "d-none"
      }`}>
      <button
        onClick={exitPhotoViewer}
        className="p-4 position-absolute top-0 end-0 btn fs-4">
        <XSquare />
      </button>
      <div className="p-3 bg-white rounded m-3 d-flex flex-column h-75">
        <div className="flex-fill h-75 mb-4">
          <img
            className="object-fit-contain w-100 h-100"
            src={photo?.fullSizeUrl}
            alt={photo?.title}
          />
        </div>
        <div className="p-2 w-100">
          <p className="lead">{photo?.title}</p>
          <p className="small">{photo?.description}</p>
          <p className="small">
            Source: (PENDING APPROVAL) {photo?.source}{" "}
            {photo?.sourceLink && <a href={photo?.sourceLink}>Source Link</a>}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default PhotoViewer;

import { FC } from "react";
import { RoutePhoto } from "../../constants/types";
import { XSquare } from "react-bootstrap-icons";
import styled from "styled-components";

const Wrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 100;
  div {
    width: 73vw;
    margin: 1em auto;
    max-height: 70vh;
  }
  img {
    width: 100%;
    height: auto;
    max-height: 50vh;
  }
  background: rgb(0, 0, 0, 0.6);
`;

type IProps = {
  photo: RoutePhoto | null;
  exitPhotoViewer: () => void;
};

const PhotoViewer: FC<IProps> = ({ photo, exitPhotoViewer }) => {
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
      <div className="p-3 bg-white rounded">
        <img
          className="object-fit-contain"
          src={photo?.fullSizeUrl}
          alt={photo?.title}
        />
        <div className="p-2 w-auto">
          <p className="lead">{photo?.title}</p>
          <p className="small">{photo?.description}</p>
          <p className="small">
            Source: {photo?.source}{" "}
            {photo?.sourceLink && <a href={photo?.sourceLink}>Original Link</a>}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default PhotoViewer;

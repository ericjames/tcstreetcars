import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Corridor } from "../../constants/types";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1em;
  padding: 1em;
  background: #fff;
  height: 90vh;
  overflow: scroll;
`;

type IProps = {
  selectedCorridor: Corridor | null;
  corridors: Array<Corridor>;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
};

const InfoBox: FC<IProps> = ({
  selectedCorridor,
  setSelectedCorridor,
  corridors,
}) => {
  // const [appState, setAppState] = useState<AppState>(null);

  return (
    <Wrapper>
      <h2>Welcome</h2>
      <p>
        Streetcars created the Twin Cities we see today. From 1890 to 1954, the
        yellow and green cars criss-crossed the urban grid. Explore the transit
        map by clicking on lines or by scrolling and finding a route below.
      </p>

      <h2>Streetcar Routes</h2>
      <ul>
        {corridors.map((route, i) => (
          <li
            key={i}
            className={selectedCorridor?.id === route.id ? "bg-selected" : ""}
          >
            <button
              onClick={() => setSelectedCorridor(route)}
              className="btn btn-large w-100 text-start"
            >
              {route.id} {route.corridorName} {route.routeName}
            </button>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default InfoBox;

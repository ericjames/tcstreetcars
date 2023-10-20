import { Corridor, IPropsInfoBox } from "../../constants/types";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import CorridorInfo from "./CorridorInfo";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const InfoBox: FC<IPropsInfoBox> = ({
  selectedCorridor,
  setSelectedCorridor,
  selectedType,
  setSelectedType,
  corridors,
  navigation,
}) => {
  // const [appState, setAppState] = useState<AppState>(null);

  let routesByCity: any = {};
  corridors?.forEach((c) => {
    if (c.mainCity) {
      if (!routesByCity[c.mainCity]) {
        routesByCity[c.mainCity] = [];
      }
      routesByCity[c.mainCity].push(c);
    } else {
      routesByCity["Minneapolis"].push(c);
    }
  });

  return (
    <Wrapper className="bg-sidebar">
      <CorridorInfo
        selectedCorridor={selectedCorridor}
        setSelectedCorridor={setSelectedCorridor}
      />

      <div className={`p-4 h-100 overflow-scroll`}>
        <p>
          A grand transportation system created the Twin Cities metro area.
          Explore by metro region above and select routes below.
        </p>

        {navigation?.types && (
          <div className="btn-group w-100 mb-4">
            {navigation?.types?.map((type) => (
              <button
                className={`btn btn-outline-secondary ${
                  selectedType === type ? "btn-selected" : ""
                }`}
                onClick={() => setSelectedType(type)}>
                {type}
              </button>
            ))}
          </div>
        )}

        <h3>Minneapolis</h3>
        <div className="list-group">
          {routesByCity &&
            routesByCity.Minneapolis.map((route: Corridor, i: number) => (
              <button
                key={i}
                className={`list-group-item list-group-item-action w-100 text-start
                  ${selectedCorridor?.id === route.id ? "active" : ""}
                `}
                onClick={() => setSelectedCorridor(route)}>
                {route.routeName}
              </button>
            ))}
        </div>

        <h3 className="mt-5">Saint Paul</h3>
        <div className="list-group">
          {routesByCity &&
            routesByCity["Saint Paul"].map((route: Corridor, i: number) => (
              <button
                key={i}
                className={`list-group-item list-group-item-action w-100 text-start
                  ${selectedCorridor?.id === route.id ? "active" : ""}
                `}
                onClick={() => setSelectedCorridor(route)}>
                {route.routeName}
              </button>
            ))}
        </div>
        <br />
        <br />
        <br />
      </div>
    </Wrapper>
  );
};

export default InfoBox;

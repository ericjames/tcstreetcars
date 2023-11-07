import { Dispatch, FC, SetStateAction } from "react";

import { Corridor } from "../../constants/types";
import styled from "styled-components";

interface IProps {
  corridors: Array<Corridor> | null;
  heading: string;
  filterOut: Array<Array<string>>;
  sortProperty: string;
  selectedCorridor: Corridor | null;
  setSelectedCorridor: Dispatch<SetStateAction<Corridor | null>>;
}

const StyledButton = styled.button`
  letter-spacing: 1px;
`;

const RouteList: FC<IProps> = ({
  corridors,
  heading,
  filterOut,
  sortProperty,
  selectedCorridor,
  setSelectedCorridor,
}) => {
  if (!corridors) return null;

  const sorter = sortProperty as keyof Corridor;

  const filtered = corridors.filter((corridor) => {
    // Ignore any corridor names we do not recognize
    return filterOut.every((f) => corridor[f[0] as keyof Corridor] === f[1]);
  });

  if (!filtered || !filtered.length) return null;

  filtered.sort((a, b) => {
    const valueA = a[sorter] || "";
    const valueB = b[sorter] || "";
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="list-group mb-5">
      <li className="list-group-item bg-transparent text-center border-0 border-bottom">
        <h3>{heading}</h3>
      </li>
      {filtered &&
        filtered.map((corridor: Corridor, i: number) => (
          <StyledButton
            key={i}
            className={`font-sans fs-6 text-center text-uppercase list-group-item list-group-item-action w-100 text-start d-flex align-items-center justify-content-center gap-2
                  ${selectedCorridor?.id === corridor.id ? "active" : ""}
                `}
            onClick={() => setSelectedCorridor(corridor)}>
            {corridor.routeName}
          </StyledButton>
        ))}
    </div>
  );
};

export default RouteList;

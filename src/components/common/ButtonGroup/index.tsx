import {
  NavigationState,
  NavigationStateProp,
  SetSelectedType,
  TransitTypes,
} from "../../../constants/types";

import { FC } from "react";
import styled from "styled-components";

const StyledButtonGroup = styled.div`
  flex-wrap: wrap;
  button {
    flex: 1 1 50% !important;
  }
`;

interface IProps {
  navigation: NavigationStateProp;
  selectedType: TransitTypes | null;
  setSelectedType: SetSelectedType;
}

const ButtonGroup: FC<IProps> = ({
  navigation = null,
  selectedType = null,
  setSelectedType,
}) => {
  if (navigation && navigation?.types) {
    return (
      <StyledButtonGroup className="btn-group w-100 mb-4">
        {navigation?.types?.map((type, i) => (
          <button
            key={i}
            className={`btn btn-outline-secondary ${
              selectedType === type ? "btn-secondary text-white" : ""
            }`}
            onClick={() => setSelectedType(type)}>
            {type}
          </button>
        ))}
      </StyledButtonGroup>
    );
  }
  return null;
};

export default ButtonGroup;

import { COLORS } from "../../constants/colors";
import { CircleFill } from "react-bootstrap-icons";
import { FC } from "react";
import { YEAR_END_GRADIENT } from "../../constants";
import styled from "styled-components";

const gradients = COLORS.getYearGradients();

const Wrapper = styled.div`
  top: 0.5em;
  right: 0.5em;
  z-index: 10;
`;

const Item = styled.div<{
  "data-key": number;
}>`
  border-bottom: 5px solid ${(props) => gradients[props["data-key"]]};
`;

const MapLegend: FC = () => {
  return (
    <Wrapper className="position-absolute small">
      <div className="d-flex gap-3">
        Service Ended By
        {YEAR_END_GRADIENT.map((yearEnd, i) => (
          <Item
            key={i}
            data-key={i}>
            {yearEnd}
          </Item>
        ))}
      </div>
    </Wrapper>
  );
};

export default MapLegend;

import { FC } from "react";
import { exportFile } from "./admin";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 250px;
  z-index: 10;
  width: 100%;
  border: 1px solid #ccc;
  resize: both;
  overflow: scroll;
`;

interface IProps {
  // map?: mapboxgl.Map | undefined;
  geoJSON: any;
  setGeoJSON: any;
}

const DataTable: FC<IProps> = ({ geoJSON }) => {
  const headers = [
    "ID",
    "TYPE",
    "CORRIDOR",
    "STOP_NAME",
    "YR_START1",
    "YR_START2",
    "YR_END1",
    "YR_END2",
  ];

  return (
    <Wrapper className="bg-light">
      <table>
        <thead>
          <tr>
            {headers.map((header, i: number) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {geoJSON &&
            geoJSON.features.map((feature: any, i: number) => (
              <tr key={i}>
                {headers.map((header) => (
                  <td>{feature.properties[header]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Wrapper>
  );
};
export default DataTable;

import { FC } from "react";
import { IPropsInfoBox } from "../../../constants/types";
import RouteList from "../RouteList";

const TCStreetcar: FC<IPropsInfoBox> = ({
  corridors,
  selectedCorridor,
  setSelectedCorridor,
  selectedType,
}) => {
  return (
    <>
      <p>
        A great streetcar system created the Twin Cities metro area and peaked
        at around 1947 until its demise in 1954. Explore the map by hovering
        over routes and clicking on them to enter. You can also directly select
        routes below or explore other regions in the navigation bar above.
      </p>

      <RouteList
        corridors={corridors}
        selectedCorridor={selectedCorridor}
        setSelectedCorridor={setSelectedCorridor}
        filterOut={[
          ["mainCity", "Minneapolis"],
          ["DATA_TYPE", selectedType?.toString() || ""],
        ]}
        sortProperty="id"
        heading="Minneapolis"
      />

      <RouteList
        corridors={corridors}
        selectedCorridor={selectedCorridor}
        setSelectedCorridor={setSelectedCorridor}
        filterOut={[
          ["mainCity", "Saint Paul"],
          ["DATA_TYPE", selectedType?.toString() || ""],
        ]}
        sortProperty="id"
        heading="Saint Paul"
      />
    </>
  );
};

export default TCStreetcar;

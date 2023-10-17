import React, { FC, useEffect, useState } from "react";

import { CORRIDORS } from "../../constants/DATA_CORRIDORS";
import { Corridor } from "../../constants/types";
import Header from "../../components/Header";
import { IRouteProp } from "../../constants/props";
import InfoBox from "../../components/InfoBox";
import MapViewer from "../../components/MapViewer";

const Home: FC = () => {
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor | null>(
    null
  );

  useEffect(() => {
    // Router toggles on active route per URL?
  });

  return (
    <div className="vh-100 d-flex flex-column">
      <Header />
      <div className="row flex-fill g-0">
        <div className="col-4">
          <InfoBox
            corridors={CORRIDORS}
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
          />
        </div>

        <div className="col-8">
          <MapViewer
            corridors={CORRIDORS}
            selectedCorridor={selectedCorridor}
            setSelectedCorridor={setSelectedCorridor}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

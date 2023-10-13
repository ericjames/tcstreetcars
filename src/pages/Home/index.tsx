import React, { FC, useEffect, useState } from "react";

import Header from "../../components/Header";
import { IRouteProp } from "../../constants/props";
import Info from "../../components/Info";
import MapViewer from "../../components/MapViewer";
import { Route } from "../../constants/types";

const Home: FC = () => {
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);

  useEffect(() => {
    // Router toggles on active route per URL?
  });

  return (
    <div className="vh-100 d-flex flex-column">
      <div>
        <Header />
      </div>
      <div className="row p-3 g-3 h-100">
        <div className="col-4">
          <Info route={activeRoute} />
        </div>

        <div className="col-8">
          <MapViewer route={activeRoute} setActiveRoute={setActiveRoute} />
        </div>
      </div>
    </div>
  );
};

export default Home;

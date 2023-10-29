import React, { FC, useEffect, useRef } from "react";

import { NAVIGATION } from "../../constants";
import { SetNavigationType } from "../../constants/types";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 0, 0, 0.85);
  transition: opacity ease-in 300ms;
  opacity: 0;
`;

const About: FC<{ setNavigation: SetNavigationType }> = ({ setNavigation }) => {
  const wrapperRef = useRef<any>(null);
  useEffect(() => {
    setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = 1;
      }
    }, 1);
  }, []);
  return (
    <Wrapper
      ref={wrapperRef}
      onClick={() => setNavigation(NAVIGATION[1])}>
      <div className="container col-8 p-3">
        <h1>Oh the places you'll go...</h1>
        <p className="lead">
          This map is an exploration through time. The early Twin Cities
          transportation system spans a 65-year history from 1889 to 1954. From
          walking on dirt or gravel roads and galloping horses, over-time
          citizens could ride horse-driven trolleys, steam powered trains,
          modern electric streetcars, and motorized buses. Routes changed over
          time though the "corridors" they served remained the same. These
          corridors followed cities, neighborhoods and major street names.
        </p>
        <p></p>
        <h3>Attribution and Credits</h3>
        <ul>
          <li>
            Isaacs A. & Diers J.W. 2007. Twin City Lines. The Streetcar Era in
            Minneapolis and St. Paul. University of Minnesota Press.
          </li>
          <li>Minnesota Streetcar Museum</li>
          <li>
            <a href="https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_metc/trans_historical_transit_routes/metadata/metadata.html">
              Met Council Data
            </a>
          </li>
          <li>"Where the San Francisco Streetcars Used to Go"</li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default About;

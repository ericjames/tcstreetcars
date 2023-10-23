import React, { FC } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
`;

const About: FC = () => {
  return (
    <Wrapper>
      <div className="d-flex p-3 align-items-center">
        <p className="lead">Oh the places you'll go...</p>
        <p>
          This map is an exploration through time. The early Twin Cities
          transportation system spans a 65-year history from 1889 to 1954. From
          walking on dirt or gravel roads and galloping horses, over-time
          citizens could ride horse-driven trolleys, steam powered trains,
          modern electric streetcars, and motorized buses. Routes changed over
          time though the "corridors" they served remained the same. These
          corridors followed cities, neighborhoods and major street names.
        </p>
        <p></p>
        <h3>Attribution</h3>
        <ul>
          <li>
            Isaacs A. & Diers J.W. 2007. Twin City Lines. The Streetcar Era in
            Minneapolis and St. Paul. University of Minnesota Press.
          </li>
          <li>
            <a href="https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_metc/trans_historical_transit_routes/metadata/metadata.html">
              Met Council Data
            </a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default About;

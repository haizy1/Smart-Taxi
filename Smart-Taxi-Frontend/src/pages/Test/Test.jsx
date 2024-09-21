// import React, { useState } from "react";
// import "./Test.css";
// import ClientLocationMap from "../../components/Map/Map";
// import SideBare from "../../components/SideBar/SideBar";

// const Test = ({ apiKey }) => {
//   return (
//     <div>
//       <div className="sidebarContainer">
//         <SideBare />
//       </div>
//       <div className="mapContainer">
//         <ClientLocationMap apiKey={apiKey} className="map" />
//       </div>
//     </div>
//   );
// };

// export default Test;
//-----------------------------------------------------------------------
import React from "react";
import "./Test.css";
import ClientLocationMap from "../../components/Map/Map";
import SideBare from "../../components/SideBar/SideBar";

const Test = ({ apiKey }) => {
  return (
    <div>
      <div className="sidebarContainer">
        <SideBare />
      </div>
      <div className="mapContainer">
        <ClientLocationMap apiKey={apiKey} className="map" />
      </div>
    </div>
  );
};

export default Test;

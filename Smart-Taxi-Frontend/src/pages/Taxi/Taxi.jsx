// import React, { useState } from "react";
// import TaxiLocationMap from "../../components/Taxi/Taxi";
// import SideBare from "../../components/SideBar/SideBar";

// const Texi = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with your authentication state

//   const handleLogout = () => {
//     // Implement your logout logic here (clear tokens, reset state, etc.)
//     setIsAuthenticated(false);
//   };

//   return (
//     <div className="khoulchi">
//       <div className="sidebarContainer">
//         <SideBare isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//       </div>
//       <div className="mapContainer"></div>
//       <TaxiLocationMap />
//     </div>
//   );
// };

// export default Texi;
//--------------------------------------------------------

//
import React, { useState } from "react";
import "../Test/Test.css";
import TaxiLocationMap from "../../components/Taxi/Taxi";
import SideBare from "../../components/SideBar/SideBar";
// import WebsiteLocationMap from "../../components/Driver/Driver";
const Texi = () => {
  // Remplacez par votre clé API Google Maps

  return (
    <div>
      <div className="sidebarContainer">
        <SideBare />
      </div>
      <div className="mapContainer">
        <TaxiLocationMap />
      </div>
    </div>
  );
};

export default Texi;

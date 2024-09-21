// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   Marker,
//   Circle,
//   useLoadScript,
// } from "@react-google-maps/api";
// import io from "socket.io-client";

// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const WebsiteLocationMap = ({ apiKey }) => {
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAHEPPZkpx8DH9Yoqg9fMPhuyktKHWFrGk",
//     libraries,
//   });

//   // Establishing socket connection
//   const socket = io("http://localhost:5000");

//   useEffect(() => {
//     // Fetch position data from MongoDB
//     const fetchPosition = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/get-location");
//         if (!response.ok) {
//           throw new Error("Failed to fetch position data");
//         }
//         const data = await response.json();
//         setCurrentPosition(data);
//       } catch (error) {
//         console.error("Error fetching position data:", error);
//       }
//     };

//     if (isLoaded) {
//       fetchPosition();
//     }
//   }, [isLoaded]);

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <div id="map" style={mapContainerStyle}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={15}
//         center={currentPosition}
//       >
//         {currentPosition && (
//           <>
//             <Marker position={currentPosition} />
//             <Circle
//               center={currentPosition}
//               radius={200} // 200 meters diameter, so 100 meters radius
//               options={{
//                 strokeColor: "#FF0000",
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//                 fillColor: "#FF0000",
//                 fillOpacity: 0.35,
//               }}
//             />
//           </>
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// export default WebsiteLocationMap;
import React from "react";
import GoogleMaps from "../GoogleMaps/GoogleMaps";
const WebsiteLocationMap = ({ apiKey }) => {
  const isGoogleMapsLoaded = GoogleMaps(apiKey);

  return (
    <div>
      {isGoogleMapsLoaded ? (
        <div>Google Maps is loaded!</div>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </div>
  );
};

export default WebsiteLocationMap;

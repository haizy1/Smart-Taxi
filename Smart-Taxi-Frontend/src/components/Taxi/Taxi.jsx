//--------------------------------------------
// import React, { useState, useEffect } from "react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import io from "socket.io-client";
// import "../Map/Map.css";

// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const TaxiLocationMap = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAHEPPZkpx8DH9Yoqg9fMPhuyktKHWFrGk", // Add your API key here
//     libraries,
//   });

//   const [currentTaxiPosition, setCurrentTaxiPosition] = useState(null);
//   const [clientPositions, setClientPositions] = useState([]);
//   const [nearbyClientMarkers, setNearbyClientMarkers] = useState([]);
//   const [clientDestination, setClientDestination] = useState(null);
//   const socket = io("http://localhost:5000", {
//     auth: {
//       token: localStorage.getItem("token"), // Assuming the token is stored in localStorage
//     },
//   });
//   useEffect(() => {
//     socket.on("locationUpdate", (data) => {
//       setClientPositions((prevPositions) => [
//         ...prevPositions,
//         { lat: data.lat, lng: data.lng },
//       ]);
//     });

//     socket.on("clientDestination", (destination) => {
//       setClientDestination(destination);
//     });

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentTaxiPosition({ lat: latitude, lng: longitude });

//           // Emit currentPosition to the server
//           socket.emit("taxiLocation", { lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error("Error getting taxi location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }

//     // Clean up socket connection on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const findNearbyClients = () => {
//     if (!currentTaxiPosition) return;

//     const nearbyClients = clientPositions.filter((client) => {
//       const distance = getDistance(currentTaxiPosition, client);
//       return distance <= 1000000; // 1000 meters = 1 km
//     });

//     setNearbyClientMarkers(nearbyClients);
//   };

//   const getDistance = (pos1, pos2) => {
//     const R = 6371e3; // Radius of the Earth in meters
//     const lat1 = pos1.lat * (Math.PI / 180);
//     const lat2 = pos2.lat * (Math.PI / 180);
//     const deltaLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
//     const deltaLng = (pos2.lng - pos1.lng) * (Math.PI / 180);

//     const a =
//       Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
//       Math.cos(lat1) *
//         Math.cos(lat2) *
//         Math.sin(deltaLng / 2) *
//         Math.sin(deltaLng / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const distance = R * c;
//     return distance;
//   };

//   const sendRequestToClient = (clientPosition) => {
//     const request = {
//       taxiLat: currentTaxiPosition.lat,
//       taxiLng: currentTaxiPosition.lng,
//       clientLat: clientPosition.lat,
//       clientLng: clientPosition.lng,
//     };
//     socket.emit("sendRequest", request);
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={15}
//         center={currentTaxiPosition}
//       >
//         {currentTaxiPosition && (
//           <Marker
//             position={currentTaxiPosition}
//             icon={{
//               url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
//             }}
//           />
//         )}
//         {clientPositions.map((position, index) => (
//           <Marker
//             key={index}
//             position={position}
//             icon={{
//               url: nearbyClientMarkers.includes(position)
//                 ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
//                 : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
//             }}
//           />
//         ))}
//         {clientDestination && (
//           <Marker
//             position={clientDestination}
//             icon={{
//               url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//             }}
//           />
//         )}
//       </GoogleMap>
//       <button onClick={findNearbyClients} className="botona">
//         Find Nearby Clients
//       </button>
//       {nearbyClientMarkers.map((position, index) => (
//         <div key={index} className="knjrb">
//           <p>
//             Client at: {position.lat}, {position.lng}
//           </p>
//           <button onClick={() => sendRequestToClient(position)}>
//             Send Request
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaxiLocationMap;

//--------------------------------------------------------------
// TaxiLocationMap.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import io from "socket.io-client";
import "./Taxi.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const TaxiLocationMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAHEPPZkpx8DH9Yoqg9fMPhuyktKHWFrGk", // Add your API key here
    libraries,
  });

  const [currentTaxiPosition, setCurrentTaxiPosition] = useState(null);
  const [clientPositions, setClientPositions] = useState([]);
  const [nearbyClientMarkers, setNearbyClientMarkers] = useState([]);
  const [clientDestination, setClientDestination] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [directions, setDirections] = useState(null);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      setClientPositions((prevPositions) => [
        ...prevPositions,
        { lat: data.lat, lng: data.lng },
      ]);
    });

    socket.on("clientDestination", (destination) => {
      setClientDestination(destination);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentTaxiPosition({ lat: latitude, lng: longitude });

          // Emit currentPosition to the server
          socket.emit("taxiLocation", { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting taxi location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const findNearbyClients = () => {
    if (!currentTaxiPosition) return;

    const nearbyClients = clientPositions.filter((client) => {
      const distance = getDistance(currentTaxiPosition, client);
      return distance <= 1000; // 1000 meters = 1 km
    });

    setNearbyClientMarkers(nearbyClients);
  };

  const getDistance = (pos1, pos2) => {
    const R = 6371e3; // Radius of the Earth in meters
    const lat1 = pos1.lat * (Math.PI / 180);
    const lat2 = pos2.lat * (Math.PI / 180);
    const deltaLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
    const deltaLng = (pos2.lng - pos1.lng) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const sendRequestToClient = (clientPosition) => {
    const request = {
      taxiLat: currentTaxiPosition.lat,
      taxiLng: currentTaxiPosition.lng,
      clientLat: clientPosition.lat,
      clientLng: clientPosition.lng,
    };
    socket.emit("sendRequest", request);
    setSelectedClient(clientPosition);
  };

  const calculateRoute = useCallback(() => {
    if (selectedClient && clientDestination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: selectedClient,
          destination: clientDestination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [selectedClient, clientDestination]);

  useEffect(() => {
    calculateRoute();
  }, [calculateRoute]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="container">
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={currentTaxiPosition}
        >
          {currentTaxiPosition && (
            <Marker
              position={currentTaxiPosition}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              }}
            />
          )}
          {clientPositions.map((position, index) => (
            <Marker
              key={index}
              position={position}
              icon={{
                url: nearbyClientMarkers.includes(position)
                  ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
          ))}
          {clientDestination && (
            <Marker
              position={clientDestination}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        <button onClick={findNearbyClients} className="botona">
          Find Nearby Clients
        </button>
        {nearbyClientMarkers.map((position, index) => (
          <div key={index} className="knjrb">
            <p>
              Client at: {position.lat}, {position.lng}
            </p>
            <button onClick={() => sendRequestToClient(position)}>
              Send Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxiLocationMap;

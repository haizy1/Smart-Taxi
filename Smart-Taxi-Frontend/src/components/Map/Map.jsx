import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import io from "socket.io-client";
import "./Map.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const ClientLocationMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAHEPPZkpx8DH9Yoqg9fMPhuyktKHWFrGk",
    libraries,
  });

  const [currentClientPosition, setCurrentClientPosition] = useState(null);
  const [currentTaxiPosition, setCurrentTaxiPosition] = useState(null);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectingDestination, setSelectingDestination] = useState(false);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("taxiLocationUpdate", (data) => {
      setCurrentTaxiPosition({ lat: data.lat, lng: data.lng });
    });

    socket.on("receiveRequest", (request) => {
      setRequests((prevRequests) => [...prevRequests, request]);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentClientPosition({ lat: latitude, lng: longitude });

          socket.emit("location", { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const acceptRequest = (requestId) => {
    socket.emit("acceptRequest", { requestId });
    setSelectedRequest(requestId);
    setSelectingDestination(true);
  };

  const denyRequest = (requestId) => {
    socket.emit("denyRequest", { requestId });
  };

  const handleMapClick = (event) => {
    if (selectingDestination && selectedRequest) {
      const destinationLat = event.latLng.lat();
      const destinationLng = event.latLng.lng();
      socket.emit("updateDestination", {
        requestId: selectedRequest,
        destinationLat,
        destinationLng,
      });
      setSelectingDestination(false);
      setSelectedRequest(null);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={currentClientPosition}
        onClick={handleMapClick}
      >
        {currentClientPosition && (
          <Marker
            position={currentClientPosition}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )}
        {currentTaxiPosition && (
          <Marker
            position={currentTaxiPosition}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            }}
          />
        )}
      </GoogleMap>
      <div className="request-container">
        <h3>Incoming Requests</h3>
        {requests.map((request, index) => (
          <div className="request" key={index}>
            <p>
              Request from Taxi at: {request.taxiLat}, {request.taxiLng}
            </p>
            <button
              className="accept-button"
              onClick={() => acceptRequest(request._id)}
            >
              Accept Request
            </button>
            <button
              className="deny-button"
              onClick={() => denyRequest(request._id)}
            >
              Deny Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLocationMap;

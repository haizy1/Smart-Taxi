// Marker.jsx
import React from "react";

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "5px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

export default Marker;

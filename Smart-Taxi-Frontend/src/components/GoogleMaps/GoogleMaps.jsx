import React, { useState, useEffect } from "react";

const GoogleMaps = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;

    const onScriptLoad = () => {
      setIsLoaded(true);
    };

    script.addEventListener("load", onScriptLoad);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptLoad);
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return isLoaded;
};

export default GoogleMaps;

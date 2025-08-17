import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const mapStyles = [
    { label: "Satellite", url: "https://api.maptiler.com/maps/satellite/style.json?key=AGMBRAsSD2L65HSvLA4i" },
    { label: "Basic", url: "https://api.maptiler.com/maps/basic/style.json?key=AGMBRAsSD2L65HSvLA4i" },
    { label: "Bright", url: "https://api.maptiler.com/maps/bright/style.json?key=AGMBRAsSD2L65HSvLA4i" },
    { label: "Topographic", url: "https://api.maptiler.com/maps/topo/style.json?key=AGMBRAsSD2L65HSvLA4i" },
    { label: "Streets", url: "https://api.maptiler.com/maps/streets/style.json?key=AGMBRAsSD2L65HSvLA4i" },
  ];

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyles[0].url,
      center: [0, 0],
      zoom: 1.5,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, []);

  const handleStyleChange = (styleUrl) => {
    if (map.current) map.current.setStyle(styleUrl);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div ref={mapContainer} style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }} />

      {/* Map style buttons */}
      <div style={{ position: "absolute", bottom: 10, left: 10, zIndex: 1 }}>
        {mapStyles.map((style) => (
          <button
            key={style.label}
            onClick={() => handleStyleChange(style.url)}
            style={{ display: "block" }}
          >
            {style.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

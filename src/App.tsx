import { useEffect } from "react";
import { LeafletLayers } from "./LeafletLayers";
import { MapContainer, TileLayer } from "react-leaflet";
import { points } from "./data";
import "leaflet/dist/leaflet.css";

export function App() {
  useEffect(() => {}, []);

  return (
    <MapContainer
      className="map"
      center={[47, 2]}
      zoom={6}
      scrollWheelZoom={true}
      zoomSnap={0.5}
      zoomDelta={0.5}
      wheelPxPerZoomLevel={200}
      preferCanvas={true}
      attributionControl={false}
    >
      <LeafletLayers points={points} />
      <TileLayer
        maxZoom={19}
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        noWrap={true}
      />
    </MapContainer>
  );
}

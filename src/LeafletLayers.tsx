import { LayerGroup } from "leaflet";
import { useEffect, useState, useMemo } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

export interface Location {
  lat: number;
  lng: number;
}

interface Props {
  points: Location[];
}

export function LeafletLayers({ points }: Props) {
  const [leafletMarkerLayers] = useState<LayerGroup>(new LayerGroup());

  const leafletMap = useMap();

  const relayLocationHeatmapLayer = useMemo(
    () => buildHeatmapLayer(points),
    [points]
  );

  useEffect(() => {
    if (points) {
      if (!leafletMap.hasLayer(leafletMarkerLayers)) {
        leafletMap.addLayer(leafletMarkerLayers);
      }
      leafletMarkerLayers.clearLayers();

      // Heatmap
      leafletMarkerLayers.addLayer(relayLocationHeatmapLayer);
    }
  }, [leafletMarkerLayers, points, leafletMap, relayLocationHeatmapLayer]);

  return null;
}

export const buildHeatmapLayer = (points: Location[]): LayerGroup => {
  let coordinates = new Array<number[]>();
  points.forEach((point) => coordinates.push([point.lat, point.lng, 1]));
  // @ts-ignore TODO: fix typescript error
  return L.heatLayer(coordinates, {
    radius: 25,
    max: 1,
    blur: 35,
    minOpacity: 0.55,
    gradient: {
      0.4: "#2e53dc",
      0.65: "#c924ae",
      0.75: "#ff4646",
      0.83: "#ff0000",
    },
  });
};

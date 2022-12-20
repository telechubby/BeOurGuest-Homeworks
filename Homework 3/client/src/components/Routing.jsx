import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

export default function Routing({user, event}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(user), L.latLng(event)],
      routeWhileDragging: true,
      createMarker: function() { return null; },
      lineOptions: {
        styles: [{ color: "red", weight: 5 }]
      }
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
//components
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutingMachineLayer = ({user, event}) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(user),
      L.latLng(event)
    ],
    lineOptions: {
      styles: [{ color: "red", weight: 5 }]
    },
    createMarker: function() { return null; },
    show: true,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    collapsible: false
  });

  return instance;
};

const Routing = createControlComponent(createRoutingMachineLayer);

export default Routing;
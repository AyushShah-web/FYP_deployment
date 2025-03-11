import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const leafletMap = ({coordinates}) => {
  // Coordinates for the map center (Example: Kathmandu, Nepal)
  console.log(coordinates);
  
  const position = [coordinates[1], coordinates[0]];

  return (
    <MapContainer
      center={position}  // Center the map on the provided position
      zoom={13}          // Set the zoom level
      style={{ height: '400px', width: '100%' }}  // Define the map container's height and width
    >
      {/* TileLayer renders the map tiles */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marker on the map */}
      <Marker position={position}>
        <Popup>Kathmandu, Nepal</Popup>  {/* Popup text when the marker is clicked */}
      </Marker>
    </MapContainer>
  );
};

export default leafletMap;

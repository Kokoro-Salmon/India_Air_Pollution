import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ center, zoom, onMarkerClick, markers }) => {
  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: marker.geometry.coordinates[1],
              lng: marker.geometry.coordinates[0]
            }}
            onClick={() => onMarkerClick(marker.properties)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;

import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './map.css';

const LocationPin = ({ text }) => (
  <div className='pin'>
    <LocationOnIcon className='pin-icon' />
    <p className='pin-text'>{text}</p>
  </div>
);

const Map = ({ location, zoomLevel }) => (
  <div className='map'>
    {/* <h2 className='map-h2'>{title}</h2> */}

    <div className='google-map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyA6_-G9HVVxXIrClNWwhIdEvpK6QH53c4A' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
);

export default Map;

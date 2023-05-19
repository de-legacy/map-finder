import AddLocationIcon from '@mui/icons-material/AddLocation';
import { red } from '@mui/material/colors';
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react';

type mProps = {
  lat: number,
  lng: number 
}

function Maps(props: mProps) {
  let defaultProps = {
    center: {
      lat: props?.lat || -6.9174639,
      lng: props?.lng || 107.6191228
    },
    zoom: 13
  };
  const [cordinates, setCordinates] = useState(defaultProps.center);
  const MapMarker = ({ lat, lng } : { lat: number, lng: number }) => <AddLocationIcon fontSize="large" sx={{ color: red[500] }}/>;

  useEffect(() => {
    setCordinates(props);
  }, [props])


  return (
    <>
    <GoogleMapReact
      yesIWantToUseGoogleMapApiInternals
      bootstrapURLKeys={{ key: 'AIzaSyAhmXUwRcyYoKGXhC_2vq_znWdquVdRoeQ' }}
      defaultZoom={defaultProps.zoom}
      center={defaultProps.center}
    >
      <MapMarker
        lat={defaultProps?.center?.lat || 0}
        lng={defaultProps?.center?.lng || 0}/>
    </GoogleMapReact>
    </>
  )
}

export default Maps
import React, {Component} from 'react';

import config from  '../../config';


import { withGoogleMap, GoogleMap,     Marker } from "react-google-maps";

import SearchBox from 'react-google-maps/lib/places/SearchBox'


export default withGoogleMap(props => {
       return (
    <div>

        <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={ 10}
           // googleMapURL={googleMapURL}
            defaultCenter={props.center ? props.center : {}}
            center={props.center ? props.center : {}}
           // onClick={props.onMapClick ? props.onMapClick : _.noop }
         //   onRightClick={props.onMapRightClick ? props.onMapRightClick : _.noop }
         >
            {props.markers && props.markers.map(marker => (
                <Marker
                    {...marker}
                   // onRightClick={() => props.onMarkerRightClick ? props.onMarkerRightClick(marker) : _.noop }
                />
            ))}
        </GoogleMap>
        {props.displaySearchInput &&
            <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
                inputClassName={'google-map-search-input form-control'}
                inputPlaceholder="Specify your location*"
            />

        }

    </div>

    )
}
);



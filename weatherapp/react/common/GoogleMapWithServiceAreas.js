import React, {Component} from 'react';

 import config from  '../../config';
import GoogleMapComponent from './GoogleMapComponent'


import {MAP} from 'react-google-maps/lib/constants';

export default class GoogleMapWithServiceAreas extends Component {
    constructor(props) {
        super(props);
         this.state = {
            center:  config.maps.defaultCoordinates,
            bounds: null,
            selectedLocation: this.props.selectedLocation,
             ServiceAddress:'',
        }

    }

    componentWillReceiveProps(nextProps) {
         if (nextProps.selectedLocation.key !== this.props.selectedLocation.key){
            this.setState({selectedLocation: nextProps.selectedLocation})
         }
    }


    handleOnMapLoad(map) {
        if (map && !this._mapComponent) {
            this._mapComponent = map;

        }
    }

    handleBoundsChanged() {
        this.setState({
            bounds: this._map.getBounds(),
            center: this._map.getCenter(),
        });
    }
    handleMapClick(event) {
             this.setState({
                 selectedLocation: {
                    position: event.latLng,
                    defaultAnimation: 2,
                    key: Date.now(),
                },
            }, function () {
                this.props.updateData({
                     selectedLocation: this.state.selectedLocation
                });
            });

    }
    handleSearchBoxMounted(searchBox) {
        this._searchBox = searchBox;
        this.props.handleSearchBoxMounted && this.props.handleSearchBoxMounted(searchBox)
    }

    handlePlacesChanged() {

        const places = this._searchBox.getPlaces();
        console.log('places', places );

        if (places.length > 0  ) {
                 this.setState({
                     center: places[0].geometry.location,
                    selectedLocation: {
                        position: places[0].geometry.location,
                        defaultAnimation: 2,
                        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
                    },
                    ServiceAddress: places[0].formatted_address
                }, function () {
                    this.props.updateData({
                          selectedLocation: this.state.selectedLocation,
                        ServiceAddress: this.state.ServiceAddress
                    });
                });
            }
        }


    render() {
        //console.log('this.state google maps', this.state.center   );
          return (
            <div className={'wrap-google-maps'}>

                <GoogleMapComponent
                     containerElement={
                        <div style={{height: "300px", overflow: 'visible'}}/>
                    }
                    mapElement={
                        <div className={'map-elem'} style={{height: "300px"}}/>
                    }

                 //   onMapLoad={this.handleOnMapLoad.bind(this)}
                   // onMapClick={this.handleMapClick.bind(this)}
                    markers={this.state.selectedLocation ? [this.state.selectedLocation] : []}
                     displaySearchInput={this.props.displaySearchInput}
                     center={this.state.center}
                  //  onBoundsChanged={this.handleBoundsChanged.bind(this)}
                    onSearchBoxMounted={this.handleSearchBoxMounted.bind(this)}
                    bounds={this.state.bounds}
                   onPlacesChanged={this.handlePlacesChanged.bind(this)}
                />

            </div >
        );

    }

}




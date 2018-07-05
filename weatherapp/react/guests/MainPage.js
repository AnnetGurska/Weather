import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames'
import GoogleMapWithServiceAreas from 'common/GoogleMapWithServiceAreas'
import WeatherDataBox from 'common/WeatherDataBox'
import Datetime from 'react-datetime'
import { } from "actions/actionTypes";
import moment from 'moment';
import config from  '../../config';

import {Form, FormGroup, Col, Button, Row,   FormControl,} from 'react-bootstrap';
import {makeRequest, displayMessage}  from 'actions';


class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pending: false,
            selectedCity: 'Kiev',
            zipCode:'02000',
         //   countryCode:'UA',
         //   selectedDate:moment().startOf('day'),
            WeatherDataList:[],
            requestMade:false,
             selectedLocation: {
                position:config.maps.defaultCoordinates,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
         }
        this.geocoder = new google.maps.Geocoder();
    }



    getWeatherData( ) {
        var self = this;


        if (this.state.selectedCity == '') {
            return this.props.displayMessage({
                'messageType': 'warning',
                'messageCode': 'Please, specify city name'
            });
        }
        this.setState({
            pending: false
        });
        var methodData = {
             'endpoint': '/weather_data',
            type:'post',
             'not_display_success_message': true,
         };
        this.props.makeRequest({
            city:this.state.selectedCity,
            zipCode: this.state.zipCode,
           // countryCode:this.state.countryCode,
            longitude:   typeof this.state.selectedLocation.position.lng === "function" ? this.state.selectedLocation.position.lng() : this.state.selectedLocation.position.lng,
            latitude:   typeof this.state.selectedLocation.position.lat === "function" ? this.state.selectedLocation.position.lat() : this.state.selectedLocation.position.lat,
        }, methodData).then(function (response) {
             self.setState({
                requestMade:true,
                WeatherDataList:response.data.WeatherDataList})
            self.setState({
                pending: false
            }, function () {

            });

        }).catch(function (error) {
            self.setState({
                pending: false
            });
        });
    }
    updateLocationData(params) {
         this.geocodeAddress.call(this, params.selectedLocation.position )
         this.setState(_.extend(params, {requestMade:false}))
    }
    geocodeAddress(position ) {
        this.geocoder.geocode({'location': {
            lat: typeof position.lat === "function" ?position.lat() : position.lat,
            lng: typeof position.lng === "function" ? position.lng() : position.lng
        }}, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log('results', results  );
                  var City = '', ZipCode = ''
                _.forEach(results[0].address_components, function (addressComponent) {
                    if (ZipCode == '' && _.includes(addressComponent.types, 'postal_code')) {
                        ZipCode = addressComponent.long_name
                    }
                    if (City == '' && _.includes(addressComponent.types, 'locality') && _.includes(addressComponent.types, 'political')) {
                        City = addressComponent.long_name
                    }
                //     if (countryCode == '' && _.includes(addressComponent.types, 'country') && _.includes(addressComponent.types, 'political')) {
                 //   countryCode = addressComponent.short_name
              //  }
                })
                var updateData = {
                    selectedCity: City,
                    zipCode:ZipCode,
                };
                this.setState(updateData);
            }
        })
    }
    handleSearchBoxMounted(searchBox) {
        if (searchBox && !this.state.inputChangeListenerAdded) {
            this.setState({inputChangeListenerAdded: true})
            searchBox._inputElement.addEventListener('input', this.onSearchInputChange);
            if (this.state.selectedCity) {
                searchBox._inputElement.value = this.state.selectedCity
            }
        }
    }
    // onDateChange(option) {
    //     var d = moment(option, 'D/M/YYYY');
    //     if (d == null || !d.isValid()) {
    //         return false;
    //     }
    //
    //     this.setState({'selectedDate': option});
    // }
    renderWeatherDataList(){
        var weatherDataByDate = _.groupBy(this.state.WeatherDataList, function (weatherDataByTime) {
            var time = moment(weatherDataByTime.dt_txt)
            return time.format('MMM DD ddd')
        })
         return <div className="bot20">
            {_.map(weatherDataByDate, function (weatherDataForDay, dayFormat) {

                return <Row className="weather-box bot20">
                    <Col xs={12}>{dayFormat}</Col>

                    {_.map(weatherDataForDay, function (weatherDataByTime, index) {
                    console.log('weatherTimeData', weatherDataByTime);
                        var time = moment(weatherDataByTime.dt_txt)
                        //  if (time.format('HH') == '00'   || time.format('HH') == '03'){
                        //     return ''
                        // }
                            return <WeatherDataBox
                            key={index}
                            weather={weatherDataByTime.weather[0].id}
                            weatherPictSrc={'http://openweathermap.org/img/w/'+weatherDataByTime.weather[0].icon+'.png'}
                            time={time.format('HH:mm')}
                            humidity={weatherDataByTime.main.humidity}
                            temp={  weatherDataByTime.main.temp.toFixed(0)  }
                            wind={weatherDataByTime.wind.speed}
                        >
                        </WeatherDataBox >
                    })
                    }
                </Row>
            })
            }
             </div>
    }
    render() {
console.log('this state ', this.state );

        return (
            <div style={{marginTop:150}}>

                <Row className="clearfix top20 bot20">
                    <Col xs={12}>
                <GoogleMapWithServiceAreas
                    displaySearchInput={true}
                    selectedLocation={this.state.selectedLocation}
                     handleSearchBoxMounted={this.handleSearchBoxMounted.bind(this)}
                    updateData={this.updateLocationData.bind(this)}  {...this.props} ref="googleMapComponent"/>
                    </Col>
                </Row>
                <Row className="top20 "  >
                    <Col xs={12}>
                        <Form className="clearfix " horizontal>
                            {/*<FormGroup>*/}
                            {/*<Col md={5} sm={7} xs={12} lg={3}>*/}
                                {/*<FormControl type="text" placeholder="City"*/}
                                             {/*onChange={(e) => {*/}
                                                 {/*this.setState({selectedCity: e.target.value})*/}
                                             {/*} }*/}
                                             {/*value={this.state.selectedCity}*/}
                                {/*/>*/}
                            {/*</Col>*/}
                        {/*</FormGroup>*/}

                            {/*<FormGroup>*/}
                                {/*<Col md={5} sm={7} xs={12} lg={3}>*/}
                                    {/*<Datetime dateFormat={'MM/DD/YYYY'}*/}
                                              {/*timeFormat={false}*/}
                                              {/*onChange={value => this.onDateChange(value)}*/}
                                              {/*value={this.state.selectedDate}*/}
                                              {/*inputProps={{placeholder: 'Date'}}/>*/}
                                {/*</Col>*/}
                            {/*</FormGroup>*/}
                            <FormGroup className="bot20 top20 left0">
                                <Col md={12} sm={12} xs={12} className="pleft0">
                                    <Button className="btn btn-primary right0" type="button"
                                            onClick={() => {
                                                this.getWeatherData()
                                            }}>
                                        Show Weather
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                {this.state.requestMade &&
                <div className="top20">
                    {this.state.WeatherDataList.length > 0 ?
                        this.renderWeatherDataList() :
                        <div>No weather data found for selected criteria </div>
                    }
                </div>
                }
            </div>
        )


    }
}

function mapStateToProps(state) {
    return { }
}

export default connect(mapStateToProps, {makeRequest, displayMessage})(MainPage);

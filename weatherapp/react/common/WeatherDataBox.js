
import React, { Component  } from 'react';
import {Form, FormGroup, Col, Button, Row,   FormControl,} from 'react-bootstrap';
import classNames from 'classnames'



export default class WeatherDataBox extends Component {
    constructor(props) {
        super(props)
    }

    render() {
      // console.log('in box',this.props );
        var weatherClass = classNames('wi wi-owm-' + this.props.weather);
        var bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold

        // Set the background colour based on the temperature
        if (this.props.temp >= 30) {
            bgColorClass += 'very-warm';
        }
        else if (this.props.temp >= 20 && this.props.temp < 30) {
            bgColorClass += 'warm';
        }
        else if (this.props.temp >= 10 && this.props.temp < 20) {
            bgColorClass += 'normal';
        }
        else if (this.props.temp > 0 && this.props.temp < 10) {
            bgColorClass += 'cold';
        }
        else if (this.props.temp <= 0) {
            bgColorClass += 'very-cold';
        }

         return <Col xs={6} sm={4} md={3}  lg={2}  >
             {/*<div className="weather">*/}
                {/*<i className={weatherClass}></i>*/}
            {/*</div>*/}
            <div className={ classNames(bgColorClass, 'bot15 top15')} >
            <div className="weather-details">
                <div style={{height:50}} >
                    <img className="pull-left"  style={{ height:'100%'}}   src={this.props.weatherPictSrc}/>
                    <div className="time text-box"><span className=" ">{this.props.time}</span></div>
                </div>


                <div className="text-box"> {'Temp: ' + this.props.temp} <span className="wi wi-degrees"></span></div>
                <div className= "text-box"> {'Hum: ' + this.props.humidity}%</div>
                <div className="text-box"> {this.props.wind} <span className="vel">Km/h</span></div>
            </div>
            </div>
        </Col>
    }
}



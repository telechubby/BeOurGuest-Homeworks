import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet-routing-machine';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Marker, Popup } from 'react-leaflet'
import { MDBBtn } from 'mdb-react-ui-kit';
import Routing from './Routing.jsx';

var eventIcon = L.icon({
    iconUrl: require('../img/markers/marker-icon-blue.png'),
    shadowUrl: require('../img/markers/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -41],
    shadowSize: [41, 41]
});

export class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: false
        }
        this.displayRoute = this.displayRoute.bind(this);
        this.removeRoute = this.removeRoute.bind(this);
    }

    displayRoute() {
        this.setState({
            displayed: true
        });
    }

    removeRoute() {
        this.setState({
            displayed: false
        });
    }
    
    render() {
        return (
            <Marker position={this.props.eventLocation} icon={eventIcon}>
                <Popup>
                    <h2 className='text-center'>{this.props.eventOrg}</h2><br />
                    <h4 className='text-center'>{this.props.eventTitle}</h4><br />
                    <h6>{this.props.eventDescription}</h6><br />
                    <h5 className='text-center'>{this.props.eventStart}</h5><br />
                    <img src={require('../img/events/woodstock.jpg')} width="305" height="180"/><br />
                    <div className='text-center'>
                        { !this.state.displayed ? 
                        ( <MDBBtn color='dark' className='mt-4' onClick={this.displayRoute}>Get Directions <i className='fa fa-arrow-right' /></MDBBtn> )
                        : ( 
                                <>
                                    <MDBBtn color='dark' className='mt-4' onClick={this.removeRoute}>Remove Route <i className='fa fa-arrow-right' /></MDBBtn>
                                    <Routing user={this.props.userLocation} event={this.props.eventLocation} /> 
                                </>
                            ) 
                        }
                    </div>
                </Popup>
            </Marker>
        )
    }
}

export default Event
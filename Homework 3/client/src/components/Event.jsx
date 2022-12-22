//components
import React, { Component, useEffect} from 'react'
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet-routing-machine';
import Routing from './Routing.jsx';

//styles
import '../styles/Event.css'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MDBBtn } from 'mdb-react-ui-kit';

//custom marker icon
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
        this.setDisplay = this.setDisplay.bind(this);
        this.removeDisplay = this.removeDisplay.bind(this);
    }

    setDisplay() {
        this.setState({
            displayed: true
        });
    }
    removeDisplay() {
        this.setState({
            displayed: false
        });
    }

    render() {
        return (
            <>
                { this.state.displayed && <MDBBtn color='danger' className='refreshButton mt-3 ms-3' onClick={() => { this.props.removeRoute(); this.removeDisplay()}}><i className="fa fa-times me-2" aria-hidden="true"></i> Remove Route</MDBBtn> }

                <Marker position={this.props.eventLocation} icon={eventIcon}>
                    <Popup>
                        <h2 className='text-center'>{this.props.eventOrg}</h2><br />
                        <h4 className='text-center'>{this.props.eventTitle}</h4><br />
                        <h6>{this.props.eventDescription}</h6><br />
                        <h5 className='text-center'>{this.props.eventStart}</h5><br />
                        <img src={require(`./assets/events/${this.props.eventImage}`)} width="305" height="180"/><br />
                        <div className='text-center'>
                            { this.state.displayed && <Routing user={this.props.userLocation} event={this.props.eventLocation} /> }
                            <MDBBtn color='dark' className='mt-4' onClick={() => { this.props.displayRoute(); this.setDisplay()}} disabled={this.props.value}>Get Directions <i className='fa fa-arrow-right' /></MDBBtn> 
                        </div>
                    </Popup>
                </Marker>
            </>  
        )
    }
}

export default Event
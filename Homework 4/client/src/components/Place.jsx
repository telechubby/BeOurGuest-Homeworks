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

export class Place extends Component {
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
                        <h2 className='text-center'>{this.props.eventOrg}</h2>
                        <div className='text-center'>
                            <MDBBtn color='dark' className='mt-0' style={{margin:'10px 0', textDecoration:"none", color:"white", width:"90%"}} href={'/places?id='+this.props.eventId}>Show place</MDBBtn> 
                        </div>
                        <div className='text-center'>
                            <MDBBtn color='dark' className='mt-0' style={{margin:'10px 0', textDecoration:"none", color:"white", width:"90%"}} href={'/events?id='+this.props.eventId}>Show events for this place</MDBBtn> 
                        </div>
                        <div className='text-center'>
                            { this.state.displayed && <Routing user={this.props.userLocation} event={this.props.eventLocation} /> }
                            <MDBBtn color='danger' className='mt-0' style={{margin:'10px 0', width:"90%"}} onClick={() => { this.props.displayRoute(); this.setDisplay()}} disabled={this.props.value}>Get Directions <i className='fa fa-arrow-right' /></MDBBtn> 
                        </div>
                        </Popup>
                </Marker>
            </>  
        )
    }
}

export default Place
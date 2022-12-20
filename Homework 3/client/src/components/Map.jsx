import React, { Component, useEffect} from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

//styles
import '../styles/Map.css';
import { MDBBtn } from 'mdb-react-ui-kit';

//components
import Routing from './Routing.jsx';

//custom marker icons
var eventIcon = L.icon({
    iconUrl: require('../img/markers/marker-icon-blue.png'),
    shadowUrl: require('../img/markers/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -41],
    shadowSize: [41, 41]
});

var userIcon = L.icon({
    iconUrl:  require('../img/markers/marker-icon-red.png'),
    shadowUrl: require('../img/markers/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -41],
    shadowSize: [41, 41]
});


class Map extends Component {
    //base state that stores latitute and longtitude coordinates of the city Berlin and the zoom level on the map
    state = {
        location: {
            lat: 41.9972,
            lng: 21.4331,
        },
        zoom: 16,
        allowedLocation: false,
        displayed: false
    }

    /*Called when the page is loaded, if the user denies access through their browser we get their location through their IP address using ipAPI
      Update the state after the user is located*/
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                allowedLocation: true
            });
        }, () => {
            console.log('ERROR: Location access denied! Fetching location based on IP address.');
            fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then(location => {
                    this.setState({
                        location: {
                            lat: location.latitude,
                            lng: location.longitude
                        },
                        allowedLocation: true
                    });
                });
        });
    }

    displayRoute = (event) => {
        this.setState({
            displayed: true
        });
    }

    //Map and marker rendering, flying animation when the user is located
    render() {
        const position = [this.state.location.lat, this.state.location.lng];

        const FlyMapTo = () => {
            const map = useMap()
        
            useEffect(() => {
                map.flyTo(position)
            }, [position])

            return null
        }

        return (
            <MapContainer className='map' center={position} zoom={this.state.zoom} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    this.state.allowedLocation?
                    <Marker position={position} icon={userIcon}>
                        <Popup>
                            Among Us.
                        </Popup>
                    </Marker> 
                    :""
                }
                <Marker position={[41.99556830573725, 21.411310806864552]} icon={eventIcon}>
                    <Popup >
                        <h2 className='text-center'>Rock bar "Woodstock"</h2><br />
                        <h4 className='text-center'>Codechem New Years Party</h4><br />
                        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h6><br />
                        <h5 className='text-center'>13.10.2022 @ 21:30</h5><br />
                        <img src={require('../img/events/woodstock.jpg')} width="305" height="180"/><br />
                        <div className='text-center'>
                            { this.state.displayed && <Routing user={position}  event={[41.99556830573725, 21.411310806864552]}/> }
                            <MDBBtn color='dark' className='mt-4' onClick={()=>{this.displayRoute()}}>Get Directions <i className='fa fa-arrow-right' /></MDBBtn>
                        </div>
                    </Popup>
                </Marker>
                <Marker position={[41.986663126758536, 21.43136836559754]} icon={eventIcon}>
                    <Popup>
                    <h2 className='text-center'>Pub "Beertija"</h2><br />
                        <h4 className='text-center'>Trivija Night</h4><br />
                        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h6><br />
                        <h5 className='text-center'>13.10.2022 @ 21:30</h5><br />
                        <img src={require('../img/events/woodstock.jpg')} width="305" height="180"/><br />
                        <div className='text-center'>
                            { this.state.displayed && <Routing user={position}  event={[41.986663126758536, 21.43136836559754]}/> }
                            <MDBBtn color='dark' className='mt-4' onClick={()=>{this.displayRoute()}}>Get Directions <i className='fa fa-arrow-right' /></MDBBtn>
                        </div>
                    </Popup>
                </Marker>
                <Marker position={[41.99586278632345, 21.42475615273467]} icon={eventIcon}>
                    <Popup>
                        <h2 className='text-center'>Club "Epicentar"</h2><br />
                        <h4 className='text-center'>Techno Night</h4><br />
                        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h6><br />
                        <h5 className='text-center'>13.10.2022 @ 21:30</h5><br />
                        <img src={require('../img/events/woodstock.jpg')} width="305" height="180"/><br />
                        <div className='text-center'>
                            { this.state.displayed && <Routing user={position}  event={[41.99586278632345, 21.42475615273467]}/> }
                            <MDBBtn color='dark' className='mt-4' onClick={()=>{this.displayRoute()}}>Get Directions <i className='fa fa-arrow-right' /></MDBBtn>
                        </div>
                    </Popup>
                </Marker>
                <Marker position={[41.989503524764686, 21.459925277428475]} icon={eventIcon}>
                    <Popup>
                        <h2 className='text-center'>Club "Sistem"</h2><br />
                        <h4 className='text-center'>Exyu Night</h4><br />
                        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h6><br />
                        <h5 className='text-center'>13.10.2022 @ 21:30</h5><br />
                        <img src={require('../img/events/woodstock.jpg')} width="305" height="180"/><br />
                        <div className='text-center'>
                            { this.state.displayed && <Routing user={position}  event={[41.989503524764686, 21.459925277428475]}/> }
                            <MDBBtn color='dark' className='mt-4' onClick={()=>{this.displayRoute()}}>Get Directions <i className='fa fa-arrow-right' /></MDBBtn>
                        </div>
                    </Popup>
                </Marker>
                <FlyMapTo />
                
            </MapContainer>
        );
    }
}

export default Map
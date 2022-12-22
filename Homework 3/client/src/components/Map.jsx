//components
import React, { Component, useEffect} from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import Event from './Event';

//styles
import '../styles/Map.css';

//custom marker icon
var userIcon = L.icon({
    iconUrl:  require('../img/markers/marker-icon-red.png'),
    shadowUrl: require('../img/markers/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -41],
    shadowSize: [41, 41]
});

class Map extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            location: {
                lat: 41.9972,
                lng: 21.4331,
            },
            zoom: 16,
            allowedLocation: false,
            displayed: false
        }
        this.displayRoute = this.displayRoute.bind(this);
        this.removeRoute = this.removeRoute.bind(this);
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
                { this.state.allowedLocation &&
                    <Marker position={position} icon={userIcon}>
                        <Popup>
                            Among Us.
                        </Popup>
                    </Marker> 
                }
                <Event 
                    userLocation={position} 
                    eventLocation={[41.99556830573725, 21.411310806864552]}
                    eventOrg='Rock bar "Woodstock"'
                    eventTitle="Rock Party!"
                    eventDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                    eventStart="13.10.2022 @ 21:30"
                    eventImage="woodstock.jpg"
                    displayRoute={this.displayRoute}
                    removeRoute={this.removeRoute}
                    value={this.state.displayed}
                />
                <Event 
                    userLocation={position} 
                    eventLocation={[41.986663126758536, 21.43136836559754]}
                    eventOrg='Pub "Beertija"'
                    eventTitle="Trivia Night!"
                    eventDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                    eventStart="14.10.2022 @ 22:30"
                    eventImage="beertija.jpg"
                    displayRoute={this.displayRoute}
                    removeRoute={this.removeRoute}
                    value={this.state.displayed}
                />
                <FlyMapTo />
            </MapContainer>
        );
    }
}

export default Map
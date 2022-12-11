import React, { Component} from 'react';
import L from 'leaflet';
import {useEffect, useState} from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

//styles
import '../styles/Map.css';

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
        allowedLocation: false
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
            <MapContainer className='map' center={position} zoom={this.state.zoom} scrollWheelZoom={true}>
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
                    </Marker>:""
                }
                <Marker position={[41.99556830573725, 21.411310806864552]} icon={eventIcon}>
                    <Popup>
                        Location: Rock bar "Woodstock" <br />Event Name: Rock Party <br />Date: 13.10.2022 <br />Start Time: 21:30
                    </Popup>
                </Marker>
                <Marker position={[41.986663126758536, 21.43136836559754]} icon={eventIcon}>
                    <Popup>
                        Location: Pub "Beertija" <br />Event Name: Trivia <br />Date: 13.10.2022 <br />Start Time: 20:00
                    </Popup>
                </Marker>
                <Marker position={[41.99586278632345, 21.42475615273467]} icon={eventIcon}>
                    <Popup>
                        Location: Club "Epicentar" <br />Event Name: Techno <br />Date: 14.10.2022 <br />Start Time: 00:00
                    </Popup>
                </Marker>
                <Marker position={[41.989503524764686, 21.459925277428475]} icon={eventIcon}>
                    <Popup>
                        Location: Pub "Sistem" <br />Event Name: Party <br />Date: 13.10.2022 <br />Start Time: 21:00
                    </Popup>
                </Marker>
                <FlyMapTo />
            </MapContainer>
        );
    }
}

export default Map
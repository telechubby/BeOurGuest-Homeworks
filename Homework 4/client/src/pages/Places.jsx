import React, { Suspense, useState } from 'react'
import "../styles/Places.css"
import { RoleContext } from '../RoleContext.js';
import { useLocation } from 'react-router-dom';
import {
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useContext, useEffect } from 'react';
import { DeletePlaceModal } from '../components/DeletePlaceModal';
import { EditPlaceModal } from '../components/EditPlaceModal';

function Places() {
    return (
        <Suspense fallback={<h2>Loading places...</h2>}><LoadPlaces /></Suspense>
    );
}

function LoadPlaces() {
    const { role } = useContext(RoleContext);
    const [places, setPlaces] = useState([])
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [selectedPlace, setSelectedPlace] = useState()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [searchField, setSearchField] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const placeID = queryParams.get('id')
    const ownerID = queryParams.get('owner_id')
    useEffect(() => {
        async function fetchData() {
            if (placeID !== undefined && placeID !== null) {
                const tmpPlaces = []
                const response = await fetch('http://'+process.env.REACT_APP_BASE_URL+'/places?id=' + placeID)
                const responseJSON = await response.json()
                responseJSON.forEach((fetchedPlace) => {
                    var place = fetchedPlace
                    tmpPlaces.push(place)
                })
                setFilteredPlaces(tmpPlaces)
                setPlaces(tmpPlaces)
            }
            else if (ownerID !== undefined && ownerID !== null) {
                const tmpPlaces = []
                const response = await fetch('http://'+process.env.REACT_APP_BASE_URL+'/ownerplaces?id=' + ownerID)
                const responseJSON = await response.json()
                responseJSON.forEach((fetchedPlace) => {
                    var place = fetchedPlace
                    tmpPlaces.push(place)
                })
                setFilteredPlaces(tmpPlaces)
                setPlaces(tmpPlaces)
                console.log(responseJSON)
            }
            else {
                const tmpPlaces = []
                const response = await fetch('http://'+process.env.REACT_APP_BASE_URL+'/places')
                const responseJSON = await response.json()
                responseJSON.forEach((fetchedPlace) => {
                    var place = fetchedPlace
                    tmpPlaces.push(place)
                })
                setFilteredPlaces(tmpPlaces)
                setPlaces(tmpPlaces)
            }
        }

        fetchData();
    }, [])
    let handleChange = t => {
        setFilteredPlaces(places.filter(e => transliterate(e.Name.toLowerCase()).includes(transliterate(t.target.value.toLowerCase())) || e.Amenity.toLowerCase().includes(transliterate(t.target.value.toLowerCase()))))
    }

    let firstLetterUpper = text => {
        return text[0].toUpperCase() + text.substring(1)
    }

    function transliterate(word) {
        var answer = ""
            , a = {};

        a["Ё"] = "Yo"; a["Й"] = "I"; a["Ц"] = "C"; a["У"] = "U"; a["К"] = "K"; a["Е"] = "E"; a["Н"] = "N"; a["Г"] = "G"; a["Ш"] = "Sh"; a["Щ"] = "Sch"; a["З"] = "Z"; a["Х"] = "H"; a["Ъ"] = "'";
        a["ё"] = "yo"; a["й"] = "i"; a["ц"] = "c"; a["у"] = "u"; a["к"] = "k"; a["е"] = "e"; a["н"] = "n"; a["г"] = "g"; a["ш"] = "sh"; a["щ"] = "sch"; a["з"] = "z"; a["х"] = "h"; a["ъ"] = "'";
        a["Ф"] = "F"; a["Ы"] = "I"; a["В"] = "V"; a["А"] = "А"; a["П"] = "P"; a["Р"] = "R"; a["О"] = "O"; a["Л"] = "L"; a["Д"] = "D"; a["Ж"] = "Zh"; a["Э"] = "E"; a['Ќ'] = 'Kj'; a['Џ'] = 'Dj';
        a["ф"] = "f"; a["ы"] = "i"; a["в"] = "v"; a["а"] = "a"; a["п"] = "p"; a["р"] = "r"; a["о"] = "o"; a["л"] = "l"; a["д"] = "d"; a["ж"] = "zh"; a["э"] = "e"; a['ќ'] = 'kj'; a['џ'] = 'dj';
        a["Я"] = "Ya"; a["Ч"] = "Ch"; a["С"] = "S"; a["М"] = "M"; a["И"] = "I"; a["Т"] = "T"; a["Ь"] = "'"; a["Б"] = "B"; a["Ю"] = "Yu";
        a["я"] = "ya"; a["ч"] = "ch"; a["с"] = "s"; a["м"] = "m"; a["и"] = "i"; a["т"] = "t"; a["ь"] = "'"; a["б"] = "b"; a["ю"] = "yu";

        for (var i in word) {
            if (word.hasOwnProperty(i)) {
                if (a[word[i]] === undefined) {
                    answer += word[i];
                } else {
                    answer += a[word[i]];
                }
            }
        }
        return answer;
    }

    return (
        <>
            <div id="places" style={{ "overflowY": "scroll", "height": "88vh", "margin": "auto" }}>
                <div id="search" style={{ "marginTop": "20px" }}>
                    <input id="searchBox"
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3 form-control"
                        type="search"
                        placeholder="Search Places"
                        onChange={handleChange}
                        style={{ "width": "50%", "margin": "auto" }}
                    ></input>
                </div>
                <div className='title' >Explore places</div>

                
                {role === "manager" &&
                            <div><MDBBtn style={{ "margin": "50px" }} color='dark' outline size='lg' href='/addplace'>Add Place</MDBBtn></div>        
                }

                {filteredPlaces.map(place => (
                    <div className="place" style={{ "margin": "50px" }} key={place._id}>
                        <div>
                            {(role === "manager" || role === "admin") &&
                            <><div><MDBBtn className='shadow-4 float-end m-4' color='dark' onClick={()=> {setSelectedPlace(place); setIsEditModalVisible(true); }}><MDBIcon  fas /> Edit</MDBBtn></div>
                                <div><MDBBtn className='shadow-4 float-end m-4' color='dark' onClick={() => { setSelectedPlace(place); setIsDeleteModalVisible(true); }}><MDBIcon  fas /> Delete</MDBBtn></div></>
                            }
                            <h2>{place.Name}</h2>
                            <h6>{firstLetterUpper(place.Amenity.replace("_", " ").replace(";", ", "))}</h6>
                            <h5>{"Location: " + place.Street + " - " + place.Suburb}</h5>
                            {place['Working hours'] ? <h5>{"Working hours: " + String(place['Working hours']).replace('; ', ' | ').replace(', ', ' | ')}</h5> : ""}
                            {place.Website ? <a href={place.Website} target='_blank' rel="noreferrer">{"Website : " + place.Website}<br /></a> : ""}
                            {place['Phone no'] !== undefined ? <a href={'tel:' + place['Phone no'][""]}>{"Phone: " + place['Phone no'][""].split(';')[0]}</a> : ""}

                            
                        </div>
                    </div>
                ))}
                
            </div>
            {selectedPlace !== undefined && <DeletePlaceModal isVisible={isDeleteModalVisible} setIsVisible={setIsDeleteModalVisible} place={selectedPlace} />}
            {selectedPlace !== undefined && <EditPlaceModal isVisible={isEditModalVisible} setIsVisible={setIsEditModalVisible} place={selectedPlace} />}
        </>
    )
}


export default Places
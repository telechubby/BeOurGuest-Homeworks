import React, { Suspense, useState} from 'react'
import "../styles/Places.css"
import { Link, renderMatches, useLocation } from 'react-router-dom';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
function Places (){
        return (
            <Suspense fallback={<h2>Loading places...</h2>}><LoadPlaces/></Suspense>
        );
}




function LoadPlaces(){
    const [places,setPlaces]=useState([])
    const [filteredPlaces,setFilteredPlaces]=useState([])
    const [searchField, setSearchField] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
        useEffect(()=>{
            async function fetchData(){
                    const tmpPlaces=[]
                    const response=await fetch('http://localhost:9000/places')
                    const responseJSON=await response.json()
                    responseJSON.forEach((fetchedPlace)=>{
                        var place=fetchedPlace
                        tmpPlaces.push(place)
                    })
                    setFilteredPlaces(tmpPlaces)
                    setPlaces(tmpPlaces)
                
            }

            fetchData();
        },[])
        let handleChange=t=>{
            setFilteredPlaces(places.filter(e=>e.Name.toLowerCase().includes(t.target.value.toLowerCase())))
        }
        

        return(
            <div id="places" style={{"overflowY":"scroll","height":"88vh","margin":"auto"}}>
                <div id="search" style={{"marginTop":"20px"}}>
                <input id="searchBox"
                    className="pa3 bb br3 grow b--none bg-lightest-blue ma3 form-control"
                    type = "search" 
                    placeholder = "Search Places"
                    onChange={handleChange}
                    style={{"width":"50%", "margin":"auto"}}
                    ></input>
                </div>
                <div className='title' >Листа на локали</div>
                {filteredPlaces.map(place=>(
                    <div className="place" style={{"margin":"50px"}} > 
                    <h2>{"Место: " + place.Name}</h2>
                    <h6>{"Тип: " + place.Amenity}</h6>
                    <h5>{"Локација: " + place.Street + " - " + place.Suburb}</h5>
                    <h5>{"Работно време: " + place.WorkingHours}</h5>
                    <a href={place.Website} target='_blank'>{"Контакт : " + place.Website}</a>
                    </div>
                ))}
            </div>
        )
}


export default Places
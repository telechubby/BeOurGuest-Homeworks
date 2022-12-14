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
    const placeID=queryParams.get('id')
    const ownerID=queryParams.get('owner_id')
        useEffect(()=>{
            async function fetchData(){
                    if(placeID!==undefined && placeID!==null){
                        const tmpPlaces=[]
                        const response=await fetch('http://localhost:9000/places?id='+placeID)
                        const responseJSON=await response.json()
                        responseJSON.forEach((fetchedPlace)=>{
                            var place=fetchedPlace
                            tmpPlaces.push(place)
                        })
                        setFilteredPlaces(tmpPlaces)
                        setPlaces(tmpPlaces)
                    }
                    else if(ownerID!==undefined && ownerID!==null){
                        const tmpPlaces=[]
                        const response=await fetch('http://localhost:9000/places/ownerplaces?id='+ownerID)
                        const responseJSON=await response.json()
                        responseJSON.forEach((fetchedPlace)=>{
                            var place=fetchedPlace
                            tmpPlaces.push(place)
                        })
                        setFilteredPlaces(tmpPlaces)
                        setPlaces(tmpPlaces)
                        console.log(responseJSON)
                    }
                    else{
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
            }

            fetchData();
        },[])
        let handleChange=t=>{
            setFilteredPlaces(places.filter(e=>transliterate(e.Name.toLowerCase()).includes(transliterate(t.target.value.toLowerCase())) || e.Amenity.toLowerCase().includes(transliterate(t.target.value.toLowerCase()))))
        }

        let firstLetterUpper=text=>{
            return text[0].toUpperCase()+text.substring(1)
        }
        
        function transliterate(word){
            var answer = ""
              , a = {};
        
           a["??"]="Yo";a["??"]="I";a["??"]="C";a["??"]="U";a["??"]="K";a["??"]="E";a["??"]="N";a["??"]="G";a["??"]="Sh";a["??"]="Sch";a["??"]="Z";a["??"]="H";a["??"]="'";
           a["??"]="yo";a["??"]="i";a["??"]="c";a["??"]="u";a["??"]="k";a["??"]="e";a["??"]="n";a["??"]="g";a["??"]="sh";a["??"]="sch";a["??"]="z";a["??"]="h";a["??"]="'";
           a["??"]="F";a["??"]="I";a["??"]="V";a["??"]="??";a["??"]="P";a["??"]="R";a["??"]="O";a["??"]="L";a["??"]="D";a["??"]="Zh";a["??"]="E";a['??']='Kj';a['??']='Dj';
           a["??"]="f";a["??"]="i";a["??"]="v";a["??"]="a";a["??"]="p";a["??"]="r";a["??"]="o";a["??"]="l";a["??"]="d";a["??"]="zh";a["??"]="e";a['??']='kj';a['??']='dj';
           a["??"]="Ya";a["??"]="Ch";a["??"]="S";a["??"]="M";a["??"]="I";a["??"]="T";a["??"]="'";a["??"]="B";a["??"]="Yu";
           a["??"]="ya";a["??"]="ch";a["??"]="s";a["??"]="m";a["??"]="i";a["??"]="t";a["??"]="'";a["??"]="b";a["??"]="yu";
        
           for (var i in word){
             if (word.hasOwnProperty(i)) {
               if (a[word[i]] === undefined){
                 answer += word[i];
               } else {
                 answer += a[word[i]];
               }
             }
           }
           return answer;
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
                <div className='title' >Explore places</div>
                {filteredPlaces.map(place=>(
                    <div className="place" style={{"margin":"50px"}}  key={place._id}> 
                    <h2>{place.Name}</h2>
                    <h6>{firstLetterUpper(place.Amenity.replace("_"," ").replace(";",", "))}</h6>
                    <h5>{"Location: " + place.Street + " - " + place.Suburb}</h5>
                    {place['Working hours']?<h5>{"Working hours: " + String(place['Working hours']).replace('; ',' | ').replace(', ',' | ')}</h5>:""}
                    {place.Website?<a href={place.Website} target='_blank'>{"Website : " + place.Website}<br/></a>:""}
                    {place['Phone no']!==undefined?<a href={'tel:'+place['Phone no'][""]}>{"Phone: "+place['Phone no'][""].split(';')[0]}</a>:""}
                    </div>
                ))}
            </div>
        )
}


export default Places
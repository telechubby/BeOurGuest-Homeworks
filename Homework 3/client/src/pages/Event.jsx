import React, { Suspense, useState} from 'react'
import { Link, renderMatches } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
function Event (){
    
    let params = window.location.href.split('/')[3]
    let images=[]
        return (
            <Suspense fallback={<h2>Loading events...</h2>}><LoadEvents/></Suspense>
        );
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

function LoadEvents(){
    const [events,setEvents]=useState([])

        useEffect(()=>{
            async function fetchData(){
                const tmpEvents=[]
                const response=await fetch('http://localhost:9000/events/')
                const responseJSON=await response.json()
                responseJSON.forEach((fetchedEvent)=>{
                    var base64Flag = 'data:image;base64,';
                    var imageStr =arrayBufferToBase64(fetchedEvent.image.data);
                    var event=fetchedEvent
                    event.image=base64Flag+imageStr
                    tmpEvents.push(event)
                })
                setEvents(tmpEvents)
            }

            fetchData();
        },[])
        return(
            <div id="events">
                {events.map(event=>(
                    <div key={event.image} style={{"overflowY":"scroll","maxHeight":"94vh","width":"86vw","margin":"auto"}}>
                        <div style={{"display":"block","margin":"30px 30px","borderBottom":"1px solid gray","paddingBottom":"10px"}} key={event.image}>
                    <h2>{event.name}</h2>
                    <h3>{event.description}</h3>
                    <h3>Time: {event.startTime} - {event.endTime}</h3>
                    <h3>Contact: <a href={"tel:"+event.contact}>{event.contact}</a></h3>
                    </div>
                    
                    <div style={{"display":"block","margin":"30px 30px","borderBottom":"1px solid gray","paddingBottom":"10px"}}>
                    <img src={event.image} alt="Couldn't load" style={{"display": "block",
                        "minHeight":"200px",
                        "width": "auto",
                        "height": "25vh"}}/>
                    </div>
                </div>
                ))}
            </div>
        )
}
export default Event
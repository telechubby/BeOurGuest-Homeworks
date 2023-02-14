import React, { Suspense, useState} from 'react'
import { RoleContext } from '../RoleContext.js';
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
import { DeleteEventModal } from '../components/DeleteEventModal';
import { EditEventModal } from '../components/EditEventModal';
import { useContext } from 'react';
function Events (){
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
    const { role, setRole } = useContext(RoleContext);
    const [events,setEvents]=useState([])
    const [filteredEvents,setFilteredEvents]=useState([])

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)

    const [searchField, setSearchField] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const eventID=queryParams.get('id')
    const mine=queryParams.get('mine')
        useEffect(()=>{
            async function fetchData(){
                if(eventID!==null){
                    try{
                        const tmpEvents=[]
                        const response=await fetch('https://'+process.env.REACT_APP_BASE_URL+'events?id='+eventID)
                        const responseJSON=await response.json()
                        var base64Flag = 'data:image;base64,';
                        var imageStr =arrayBufferToBase64(responseJSON.image.data);
                        var event=responseJSON
                        event.image=base64Flag+imageStr
                        tmpEvents.push(event)
                        setEvents(tmpEvents)
                    }
                    catch{
                        const tmpEvents=[]
                    const response=await fetch('https://'+process.env.REACT_APP_BASE_URL+'/events/')
                    const responseJSON=await response.json()
                    responseJSON.forEach((fetchedEvent)=>{
                        var base64Flag = 'data:image;base64,';
                        var imageStr =arrayBufferToBase64(fetchedEvent.image.data);
                        var event=fetchedEvent
                        event.image=base64Flag+imageStr
                        tmpEvents.push(event)
                    })
                    setEvents(tmpEvents)
                    setFilteredEvents(tmpEvents)
                    }
                }
                else{
                    const tmpEvents=[]
                    const response=await fetch('https://'+process.env.REACT_APP_BASE_URL+'/events/')
                    const responseJSON=await response.json()
                    responseJSON.forEach((fetchedEvent)=>{
                        var base64Flag = 'data:image;base64,';
                        var imageStr =arrayBufferToBase64(fetchedEvent.image.data);
                        var event=fetchedEvent
                        event.image=base64Flag+imageStr
                        tmpEvents.push(event)
                    })
                    setFilteredEvents(tmpEvents)
                    setEvents(tmpEvents)
                }
            }

            fetchData();
        },[])

        let handleChange=t=>{
            setFilteredEvents(events.filter(e=>e.name.toLowerCase().includes(t.target.value.toLowerCase()) || e.description.toLowerCase().includes(t.target.value.toLowerCase())))
        }

        return(
            <>
            <div id="events" style={{"overflowY":"scroll","height":"88vh","margin":"auto"}}>
                <div id="search" style={{"marginTop":"20px"}}>
                <input id="searchBox"
                    className="pa3 bb br3 grow b--none bg-lightest-blue ma3 form-control"
                    type = "search" 
                    placeholder = "Search Events"
                    onChange={handleChange}
                    style={{"width":"50%", "margin":"auto"}}
                    ></input>
                </div>

                {/* {role === "manager" &&
                            <div><MDBBtn style={{ "margin": "50px" }} color='dark' outline size='lg' href='/createevent'>Add Event</MDBBtn></div>        
                } */}


                {filteredEvents.map(event=>(
                    
                    <div className="event" key={event.image}> 
                        <div key={event.image} style={{"maxHeight":"94vh","margin":"auto", 
                    "display":'flex', "flexWrap":'wrap', "paddingTop":"50px","paddingBottom":"50px", "borderBottom":"1px solid gray"}}>
                        <div style={{"margin":"auto", "textAlign":"center", "width":"250", "padding":"20px"}} key={event.image}>
                    
                    <div>
                    </div>
                    <h2>{event.name}</h2>
                    <h3>{event.description}</h3>
                    <h3>Location: {event.place_name}</h3>
                    <h3>Date: {event.date}</h3>
                    <h3>Time: {event.startTime} - {event.endTime}</h3>
                    <h3>Contact: <a href={"tel:"+event.contact}>{event.contact}</a></h3>
                    </div>
                    
                    <div style={{"margin":"auto", "textAlign":"center", "width":"500px"}}>
                    <img src={event.image} alt="Couldn't load" style={{"display": "block","margin":"auto",
                            "minHeight":"200px",
                            "maxWidth":"500px",
                            "maxHeight":"250px",
                            "width": "auto",
                            "height": "25vh"}}/>
                    {(role === "manager" || role === "admin") &&
                    <><div style={{display:"inline-block"}}><MDBBtn className='shadow-4 m-4' color='dark' onClick={()=> {setSelectedEvent(event); setIsEditModalVisible(true); }}><MDBIcon  fas /> Edit</MDBBtn></div>
                        <div style={{display:"inline-block"}}><MDBBtn className='shadow-4 m-4' color='dark' onClick={() => { setSelectedEvent(event); setIsDeleteModalVisible(true); }}><MDBIcon  fas /> Delete</MDBBtn></div></>
                    }
                    </div>
                </div>
                        

                        
                    </div>
                ))}
            </div>
            {selectedEvent !== undefined && <DeleteEventModal isVisible={isDeleteModalVisible} setIsVisible={setIsDeleteModalVisible} event={selectedEvent} />}
            {selectedEvent !== undefined && <EditEventModal isVisible={isEditModalVisible} setIsVisible={setIsEditModalVisible} event={selectedEvent} />}
            </>
        )
}
export default Events
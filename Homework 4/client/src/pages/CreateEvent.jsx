import React, { Suspense, useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { IDContext } from '../IDContext.js';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBDropdownItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu
} from 'mdb-react-ui-kit';

function CreateEvent() {
    return (
        <Suspense fallback={<h2>Loading places...</h2>}><LoadCreateEvent /></Suspense>
    );
}

function LoadCreateEvent()
{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [image, setImage] = useState("");
    const [contact, setContact] = useState("");
    const [terms,setTerms]=useState(false);
    const [message,setMessage]=useState("");
    const [placeName,setPlaceName]=useState("Select location for your event");
    const [places, setPlaces]=useState([])
    const [location, setLocation]=useState("Select location for your event")
    const {id,setId} = useContext(IDContext);

    useEffect(() => {

        let datePicker=document.getElementById('eventDate')
        datePicker.setAttribute('min',new Date().toISOString().split("T")[0])
        async function fetchData() {
            const tmpPlaces = []
            const response = await fetch(process.env.REACT_APP_BASE_URL+'/places/ownerplaces?id='+id)
            const responseJSON = await response.json()
            setPlaces(responseJSON)
        }

        fetchData();
    }, [])

    const createEvent=async()=>{
        console.log(places.filter(place=>place._id===location))
        const data = new FormData();
        data.append('file', image);
        data.append('place_id', location);
        data.append('place_name',placeName)
        data.append('name', name);
        data.append('description', description);
        data.append('date', date);
        data.append('startTime', startTime);
        data.append('endTime', endTime);
        data.append('contact', contact);

      const res = await axios.post(process.env.REACT_APP_BASE_URL+'/events/create',data,
          {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
      ).catch(err=>{
          setMessage(err.response.data)
        })
        if(res!==undefined){
          setMessage('Event created!')
        }
  }

    return (
        <MDBContainer className='mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
            <h1 className='mb-4 text-center'>Create event</h1>
            <form>
                <MDBInput className='mb-4 shadow-3' value={name} label='Name' onChange={(e) => setName(e.target.value)} />
                <MDBInput className='mb-4 shadow-3' value={description} label='Description'  onChange={(e) => setDescription(e.target.value)}/>
                <MDBDropdown>
                    <MDBDropdownToggle className='mb-4 shadow-3' style={{width:"100%"}} type='button'>{placeName}</MDBDropdownToggle>
                    <MDBDropdownMenu className='shadow-3' style={{width:"100%"}}>
                        {
                            places.map(place=>{
                                // @ts-ignore
                                return <MDBDropdownItem key={place._id} link onClick={(e)=>{setLocation(place._id);setPlaceName(place.Name)}} style={{textAlign:"center"}}>{place.Name}</MDBDropdownItem>
                            })
                        }
                    </MDBDropdownMenu>
                </MDBDropdown>
                <MDBInput className='mb-4 shadow-3' value={date} label='Date' type='date' min={new Date().toJSON().slice(0,10).replaceAll(/\//g,'-')} id='eventDate' onChange={(e) => setDate(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3' value={startTime} label='StartTime' onChange={(e) => setStartTime(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3' value={endTime} label='EndTime'  onChange={(e) => setEndTime(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3' type='file' accept="image/*" name="image" onChange={(e) => setImage(
// @ts-ignore
                e.target.files[0])}/>
                <MDBInput className='mb-4 shadow-3'  label='Contact'  onChange={(e) => setContact(e.target.value)}/>
                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox checked={terms} onChange={(e)=>setTerms(e.target.checked)} label='I accept terms and conditions' />
                    </MDBCol>
                </MDBRow>

                <MDBBtn color='dark' className='mb-4' type='button' onClick={createEvent} block disabled={!name || !description || 
                !startTime || !endTime || !image || !contact || !date || !(terms) || location==='Select location for your event' || placeName==='Select location for your event'}><MDBIcon icon='code' fas />Create Event</MDBBtn>
                <p>{message}</p>
            </form>
        </MDBContainer>
    )
}

export default CreateEvent
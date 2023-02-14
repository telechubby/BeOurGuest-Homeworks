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
            responseJSON.forEach((fetchedPlace) => {
                var place = fetchedPlace
                tmpPlaces.push(place)
            })
            setPlaces(tmpPlaces)
        }

        fetchData();
    }, [])

    const createEvent=async()=>{
        console.log(location)
        const data = new FormData();
        let place_name=places.filter(place=>place._id==location)[0].Name
        data.append('file', image);
        data.append('place_id', location);
        data.append('place_name',place_name)
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
                <MDBInput className='mb-4 shadow-3'  label='Name' onChange={(e) => setName(e.target.value)} />
                <MDBInput className='mb-4 shadow-3'  label='Description'  onChange={(e) => setDescription(e.target.value)}/>
                <MDBDropdown>
                    <MDBDropdownToggle className='mb-4 shadow-3' style={{width:"100%"}} type='button'>{location}</MDBDropdownToggle>
                    <MDBDropdownMenu className='shadow-3' style={{width:"100%"}}>
                        {
                            places.map(place=>{
                                // @ts-ignore
                                return <MDBDropdownItem key={place._id} link onClick={(e)=>setLocation(e.target.innerText)} style={{textAlign:"center"}}>{place.Name}</MDBDropdownItem>
                            })
                        }
                    </MDBDropdownMenu>
                </MDBDropdown>
                <MDBInput className='mb-4 shadow-3'  label='Date' type='date' id='eventDate' onChange={(e) => setDate(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='StartTime' onChange={(e) => setStartTime(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='EndTime'  onChange={(e) => setEndTime(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  type='file' accept="image/*" name="image" onChange={(e) => setImage(
// @ts-ignore
                e.target.files[0])}/>
                <MDBInput className='mb-4 shadow-3'  label='Contact'  onChange={(e) => setContact(e.target.value)}/>
                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox checked={terms} onChange={(e)=>setTerms(e.target.checked)} label='I accept terms and conditions' />
                    </MDBCol>
                </MDBRow>

                <MDBBtn color='dark' className='mb-4' type='button' onClick={createEvent} block disabled={!name || !description || 
                !startTime || !endTime || !image || !contact || !date || !(terms) || location==='Select location for your event'}><MDBIcon icon='code' fas />Create Event</MDBBtn>
                <p>{message}</p>
            </form>
        </MDBContainer>
    )
}

export default CreateEvent
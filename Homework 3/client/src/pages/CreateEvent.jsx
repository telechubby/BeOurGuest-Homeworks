import React, {useState} from 'react'
import axios from 'axios';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

const CreateEvent = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [image, setImage] = useState(null);
    const [contact, setContact] = useState("");
    const [terms,setTerms]=useState(false);
    const [message,setMessage]=useState("");
 
    const createEvent=async()=>{
          const data = new FormData();
          data.append('file', image);
          data.append('place_id', '63a6fa2c0ef5b8c272d1cc2e');
          data.append('name', name);
          data.append('description', description);
          data.append('date', date);
          data.append('startTime', startTime);
          data.append('endTime', endTime);
          data.append('contact', contact);

        const file=image
        const res = await axios.post('http://localhost:9000/events/create',data,
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
                <MDBInput className='mb-4 shadow-3'  label='Date' type='date'  onChange={(e) => setDate(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='StartTime' onChange={(e) => setStartTime(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='EndTime'  onChange={(e) => setEndTime(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  type='file' accept="image/*" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                <MDBInput className='mb-4 shadow-3'  label='Contact'  onChange={(e) => setContact(e.target.value)}/>
                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox value={terms} onChange={setTerms} label='I accept terms and conditions' />
                    </MDBCol>
                </MDBRow>

                <MDBBtn color='dark' className='mb-4' type='button' onClick={createEvent} block disabled={!name || !description || 
                !startTime || !endTime || !image || !contact || !date || !terms}><MDBIcon icon='code' fas />Create Event</MDBBtn>
                <p>{message}</p>
            </form>
        </MDBContainer>
    )
}

export default CreateEvent
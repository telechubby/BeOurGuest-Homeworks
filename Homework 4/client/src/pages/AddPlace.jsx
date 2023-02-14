import React, {useState} from 'react'
import axios from 'axios';
import "../styles/Places.css"
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';



const AddPlace = () => {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [suburb, setSuburb] = useState("");
    const [municipality, setMunicipality] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [phone,setPhone]=useState("");
    const [amenity,setAmenity]=useState("");
    const [cusine,setCusine]=useState("");
    const [website,setWebsite]=useState("");
    const [workinghours,setWorkingHours]=useState("");

    const [terms,setTerms]=useState("false");
    const [message,setMessage]=useState("");
 
    const addPlace=async()=>{
          const data = new FormData();
          
          data.append('name', name);
          data.append('street', street);
          data.append('suburb', suburb);
          data.append('municipality', municipality);
          data.append('longitude', longitude);
          data.append('latitude', latitude);
          data.append('phone', phone);
          data.append('amenity', amenity);
          data.append('cusine', cusine);
          data.append('website', website);
          data.append('workinghours', workinghours);
        const res = await axios.post('https://'+process.env.REACT_APP_BASE_URL+'/places/addPlace',data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).catch(err=>{
            postMessage(err.response.data)
          })
          if(res!==undefined){
            postMessage('Place Added!')
          }
    }

    return (
        <MDBContainer className='mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
            <h1 className='mb-4 text-center'>Add Place</h1>
            <form>
                <MDBInput className='mb-4 shadow-3'  label='Name' onChange={(e) => setName(e.target.value)} />
                <MDBInput className='mb-4 shadow-3'  label='Street'  onChange={(e) => setStreet(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Suburb'  onChange={(e) => setSuburb(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Municipality' onChange={(e) => setMunicipality(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Longitude'  onChange={(e) => setLongitude(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Latitude' onChange={(e) => setLatitude(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Phone' onChange={(e) => setPhone(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Amenity'  onChange={(e) => setAmenity(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Cusine' onChange={(e) => setCusine(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='Website'  onChange={(e) => setWebsite(e.target.value)}/>
                <MDBInput className='mb-4 shadow-3'  label='WorkingHours' onChange={(e) => setWorkingHours(e.target.value)}/>
                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox value={terms} onChange={(e)=>setTerms(e.target.value)} label='I accept terms and conditions' />
                    </MDBCol>
                </MDBRow>

                <MDBBtn color='dark' className='mb-4' type='button' onClick={addPlace} block disabled={!name || !street || 
                !suburb || !municipality || !longitude || !latitude || !phone || !amenity || !cusine || !website || !workinghours}><MDBIcon fas />Add place</MDBBtn>
                <p>{message}</p>
            </form>
        </MDBContainer>
    )
}

export default AddPlace
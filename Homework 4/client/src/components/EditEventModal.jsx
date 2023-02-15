import axios from "axios";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter, MDBCheckbox, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { Component, useEffect, useState } from "react";

export const EditEventModal = ({isVisible,setIsVisible, event, refetch}) => {

  
    const [name, setName] = useState(event.name)
    const [description, setDescription] = useState(event.description);
    const [date, setDate] = useState(event.date);
    const [startTime, setStartTime] = useState(event.startTime);
    const [endTime, setEndTime] = useState(event.endTime);
    const [contact,setContact]=useState(event.contact);

    async function editEvent(){
      let res=await axios.put(process.env.REACT_APP_BASE_URL+'/events/update',{
        id:event._id,
        name:name,
        description:description,
        date:date,
        startTime:startTime,
        endTime:endTime,
        contact:contact
      })
      if(res!==undefined)
      {
        console.log('Updated in DB');
        setIsVisible(false)
        window.location.href="/events";
      }
      else{
        console.log('Error');
      }
    }
    

    useEffect(()=>{console.log(event)},[event])
    return (<MDBModal show={isVisible} setShow={setIsVisible} tabIndex='-1'>
    <MDBModalDialog>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>Edit Event</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={()=>setIsVisible(false)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <form>
          <MDBInput className='mb-4'label='Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <MDBInput className='mb-4'label='Description' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
          <MDBInput className='mb-4'label='Date' type='date' min={new Date().toJSON().slice(0,10).replace('/','-')} value={date} onChange={(e)=>{setDate(e.target.value)}}/>
          <MDBInput className='mb-4'label='StarTime' value={startTime} onChange={(e)=>{setStartTime(e.target.value)}}/>
          <MDBInput className='mb-4'label='EndTime' value={endTime} onChange={(e)=>{setEndTime(e.target.value)}}/>
          <MDBInput className='mb-4'label='Contact' value={contact} onChange={(e)=>{setContact(e.target.value)}}/>
        </form>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={()=>setIsVisible(false)}>
            Close
          </MDBBtn>
          <MDBBtn onClick={editEvent}>Save Event</MDBBtn>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>)
}


import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter, MDBCheckbox, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { Component, useEffect, useState } from "react";

export const EditEventModal = ({isVisible,setIsVisible, event}) => {


    const editEvent=()=>{console.log("edit")
    setIsVisible(false)}
  
    const [name, setName] = useState(event.Name)
    const [palceid,setPlaceID] = useState(event.PlaceID)
    const [description, setDescription] = useState(event.Description);
    const [startTime, setStartTime] = useState(event.StartTime);
    const [date, setDate] = useState(event.Date);
    const [endTime, setEndTime] = useState(event.EndTime);
    const [image,setImage]=useState(event.Image);
    const [contact,setContact]=useState(event.Contact);
  
    

    useEffect(()=>{setName(event.name);},[event])
    return (<MDBModal show={isVisible} setShow={setIsVisible} tabIndex='-1'>
    <MDBModalDialog>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>Edit Event</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={()=>setIsVisible(false)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <form>
          <MDBInput className='mb-4'label='Name' value={name}/>
          <MDBInput className='mb-4'label='PlaceID' value={palceid}/>
          <MDBInput className='mb-4'label='Description' value={description}/>
          <MDBInput className='mb-4'label='StarTtime' value={startTime}/>
          <MDBInput className='mb-4'label='Date' value={date}/>
          <MDBInput className='mb-4'label='EndTime' value={endTime}/>
          <MDBInput className='mb-4'label='Image' value={image}/>
          <MDBInput className='mb-4'label='Contact' value={contact}/>
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


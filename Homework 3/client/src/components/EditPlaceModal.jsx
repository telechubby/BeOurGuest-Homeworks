import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter, MDBCheckbox, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { Component, useEffect, useState } from "react";

export const EditPlaceModal = ({isVisible,setIsVisible, place}) => {


    const editPlace=()=>{console.log("edit")
    setIsVisible(false)}

    const [name, setName] = useState(place.Name)
    const [street,setStreet] = useState(place.Street)
    const [suburb, setSuburb] = useState(place.Suburb);
    const [municipality, setMunicipality] = useState(place.Municipality);
    const [longitude, setLongitude] = useState(place.Longitude);
    const [latitude, setLatitude] = useState(place.Latitude);
    //  ? const [categories, setCategories] = useState("");
    const [phone,setPhone]=useState(place.Phone);
    const [amenity,setAmenity]=useState(place.Amenity);
    const [cusine,setCusine]=useState(place.Cusine);
    const [website,setWebsite]=useState(place.SetWebsite);
    const [workinghours,setWorkingHours]=useState(place.WorkingHours);


    useEffect(()=>{setName(place.name);setStreet(place.Street);},[place])
    return (<MDBModal show={isVisible} setShow={setIsVisible} tabIndex='-1'>
    <MDBModalDialog>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>Edit Place</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={()=>setIsVisible(false)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <form>
          <MDBInput className='mb-4'label='Name' value={name}/>
          <MDBInput className='mb-4'label='Street' value={street}/>
          <MDBInput className='mb-4'label='Suburb' value={suburb}/>
          <MDBInput className='mb-4'label='Municipality' value={municipality}/>
          <MDBInput className='mb-4'label='Longitude' value={longitude}/>
          <MDBInput className='mb-4'label='Latitude' value={latitude}/>
          <MDBInput className='mb-4'label='Phone' value={phone}/>
          <MDBInput className='mb-4'label='Amenity' value={amenity}/>
          <MDBInput className='mb-4'label='Cusine' value={cusine}/>
          <MDBInput className='mb-4'label='Website' value={website}/>
          <MDBInput className='mb-4'label='WorkingHours' value={workinghours}/>
        </form>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={()=>setIsVisible(false)}>
            Close
          </MDBBtn>
          <MDBBtn onClick={editPlace}>Save Place</MDBBtn>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>)
}


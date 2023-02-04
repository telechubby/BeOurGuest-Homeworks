import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import React, { Component } from "react";

export const DeletePlaceModal = ({isVisible,setIsVisible, place}) => {
    const deletePlace=()=>{console.log("implement delete")
    setIsVisible(false)}
    return (<MDBModal show={isVisible} setShow={setIsVisible} tabIndex='-1'>
    <MDBModalDialog>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>Confirm Delete</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={()=>setIsVisible(false)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>Are you sure you want to delete {place.Name} ?</MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={()=>setIsVisible(false)}>
            Close
          </MDBBtn>
          <MDBBtn onClick={deletePlace}>Delete</MDBBtn>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>)
}


import axios from "axios";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import React, { Component } from "react";

export const DeleteEventModal = ({isVisible,setIsVisible, event,refetch}) => {
    async function deleteEvent(){
      let res=await axios.put(process.env.REACT_APP_BASE_URL+'/events/delete',{
        id:event._id
      })
      if(res!==undefined)
      {
        console.log('Deleted in DB');
        setIsVisible(false)
        refetch()
      }
      else{
        console.log('Error');
      }
    }
    return (<MDBModal show={isVisible} setShow={setIsVisible} tabIndex='-1'>
    <MDBModalDialog>
      <MDBModalContent>
        <MDBModalHeader>
          <MDBModalTitle>Confirm Delete</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={()=>setIsVisible(false)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>Are you sure you want to delete {event.Name} ?</MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={()=>setIsVisible(false)}>
            Close
          </MDBBtn>
          <MDBBtn onClick={deleteEvent}>Delete</MDBBtn>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>)
}


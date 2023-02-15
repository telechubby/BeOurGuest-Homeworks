import axios from "axios";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import React, { Component } from "react";

export const DeleteUserModal = ({isVisible,setIsVisible, user, refetch}) => {
  async function deleteUser(){
    let res=await axios.put(process.env.REACT_APP_BASE_URL+'/users/delete',{
        id:user._id
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
        <MDBModalBody>Are you sure you want to delete {user.Name} ?</MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={()=>{setIsVisible(false)}}>
            Close
          </MDBBtn>
          <MDBBtn onClick={deleteUser}>Delete</MDBBtn>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>)
}


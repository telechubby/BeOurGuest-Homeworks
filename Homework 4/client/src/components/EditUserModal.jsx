import axios from "axios";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter, MDBCheckbox, MDBCol, MDBInput, MDBRow,
  MDBDropdownItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu } from "mdb-react-ui-kit";
import React, { Component, useEffect, useState } from "react";

export const EditUserModal = ({isVisible,setIsVisible,userObject,refetch}) => {  
    const [user, setUser] = useState(userObject.name);
    const [role, setRole] = useState(userObject.role);
    async function editUser(){
      let res=await axios.post(process.env.REACT_APP_BASE_URL+'/users/update',{
          id:userObject._id,
          name:user,
          role:role
      })
      if(res!==undefined)
      {
        console.log('Updated in DB');
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
          <MDBModalTitle>Edit User</MDBModalTitle>
          <MDBBtn className='btn-close' color='none' onClick={()=>setIsVisible(false)}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
        <form>
          <MDBInput className='mb-4'label='Name' value={user} onChange={(e)=>setUser(e.target.value)}/>
          <MDBDropdown className='mb-4'>
                    <MDBDropdownToggle className='mb-4 shadow-3' style={{width:"100%"}} type='button'>{role}</MDBDropdownToggle>
                    <MDBDropdownMenu className='shadow-3' style={{width:"100%"}}>
                        <MDBDropdownItem link onClick={(e)=>setRole('user')} style={{textAlign:"center"}}>User</MDBDropdownItem>
                        <MDBDropdownItem link onClick={(e)=>setRole('manager')} style={{textAlign:"center"}}>Manager</MDBDropdownItem>
                        <MDBDropdownItem link onClick={(e)=>setRole('admin')} style={{textAlign:"center"}}>Admin</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
        </form>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={()=>setIsVisible(false)}>
            Close
          </MDBBtn>
          <MDBBtn onClick={()=>{editUser();}}>Save User</MDBBtn>
        </MDBModalFooter>
      </MDBModalContent>
    </MDBModalDialog>
  </MDBModal>)
}


import React, { Suspense, useState} from 'react'
import { RoleContext } from '../RoleContext.js';
import { IDContext } from '../IDContext.js';
import { UserContext } from '../UserContext.js';
import { Link, renderMatches, useLocation } from 'react-router-dom';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { DeleteUserModal } from '../components/DeleteUserModal';
import { EditUserModal } from '../components/EditUserModal';
import { useContext } from 'react';
function Users (){
        return (
            <Suspense fallback={<h2>Loading users...</h2>}><LoadUsers/></Suspense>
        );
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

function LoadUsers(){
    const {role, setRole} = useContext(RoleContext);
    const {id,setId} = useContext(IDContext);
    const [users,setUsers]=useState([])
    const [filteredUsers,setFilteredUsers]=useState([])
    const [update, setUpdate]=useState(false)

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState()
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)

    const [searchField, setSearchField] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    async function fetchData(){
            let tmpUsers=[]
            const response=await fetch(process.env.REACT_APP_BASE_URL+'/users/')
            const responseJSON=await response.json()
            responseJSON.forEach((fetchedUser)=>{
                var user=fetchedUser
                tmpUsers.push(user)
            })
            tmpUsers=tmpUsers.filter(e=>e.role!=='admin')
            setFilteredUsers(tmpUsers)
            setUsers(tmpUsers)
    }

        useEffect(()=>{
            fetchData();
        }, [])

        let handleChange=t=>{
            setFilteredUsers(users.filter(e=>((e.role.toLowerCase().includes(t.target.value.toLowerCase()) || e.name.toLowerCase().includes(t.target.value.toLowerCase()) || e.email.toLowerCase().includes(t.target.value.toLowerCase()))&& e._id!==id)))
        }

        return(
            <>
            <div id="users" style={{"overflowY":"scroll","height":"88vh","margin":"auto"}}>
                <div id="search" style={{"marginTop":"20px"}}>
                    <input id="searchBox"
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3 form-control"
                        type = "search" 
                        placeholder = "Search Users"
                        onChange={handleChange}
                        style={{"width":"50%", "margin":"auto"}}
                        ></input>
                </div>

                <div> 

                {filteredUsers.map(user=>(
                    <div key={user._id} className="user"  > 

                        <div style={{"maxHeight":"94vh","margin":"auto", 
                        "display":'flex', "flexWrap":'wrap', "paddingTop":"50px","paddingBottom":"50px", "borderBottom":"1px solid gray"}}>
                            
                            <div style={{"margin":"auto", "textAlign":"center", "width":"33%", "padding":"20px"}}>
                                <span style={{"fontSize":"3em", "fontWeight":"bold"}}>{user.name}</span>
                            </div>

                            <div style={{"margin":"auto", "textAlign":"center", "width":"33%"}}>
                                <span style={{"fontSize":"2em", "fontWeight":"bold"}}>{user.email}</span>&emsp;&emsp;&emsp;
                                <span style={{"fontSize":"2em", "fontWeight":"bold"}}>{user.role}</span>
                            </div>
                            
                            
                            <div style={{"margin":"auto", "textAlign":"center", "width":"33%", "padding":"20px"}}>
                                <div style={{"display":"inline-block"}}><MDBBtn className='shadow-4 m-4' color='dark' onClick={()=> {setSelectedUser(user); setIsEditModalVisible(true); }}><MDBIcon  fas /> Edit</MDBBtn></div>
                                <div style={{"display":"inline-block"}}><MDBBtn className='shadow-4 m-4' color='dark' onClick={() => {setSelectedUser(user); setIsDeleteModalVisible(true); }}><MDBIcon  fas /> Delete</MDBBtn></div>
                            </div>
                        </div>
                    </div>))}
            {selectedUser !== undefined?<DeleteUserModal isVisible={isDeleteModalVisible} setIsVisible={setIsDeleteModalVisible} user={selectedUser} refetch={fetchData} />:""}
            {selectedUser !== undefined?<EditUserModal isVisible={isEditModalVisible} setIsVisible={setIsEditModalVisible} userObject={selectedUser} refetch={fetchData} />:""}  
            </div>
            </div>
            </>
        )
}
export default Users;
import React, {useState,useContext, useEffect} from 'react'
import { UserContext } from '../UserContext.js';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBInputGroup
} from 'mdb-react-ui-kit';
import { RoleContext } from '../RoleContext.js';
import { IDContext } from '../IDContext.js';

const Settings = () => {
    //useStates

    const {user,setUser} = useContext(UserContext);
    const {role,setRole} = useContext(RoleContext);
    const {id,setId} = useContext(IDContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message,setMessage]=useState("")


    //password validation vars
    let hasEightChar = (password.length >= 8) && (password.length <= 16);
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

    //Clear the forms on button click
    const handleSubmit = (e) => {
       
    }
    const handleName = (val) => {
        setName("");
    };
    const handleEmail = (val) => {
        setEmail("");
    };
    const handlePassword = (val) => {
        setPassword("");
        setConfirmPassword("");
    };

    const updateName = async () =>{
        let res=await axios.put('https://'+process.env.REACT_APP_BASE_URL+'/users/nameUpdate',{
          newName:name,
          id:id
        }, {withCredentials: true}).catch(err=>{
          setMessage(err.response.data)
        })
        if(res!==undefined){
            setMessage(res.data)
        }
        window.location.assign('/settings')
    }

    const updateMail = async () =>{
        let res=await axios.put('https://'+process.env.REACT_APP_BASE_URL+'/users/emailUpdate',{
          newEmail:email,
          id:id
        }, {withCredentials: true}).catch(err=>{
          setMessage(err.response.data)
        })
        if(res!==undefined){
            setMessage(res.data)
        }
        window.location.assign('/settings')
    }

    const updatePassword = async () =>{
        const hash=bcrypt.hashSync(password,'$2a$12$fZuOVnbxBokJcNLepXdQBu')
        let res=await axios.put('https://'+process.env.REACT_APP_BASE_URL+'/users/passwordUpdate',{
          id:id,
          newPass:hash,
        }, {withCredentials: true}).catch(err=>{
          setMessage(err.response.data)
        })
        window.location.assign('/settings')
    }
    
      
    return (
        <MDBContainer className='mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
            <h1>User Settings</h1>
            <h4>My role: {role}</h4>
            <form onSubmit={handleSubmit}>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Name" type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    
                </MDBInputGroup>
                <MDBBtn color='dark' className='mt-1'style={{"marginBottom":"20px"}} type='button' onClick={updateName} block disabled={ 
                    (!(name==null || name.replace(" ","").length>2))
                    }>
                        <MDBIcon icon='code' fas /> Change Name
                </MDBBtn>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </MDBInputGroup>
                <MDBBtn color='dark' className='mt-1'style={{"marginBottom":"20px"}} type='button' onClick={updateMail} block disabled={ 
                    (!(email==null || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)))
                    }>
                        <MDBIcon icon='code' fas /> Change Email
                </MDBBtn>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </MDBInputGroup>
                    <div className='ms-1' style={{columns: 2}}>
                        <div>
                            {hasEightChar ? (
                                <span className='text-success'>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    <small> at least 8 characters</small>
                                </span>
                            ) : (
                                <span className='text-danger'>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                    <small> at least 8 characters</small>
                                </span>
                            )}
                        </div>
                        <div>
                            {hasLowerChar ? (
                                <span className='text-success'>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    <small> at least one lowercase letter</small>
                                </span>
                            ) : (
                                <span className='text-danger'>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                    <small> at least one lowercase letter</small>
                                </span>
                            )}
                        </div>
                        <div>
                            {hasUpperChar ? (
                                <span className='text-success'>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    <small> at least one uppercase letter</small>
                                </span>
                            ) : (
                                <span className='text-danger'>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                    <small> at least one uppercase letter</small>
                                </span>
                            )}
                        </div>
                        <div>
                            {hasNumber ? (
                                <span className='text-success'>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    <small> at least one number</small>
                                </span>
                            ) : (
                                <span className='text-danger'>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                    <small> at least one number</small>
                                </span>
                            )}
                        </div>
                        <div>
                            {hasSpecialChar ? (
                                <span className='text-success'>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    <small> at least one special character</small>
                                </span>
                            ) : (
                                <span className='text-danger'>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                    <small> at least one special character</small>
                                </span>
                            )}
                        </div>
                    </div>

                <input className='form-control' placeholder="Confirm Password" type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                
                    <div className='ms-1' style={{columns: 2}}>
                        <div>
                            { confirmPassword === password ? (
                                <span className='text-success'>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    <small> passwords must match</small>
                                </span>
                            ) : (
                                <span className='text-danger'>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                    <small> passwords must match</small>
                                </span>
                            )}
                        </div>
                    </div>
                
                <MDBBtn color='dark' className='mt-4' type='button' onClick={updatePassword} block disabled={ 
                    ((!(confirmPassword == password) ||
                    (!hasEightChar ||
                    !hasLowerChar ||
                    !hasUpperChar ||
                    !hasNumber ||
                    !hasSpecialChar))
                    )
                    }>
                        <MDBIcon icon='code' fas /> Change Password
                </MDBBtn>
                <p>{message}</p>
            </form>
        </MDBContainer>
    )
}

export default Settings
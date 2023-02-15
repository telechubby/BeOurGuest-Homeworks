import React, {useState, useContext} from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { UserContext } from '../UserContext.js';
import { RoleContext } from '../RoleContext.js';
import { IDContext } from '../IDContext.js';
import { Link } from 'react-router-dom';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const {user,setUser} = useContext(UserContext);
    const {role,setRole} = useContext(RoleContext);
    const {id,setId} = useContext(IDContext);

    async function login(){
        const hash=bcrypt.hashSync(password,'$2a$12$fZuOVnbxBokJcNLepXdQBu')
        let res=await axios.post(process.env.REACT_APP_BASE_URL+'/users/login',{
          email:email,
          password_hash:hash,
        }).catch(err=>{
          setMessage(err.response.data)
        })
        if(res!==undefined){
            setMessage('User logged in successfully. Redirecting to map...')
            setUser(res['data']['username'])
            setRole(res['data']['role'])
            setId(res['data']['id'])
        }
      }

    return (
        <MDBContainer className='mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
            <form>
                <MDBInput className='mb-4 shadow-3' type='email' label='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <MDBInput className='mb-4 shadow-3' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>

                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox label='Remember me' />
                    </MDBCol>
                </MDBRow>

                <MDBBtn color='dark' className='mb-4' type='button' onClick={login} block disabled={!email || !password}><MDBIcon icon='code' fas /> Login</MDBBtn>

                <div className='text-center'>
                    <p>Not a member? <Link to='/signup'>Sign Up</Link></p>
                </div>
                <p>{message}</p>
            </form>
        </MDBContainer>
    )
}

export default Login
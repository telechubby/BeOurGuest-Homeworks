import React, {useState} from 'react'
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

                <MDBBtn color='dark' className='mb-4' block disabled={!email || !password}><MDBIcon icon='code' fas /> Login</MDBBtn>

                <div className='text-center'>
                    <p>Not a member? <Link to='/signup'>Sign Up</Link></p>
                </div>
            </form>
        </MDBContainer>
    )
}

export default Login
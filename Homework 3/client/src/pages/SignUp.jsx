import React, {useState} from 'react';
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
    MDBIcon
} from 'mdb-react-ui-kit';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [message,setMessage]=useState("");

    //password validation vars
    let hasEightChar = (password.length >= 8) && (password.length <= 16);
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

    async function signUp(){
        if(!terms){
          setMessage('You must agree to the terms in order to register')
          return
        }
        else{
          const hash=bcrypt.hashSync(password,'$2a$12$fZuOVnbxBokJcNLepXdQBu')
          const res = await axios.put('http://localhost:9000/users/create',{
            name:name,
            email:email,
            password_hash:hash,
            role: 'user'
          }).catch(err=>{
            setMessage(err.response.data)
          })
          if(res!==undefined){
            setMessage('User created successfully. Redirecting to login...')
            window.location.href='/login'
          }
        }
    }

    return (
        <MDBContainer className='mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
            <form>
                <MDBInput className='mb-4 shadow-3' type='text' label='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <MDBInput className='mb-4 shadow-3' type='email' label='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <MDBInput className='mb-4 shadow-3' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>

                {password &&
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
                }

                <MDBRow className='mb-4 mt-3'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox label='I have read and agree to the terms' checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                    </MDBCol>
                </MDBRow>

                <MDBBtn color='dark' className='mb-4' onClick={signUp} block disabled={
                    !name ||
                    !email || 
                    !password ||
                    !terms ||
                    !hasEightChar ||
                    !hasLowerChar ||
                    !hasUpperChar ||
                    !hasNumber ||
                    !hasSpecialChar}>
                        <MDBIcon icon='code' fas /> Signup
                </MDBBtn>

                <div className='text-center'>
                    <p>Already a member? <Link to='/login'>Login</Link></p>
                </div>
            </form>
        </MDBContainer>
    )
}

export default SignUp
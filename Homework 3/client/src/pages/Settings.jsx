import React, {useState} from 'react'
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

const Settings = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameEdit, unlockNameEdit] = useState(true);
    const [emailEdit, unlockEmailEdit] = useState(true);
    const [passwordEdit, unlockPasswordEdit] = useState(true);

    //password validation vars
    let hasEightChar = (password.length >= 8) && (password.length <= 16);
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
      
    return (
        <MDBContainer className='mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
            <form onSubmit={handleSubmit}>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Name" type='text' disabled={nameEdit} value={name} onChange={(e) => setName(e.target.value)} />
                    <MDBBtn color='dark' onClick={e => { 
                                                        const val = e.target.value;
                                                        unlockNameEdit(prev => !prev)
                                                        }
                                                }
                    >
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </MDBBtn>
                </MDBInputGroup>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Email" type='text' disabled={emailEdit} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MDBBtn color='dark' onClick={e => { 
                                                        const val = e.target.value;
                                                        unlockEmailEdit(prev => !prev)
                                                        }
                                                }
                    >
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </MDBBtn>
                </MDBInputGroup>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Password" type='text' disabled={passwordEdit} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <MDBBtn color='dark' onClick={e => { 
                                                        const val = e.target.value;
                                                        unlockPasswordEdit(prev => !prev)
                                                        }
                                                }
                    >
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </MDBBtn>
                </MDBInputGroup>

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

                <MDBBtn color='dark' className='mt-4' block>
                        <MDBIcon icon='code' fas /> Save Changes
                </MDBBtn>
            </form>
        </MDBContainer>
    )
}

export default Settings
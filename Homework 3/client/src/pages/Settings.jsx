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
    //useStates
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameEdit, unlockNameEdit] = useState(true);
    const [emailEdit, unlockEmailEdit] = useState(true);
    const [passwordEdit, unlockPasswordEdit] = useState(true);

    //password validation vars
    let hasEightChar = (password.length >= 8) && (password.length <= 16);
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

    //Clear the forms on button click
    const handleSubmit = (e) => {
        e.preventDefault();
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
    
      
    return (
        <MDBContainer className='mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
            <h1>User Settings</h1>
            <form onSubmit={handleSubmit}>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Name" type='text' disabled={nameEdit} value={name} onChange={(e) => setName(e.target.value)} />
                    <MDBBtn color='dark' onClick={e => { 
                                                        const val = e.target.value;
                                                        unlockNameEdit(prev => !prev);
                                                        handleName();
                                                        }
                                                }
                    >
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </MDBBtn>
                </MDBInputGroup>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Email" type='email' disabled={emailEdit} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MDBBtn color='dark' onClick={e => { 
                                                        const val = e.target.value;
                                                        unlockEmailEdit(prev => !prev);
                                                        handleEmail();
                                                        }
                                                }
                    >
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </MDBBtn>
                </MDBInputGroup>
                <MDBInputGroup className='mb-3'>
                    <input className='form-control' placeholder="Password" type='password' disabled={passwordEdit} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <MDBBtn color='dark' onClick={e => { 
                                                        const val = e.target.value;
                                                        unlockPasswordEdit(prev => !prev);
                                                        handlePassword();
                                                        }
                                                }
                    >
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </MDBBtn>
                </MDBInputGroup>

                {password && !passwordEdit &&
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

                { !passwordEdit && <input className='form-control' placeholder="Confirm Password" type='password' disabled={passwordEdit} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> }

                { confirmPassword && !passwordEdit &&
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
                }
                <MDBBtn color='dark' className='mt-4' block disabled={ 
                    (!passwordEdit && (!(confirmPassword == password) ||
                    (!hasEightChar ||
                    !hasLowerChar ||
                    !hasUpperChar ||
                    !hasNumber ||
                    !hasSpecialChar))
                    )
                    }>
                        <MDBIcon icon='code' fas /> Save Changes
                </MDBBtn>
            </form>
        </MDBContainer>
    )
}

export default Settings
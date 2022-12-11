import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import axios from 'axios'

const SignUp = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [terms,setTerms]=useState(false)
  const [message,setMessage]=useState("")

  //password validation variables
  let hasEightChar = password.length >= 8;
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
        password_hash:hash
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
    <div className='container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
      <form>
        <div className="form-outline shadow-3 mb-4">
          <input type="text" id="signup-name" className="form-control" placeholder='John Doe' value={name} onChange={(e)=>setName(e.target.value)}/>
          <label className="form-label" htmlFor="signup-name">Name</label>
        </div>
        <div className="form-outline shadow-3 mb-4">
          <input type="email" id="signup-email" className="form-control" placeholder='john.doe@students.finki.ukim.mk' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <label className="form-label" htmlFor="signup-email">Email address</label>
        </div>

        <div className="form-outline shadow-3 mb-2">
          <input type="password" id="signup-password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label className="form-label" htmlFor="signup-password">Password</label>
        </div>

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
        </div>}

        <div className="form-check d-flex justify-content-center mb-4 mt-2">
          <input className="form-check-input me-2" type="checkbox" value="" id="terms-checkbox" checked={terms} onChange={(e)=>setTerms(e.target.checked)}/>
          <label className="form-check-label" htmlFor="terms-checkbox">I have read and agree to the terms</label>
        </div>

        <button type='button' onClick={signUp} className="btn btn-dark btn-block mb-4" 
        disabled={
          !name ||
          !email ||
          !password ||
          !terms ||
          !hasEightChar ||
          !hasLowerChar ||
          !hasUpperChar ||
          !hasNumber ||
          !hasSpecialChar}><i className="fas fa-code"></i> Sign up</button>

        <div className='text-center'>
          <p>Already a member? <Link to='/login'>Login</Link></p>
        </div>
        <p>{message}</p>
      </form>
    </div>
  )
}

export default SignUp;

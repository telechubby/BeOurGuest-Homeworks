import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import axios from 'axios'

import { UserContext } from '../UserContext';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const {setUser} = useContext(UserContext);

  async function login(){
    const hash=bcrypt.hashSync(password,'$2a$12$fZuOVnbxBokJcNLepXdQBu')
    let errRes=undefined
    let res=await axios.post('http://localhost:9000/users/login',{
      email:email,
      password_hash:hash,
    }, {withCredentials: true}).catch(err=>{
      setMessage(err.response.data)
    })
    if(res!==undefined){
      setUser(res.data.username);
      //window.location.href='/map'
    }
  }

  return (
    <div className='container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5'>
      <form>
        <div className="form-outline shadow-3 mb-4">
          <input type="email" id="login-email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label className="form-label" htmlFor="login-email">Email address</label>
        </div>

        <div className="form-outline shadow-3 mb-4">
          <input type="password" id="login-password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label className="form-label" htmlFor="login-password">Password</label>
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input className="form-check-input me-2" type="checkbox" value="" id="remember-checkbox" />
          <label className="form-check-label" htmlFor="remember-checkbox">Remember me</label>
        </div>

        <button type="button" onClick={login} className="btn btn-dark btn-block mb-4" 
        disabled={
          !email ||
          !password}><i className="fas fa-code"></i> Login</button>
        
        <div className='text-center'>
          <p>Not a member? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Login;

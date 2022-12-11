import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { UserContext } from '../UserContext';

//styles
import '../styles/Header.css';

const Header = () => {
    const {user, setUser} = useContext(UserContext);

    async function logout(){
        let errRes=undefined
        let res=await axios.get('http://localhost:9000/users/logout', {withCredentials: true}).catch(err=>{
          console.log(err.response.data)
        })
        if(res!==undefined){
            setUser(null);
            window.location.href='/login'
        }
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">

            <Link to='/' className="navbar-brand">BeOurGuest</Link>

            <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarButtonsExample"
                aria-controls="navbarButtonsExample"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarButtonsExample">
                <ul className="navbar-nav ms-auto d-flex">
                    {user && <li className='nav-item hello-text me-3 mt-2'><span>Hello, {user}!</span></li>}
                    <li className='nav-item dropdown'>
                        <a
                            className="nav-link dropdown-toggle iconRemove me-1"
                            id='navbarDropdown'
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fas fa-bell"></i>
                            <span className="badge rounded-pill badge-notification bg-danger">1</span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <a className="dropdown-item">Event</a>
                            </li>
                            <li>
                                <a className="dropdown-item">Another event</a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item">Something else here</a>
                            </li>
                        </ul>
                    </li>
                    <li className='nav-item'>
                        <a
                            className="nav-link iconRemove me-3"
                            href="https://github.com/telechubby/BeOurGuest-Homeworks"
                            role="button"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                    </li>

                    {!user ? (
                    <>
                        <li className='nav-item'>
                            <Link to='/signup' type="button" className="btn btn-dark"><i className="fas fa-code"></i> Sign Up</Link>
                        </li>
                    </> 
                    ) : ( 
                    <>
                        <li className='nav-item'>
                            <span className="btn btn-dark" onClick={logout}><i className="fas fa-code"></i> Logout</span>
                        </li>
                    </>
                    )}
                    <li className='nav-item'>
                        <a href='https://github.com/telechubby/BeOurGuest-Homeworks' type="button" className="btn btn-link-dark mt-2 mobile-buttons"><i className="fab fa-github"></i> GitHub</a>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' type="button" className="btn btn-link-dark mt-2 mb-3 mobile-buttons"><i className="fas fa-comment-alt"></i> Contact Us</Link>
                    </li>
                   
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header
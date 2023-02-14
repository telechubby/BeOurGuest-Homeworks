import React, {useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext.js';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBCollapse,
    MDBBtn,
    MDBIcon,
    MDBNavbarNav,
    MDBDropdown, 
    MDBDropdownMenu, 
    MDBDropdownToggle, 
    MDBDropdownItem,
    MDBNavbarLink
} from 'mdb-react-ui-kit';

//styles
import '../styles/Header.css';
import { RoleContext } from '../RoleContext.js';
import { IDContext } from '../IDContext.js';


const Header = () => {
  const {user, setUser} = useContext(UserContext);
  const {role, setRole} = useContext(RoleContext);
  const {id, setId} = useContext(IDContext);
  const [showNavNoToggler, setShowNavNoToggler] = useState(false);

  async function logout(){
    let res=await axios.get(process.env.REACT_APP_BASE_URL+'/users/logout', {withCredentials: true}).catch(err=>{
      console.log(err.response.data)
    })
    if(res!==undefined){
        setUser(null);
        window.location.href='/login'
    }
  }

  return (
    <>
      <MDBNavbar expand='lg' sticky light bgColor='light'>
        <MDBContainer>
            <MDBNavbarBrand href='/' className='brandResize'>BeOurGuest</MDBNavbarBrand>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarToggler'
              aria-controls='navbarToggler'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowNavNoToggler(!showNavNoToggler)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showNavNoToggler}>
              <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
              {user && role==='manager'?<MDBNavbarItem><MDBBtn outline className='me-3' size='lg' color='dark' href='/createevent'>Create event</MDBBtn></MDBNavbarItem>:""}
              {user?
              <MDBNavbarItem><MDBBtn outline className='me-3' size='lg' color='dark' href='/events'>
              Events
            </MDBBtn></MDBNavbarItem>
            :""}
            {user?<MDBNavbarItem><MDBBtn outline className='me-3' size='lg' color='dark' href='/places'>Places</MDBBtn></MDBNavbarItem>:""}
                <MDBNavbarItem>
                  {user && <a className="nav-link active iconRemove me-3 linkFix" aria-current="page" href="/settings">Hello, {user}!</a>}
                </MDBNavbarItem>
                <div className='mobileButtons'>
                  {!user ? (
                    <>
                      <MDBNavbarItem>
                        <MDBBtn className='shadow-4 mb-2' color='dark' href='/signup'><MDBIcon icon='code' fas /> Sign Up</MDBBtn>
                      </MDBNavbarItem>
                    </>        
                    ) : (
                    <>
                      <MDBNavbarItem>
                        <MDBBtn className='shadow-4 mb-2' color='dark' onClick={logout}><MDBIcon icon='code' fas /> Logout</MDBBtn>
                      </MDBNavbarItem>
                    </>
                  )}
                  <MDBNavbarItem>
                    <MDBBtn color='light' href='https://github.com/telechubby/BeOurGuest-Homeworks' className='text-dark shadow-4 mb-2'><MDBIcon icon='github' fab /> Github</MDBBtn>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBBtn color='light' href='/about' className='text-dark shadow-4 mb-2'><MDBIcon icon='comment-alt' fas /> About Us</MDBBtn>
                  </MDBNavbarItem>
                </div>

                {user?<MDBDropdown className='me-3 marginFix iconRemove'>
                  <MDBDropdownToggle tag='a' role='button' className='colorIcon'>
                    <MDBIcon icon='bell' fas size='lg' />
                    <span className="badge rounded-pill badge-notification bg-danger">1</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Event</MDBDropdownItem>
                    <MDBDropdownItem link>Another Event</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>:""}

                <MDBNavbarItem>
                  <MDBBtn tag='a' color='none' href='https://github.com/telechubby/BeOurGuest-Homeworks' className='nav-link me-3 mt-1 iconRemove'><MDBIcon icon='github' fab size='lg' className='colorIcon'/></MDBBtn>
                </MDBNavbarItem>

                {!user ? (
                  <>
                    <MDBNavbarItem>
                      <MDBBtn  size='lg' className='shadow-4 iconRemove mb-1' color='dark' href='/signup'><MDBIcon icon='code' fas /> Sign Up</MDBBtn>
                    </MDBNavbarItem>
                  </>        
                  ) : (
                  <>
                    <MDBNavbarItem>
                      <MDBBtn  size='lg' className='shadow-4 iconRemove mb-1' color='dark' onClick={logout}><MDBIcon icon='code' fas /> Logout</MDBBtn>
                    </MDBNavbarItem>
                  </>
                )}

              </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Header
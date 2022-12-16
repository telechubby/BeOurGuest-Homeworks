import React, {useState} from 'react';
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
    MDBDropdownItem
} from 'mdb-react-ui-kit';

//styles
import '../styles/Header.css';


const Header = () => {
  const [showNavNoToggler, setShowNavNoToggler] = useState(false);

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

                <div className='mobileButtons'>
                  <MDBNavbarItem>
                    <MDBBtn color='dark' href='/signup' className='shadow-4 mb-2'><MDBIcon icon='code' fas /> Signup</MDBBtn>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBBtn color='light' href='https://github.com/telechubby/BeOurGuest-Homeworks' className='text-dark shadow-4 mb-2'><MDBIcon icon='github' fab /> Github</MDBBtn>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBBtn color='light' href='/about' className='text-dark shadow-4 mb-2'><MDBIcon icon='comment-alt' fas /> About Us</MDBBtn>
                  </MDBNavbarItem>
                </div>

                <MDBDropdown className='me-3 marginFix iconRemove'>
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
                </MDBDropdown>

                <MDBNavbarItem>
                  <MDBBtn tag='a' color='none' href='https://github.com/telechubby/BeOurGuest-Homeworks' className='nav-link me-3 mt-1 iconRemove'><MDBIcon icon='github' fab size='lg' className='colorIcon'/></MDBBtn>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBBtn size='lg' color='dark' href='/signup' className='shadow-4 iconRemove'><MDBIcon icon='code' fas /> Signup</MDBBtn>
                </MDBNavbarItem>

              </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Header
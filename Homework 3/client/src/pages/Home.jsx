import React from 'react'
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

//styles
import '../styles/Home.css';

const Home = () => {
  return (
    <main>
      <MDBContainer className='h-100'>
        <MDBRow className='h-100 justify-content-center align-items-center'>
          <MDBCol lg='4'>
            <h1 className="slogan mb-3">Moments to remember.</h1>
            <p className="p-resize p-spacing mb-4">BeOurGuest helps event organizers and lovers to create or attend events near them.</p>
            <Link to='/signup' type='button' className='get-started-btn btn btn-dark btn-lg'>Get Started <i className="display-arrow fa-solid fa-arrow-right"></i></Link>
          </MDBCol>
          <MDBCol lg='4'></MDBCol>
          <MDBCol lg='4'></MDBCol>
        </MDBRow>
      </MDBContainer>
    </main>
  )
}

export default Home
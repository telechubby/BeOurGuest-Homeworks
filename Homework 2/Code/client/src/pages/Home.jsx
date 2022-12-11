import React from 'react'
import { Link } from 'react-router-dom';

//Styles
import '../styles/Home.css';

const Home = () => {
  return (
    <section className='main'>
      <div className="container h-100">
        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-lg-4 col-sm-12 col-md-12'>
                <h1 className='slogan mb-3'>Moments to remember.</h1>
                <p className='p-resize mb-3'>BeOurGuest helps event organizers and lovers to create or attend events near them.</p>
                <Link to='/signup' type="button" className="get-started-btn btn btn-dark btn-lg">Get Started <i className="display-arrow fa-solid fa-arrow-right"></i></Link>
          </div>
          <div className='col-lg-4'></div>
          <div className='col-lg-4'></div>
        </div>
      </div>
    </section>
  )
}

export default Home;

import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//components
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';

//page
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Events from './pages/Events.jsx';
import Places from './pages/Places.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/map" element={<Map/>} />
        <Route exact path="/events" element={<Events/>}/>
        <Route exact path="/places" element={<Places/>}/>
      </Routes>
    </Router>
  )
}

export default App;
  
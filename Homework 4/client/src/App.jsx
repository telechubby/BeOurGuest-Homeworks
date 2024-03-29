import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext.js';

//components
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';

//page
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Events from './pages/Events.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import Places from './pages/Places.jsx';
import Settings from './pages/Settings.jsx';
import AddPlace from './pages/AddPlace.jsx';
import Users from './pages/Users.jsx';

import { getLoggedInUser } from './api/user.js';
import { RoleContext } from './RoleContext.js';
import { IDContext } from './IDContext.js';


const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const unsubscribe = getLoggedInUser().then((res) => {
      if(res.error)  {
        console.log(res.error) 
      }
      else{ 
        setUser(res.username);
        setRole(res.role);
        setId(res.id)
      }
    },)
    .catch((err) => console.log(err));

    return () => unsubscribe;
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
      <RoleContext.Provider value={{role, setRole}}>
      <IDContext.Provider value={{id, setId}}>
        <Header />
        <Routes>
          <Route path="/" element={user ? <Map /> : <Home />} />
          <Route path="/login" element={user ? <Map /> : <Login />} />
          <Route path="/signup" element={user ? <Map /> : <SignUp />} />
          <Route path="/settings" element={user ? <Settings /> : <Home />} />
          <Route path="/map" element={user ? <Map /> : <Home />} />
          <Route path="/events" element={user ? <Events /> : <Home />}/>
          <Route path="/createevent" element={user?(role==='manager' ? <CreateEvent /> : <Events />):<Home/>}/>
          <Route path="/places" element={user ? <Places /> : <Home />}/>
          <Route path="/addplace" element={role==='manager' ? <AddPlace /> : <Places />}/>
          <Route path="/users" element={user?(role==='admin' ? <Users /> : <Events />):<Home/>}/>
        </Routes>
        </IDContext.Provider>
        </RoleContext.Provider>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
  
import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';

//components
import Header from './components/Header';
import Map from './components/Map';

//pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import Login from './pages/Login';


const App = () =>{
  const [user, setUser] = useState(null);

  async function getUser(){
    let errRes=undefined
    let res=await axios.get('http://localhost:9000/users/user', {email:} ,{withCredentials: true}).catch(err=>{
      console.log(err.response.data)
    })
    if(res!==undefined){}
  }

  useEffect(() => {
    const unsubscribe = getUser().then((res) => {
      if(res.error) console.log(res.error);
      else setUser(res.data.username);
    })
    .catch((err) => console.log(err));

    return () => unsubscribe;
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/map" element={<Map />} />
        </Routes>
      </UserContext.Provider>        
    </Router>
  );
}

export default App;

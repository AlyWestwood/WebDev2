import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home";
import NewEntry from './pages/NewEntry';
import Entry from './pages/Entry';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/authcontext';
import axios from 'axios';

function App() {
const [authState, setAuthState] = useState(false);

useEffect(() => {
  axios
    .get("/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then(res => {
      if (res.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
}, []);

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }} >
      <Router>
      <nav className='navbar'>
       <Link to="/">Home</Link>
       <Link to="/newentry">Create a blog entry</Link>
      {!authState && (
        <>
       <Link to="/login">Log in</Link>
       <Link to="/register">Registration</Link>
       </>
      )}

      </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/newentry" element={<NewEntry/>}/>
          <Route path="/entry/:id" element={<Entry/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

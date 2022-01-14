import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Todos from "./pages/Todos";
import NewTodo from './pages/NewTodo';
import Login from './pages/Login';
import Registration from './pages/Register';
import { AuthContext } from './misc/authcontext';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);

useEffect(() => {
  axios
    .get("/auth/", {
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

const logout = function(){
  localStorage.removeItem("accessToken");
}

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }} >
      <Router>
      <nav className='nav'>
      {!authState && (
        <>
       <Link className='nav-link' to="/login">Log in</Link>
       <Link className='nav-link' to="/register">Registration</Link>
       </>
      )}
      {authState && (
        <>
        <Link className='nav-link' to="/">Todos</Link>
        <Link className='nav-link' to="/newtodo">Create a new Todo</Link>
        <Link className='nav-link' to="/login" onClick={logout} >Log Out</Link>
        </>
      )}
      </nav>
        <Routes>
          <Route path="/" element={<Todos/>}/>
          <Route path="/newtodo" element={<NewTodo/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

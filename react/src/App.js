import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './components/SearchResults';
import Initial from './components/Initial';
import Profile from './components/Profile';
import Header from './components/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect
} from "react-router-dom";
import Register from './components/Register';
import Landing from './components/Landing';
import GameProfile from './components/GameProfile';
import  Login from './components/Login'
import GamerProfile from './components/gamerProfile';
import { useState, useEffect, createContext } from "react";
import PublisherProfile from './components/PublisherProfile';
const UserContext = React.createContext(null);

function App() {
  document.body.style = 'background: #7A1ED6';
 
  return (
    <div className="App" style={{ backgroundColor: "#7A1ED6", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", paddingTop: "6.5vh" }}>
      
      <Router>
        <Routes>
            <Route exact path="/" element={<Landing/>} />
            <Route exact path="*" element={<Landing/>} />
            <Route path="/profile"element={<Profile/>} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/results"element={<SearchResults/>} />
            <Route path="/register"element={<Register/>} />
            <Route path="/main"element={<Initial/>} />
            <Route path= "/gameProfile" element = {<GameProfile/>} />
            <Route path= "/login" element = { <Login/> } />
            <Route path= "/gamer" element = { <GamerProfile/> } />
            <Route path="/publisher" element= {<PublisherProfile/>} />
            <Route path="/publisher/:name" element= {<PublisherProfile/>} />
        </Routes>
      </Router>
      {/*<Header/>*/}
          </div>
  );
}
export default App;

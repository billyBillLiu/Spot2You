import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SpotifyAuth from './components/SpotifyAuth';
import GetPlaylist from './components/GetPlaylists';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App = () => {  
  const [currentUser, setCurrentUser] = useState(-1);
  const [regForm, setRegForm] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (currentUser == -1) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }
  });

  const toggleForm = () => {
    if (regForm) {
      setRegForm(false);
    } else {
      setRegForm(true);
    }
  }
  
  const login = () => {
    setLoginStatus(true);
  }

  const logout = () => {
    setLoginStatus(false);
  }

  return (
      <div>
        {loginStatus ? (
        <Home setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        ) : (
          regForm ? 
          <Register onToggleForm={toggleForm}/> 
          : 
          <Login onToggleForm={toggleForm} setCurrentUser={setCurrentUser}/>)}
      </div>
  );
};

export default App;
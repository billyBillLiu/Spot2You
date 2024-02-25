import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SpotifyAuth from './components/SpotifyAuth';
import GetPlaylist from './components/GetPlaylists';
import Login from './components/Login';
import Register from './components/Register';
import noImage from './assets/noimage.png';

const App = () => {  
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || -1);
  const [regForm, setRegForm] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
    // Get Current User From Database
    axios.post("http://localhost:3001/api/getUser", {
            user_id: currentUser
        })
        .then(res => {
          setDisplayName(res.data[0].username)
          setAccessToken(res.data[0].access_token)
        })
        .catch(err => console.log(err));
        
    // Check To See if User is Logged in
    if (currentUser == -1) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }

    // Get Spotify Token
    if (window.location.hash) {
      const hash = window.location.hash;
      const access_token = hash.substring(1)
                          .split('&')
                          .find(string => string.startsWith('access_token'))
                          .split('=')[1];
      console.log(access_token);
      storeAccessToken(access_token);
      window.location.href = '';
    }
  }, [currentUser, regForm]);



  const toggleForm = () => {
    if (regForm) {
      setRegForm(false);
    } else {
      setRegForm(true);
    }
  }

  const logout = () => {
    setCurrentUser(-1);
  }

  const storeAccessToken = (access_token) => {
    axios.post("http://localhost:3001/api/updateToken", {
      user_id: currentUser,
      access_token: access_token
    });
  }

  const handleSplitting = (playlist) => {
    console.log(playlist);
  }

  return (
      <div>
        {!loginStatus ? (
          regForm ? 
          <Register onToggleForm={toggleForm}/> 
          : 
          <Login onToggleForm={toggleForm} setCurrentUser={setCurrentUser}/>
        ) : (
          <div>
            <h1>Spotify Playlist Genre Organizer</h1>

            <SpotifyAuth /><br /><br />

            <GetPlaylist accessToken={accessToken} setPlaylists={setPlaylists}/><br />

            {playlists? playlists.map((playlist) => {
              return (
                <a 
                  key={playlist}
                  onClick={() => handleSplitting(playlist)}>
                    <div className='playlists'>            
                      <img src={playlist.images[0] ? playlist.images[0].url : noImage} className='playlist-img'/>
                      <p>{playlist.name}</p>
                    </div>
                </a>
              )
            }) : null}<br />

            <button onClick={logout}>Logout</button>

            <p>Current User: {displayName} ({currentUser})</p>

            {accessToken ? (
              <p>Access Token: {accessToken}</p>
            ) : null}

          </div>
        )}
      </div>
  );
};

export default App;
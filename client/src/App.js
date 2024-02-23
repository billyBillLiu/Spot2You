import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SpotifyAuth from './components/SpotifyAuth';
import GetPlaylist from './components/GetPlaylists';

const App = () => {  
  const [spotifyToken, setSpotifyToken] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3001/api/get")
      .then((response) => {
        setSpotifyToken(response.data[0].spotify_token);
    })
      .catch((error) => {
        setSpotifyToken('');
      })
  }, [])

  return (
      <div className='test'>
        <div>
          <SpotifyAuth />
          <GetPlaylist />
        </div>
        <div>
          <p className='token'>SPOTIFY TOKEN: {spotifyToken}</p>
        </div>
      </div>
  );
};

export default App;
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SpotifyAuth from './components/SpotifyAuth';
import YouTubeAuth from './components/YouTubeAuth';
import GetPlaylist from './components/GetPlaylists';

const App = () => {  
  const [spotifyToken, setSpotifyToken] = useState('');
  const [youTubeToken, setYouTubeToken] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3001/api/get")
      .then((response) => {
        setSpotifyToken(response.data[0].spotify_token);
    })
      .catch((error) => {
        setSpotifyToken('');
      })
    axios.get("http://localhost:3001/api/get")
      .then((response) => {
        setYouTubeToken(response.data[0].youtube_token);
    })
      .catch((error) => {
        setYouTubeToken('');
      })
  }, [])

  return (
      <div className='test'>
        <div>
          <SpotifyAuth />
          <YouTubeAuth />
          <GetPlaylist />
        </div>
        <div>
          <p className='token'>SPOTIFY TOKEN: {spotifyToken}</p>
          <p className='token'>YOUTUBE TOKEN: {youTubeToken}</p>
        </div>
      </div>
  );
};

export default App;
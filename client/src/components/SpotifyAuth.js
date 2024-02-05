import React from 'react';
import axios from 'axios';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '62f991b8ff824157979d989e0e2f9e6a';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public'];
const SCOPES_URL = SCOPES.join('%20');

const SpotifyAuth = () => {

  const addSpotifyToken = (spotify_token) => {
    axios.post("http://localhost:3001/api/insertSpotifyToken", {
      spotify_token: spotify_token
    })
  };

  const authorize = () => {
    window.location = AUTH_URL 
                      + '?client_id=' + CLIENT_ID
                      + '&response_type=token'
                      + '&redirect_uri=' + REDIRECT_URI
                      + '&scope=' + SCOPES_URL 
                      + '&show_dialog=true';
    const hash = window.location.hash;
    let spotify_token = hash.substring(1)
                        .split('&')
                        .find(string => string.startsWith('access_token'))
                        .split('=')[1];
    addSpotifyToken(spotify_token);
  };

  return (
    <button onClick={authorize}>
      LOGIN SPOTIFY
    </button>
  );
};

export default SpotifyAuth;
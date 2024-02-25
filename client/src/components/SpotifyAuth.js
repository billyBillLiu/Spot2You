import React from 'react';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '62f991b8ff824157979d989e0e2f9e6a';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public'];
const SCOPES_URL = SCOPES.join('%20');

const SpotifyAuth = () => {

  const authorize = async () => {
    window.location = AUTH_URL 
                      + '?client_id=' + CLIENT_ID
                      + '&response_type=token'
                      + '&redirect_uri=' + REDIRECT_URI
                      + '&scope=' + SCOPES_URL 
                      + '&show_dialog=true';
  };

  return (
    <button onClick={authorize}>
      GET NEW SPOTIFY ACCESS TOKEN
    </button>
  );
};

export default SpotifyAuth;
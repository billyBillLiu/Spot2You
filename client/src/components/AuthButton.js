import React from 'react';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '62f991b8ff824157979d989e0e2f9e6a';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPES = ['playlist-read-private','playlist-read-collaborative','playlist-modify-private','playlist-modify-public'];
const SCOPES_URL = SCOPES.join('%20');

const authorize = () => {
    window.location = AUTH_URL 
                      + '?client_id=' + CLIENT_ID
                      + '&response_type=token'
                      + '&redirect_uri=' + REDIRECT_URI
                      + '&scope=' + SCOPES_URL 
                      + '&show_dialog=true';
  };

const AuthButton = () => {
  return (
    <button onClick={authorize}>
      Login
    </button>
  );
};

export default AuthButton;
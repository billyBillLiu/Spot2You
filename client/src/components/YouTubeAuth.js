import React from 'react';
import axios from 'axios';

const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const CLIENT_ID = "522229372537-9b2mm6p2s7r39n29c8lkns0439j7klit.apps.googleusercontent.com";
const REDIRECT_URI = 'http://localhost:3000';
const SCOPES = ["https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube.force-ssl"];
const SCOPES_URL = SCOPES.join('%20');

const YouTubeAuth = () => {

  const addYouTubeToken = async (youtube_token) => {
    const response = await axios.get("http://localhost:3001/api/get");
    let id = response.data[0].id;
    axios.post("http://localhost:3001/api/insertYouTubeToken", {
      youtube_token: youtube_token,
      id : id
    })
  };

  const authorize = () => {
    window.location = AUTH_URL 
                      + '?client_id=' + CLIENT_ID
                      + '&response_type=token'
                      + '&redirect_uri=' + REDIRECT_URI
                      + '&scope=' + SCOPES_URL;
    const hash = window.location.hash;
    let youtube_token = hash.substring(1)
                        .split('&')
                        .find(string => string.startsWith('access_token'))
                        .split('=')[1];
    addYouTubeToken(youtube_token);
  };

  return (
    <button onClick={authorize}>
      LOGIN YOUTUBE
    </button>
  );
};

export default YouTubeAuth;
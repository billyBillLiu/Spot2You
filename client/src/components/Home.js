import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SpotifyAuth from './SpotifyAuth';

const Home = ({currentUser, setCurrentUser}) => {
    const [displayName, setDisplayName] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [playlists, setPlaylists] = useState({});

    useEffect (() => {
        axios.post("http://localhost:3001/api/getUser", {
            user_id: currentUser
        })
        .then(res => setDisplayName(res.data[0].username))
        .catch(err => console.log(err));
    }, []);

    const logout = () => {
        setCurrentUser(-1);
    }

    return (
        <div>
            <h1>Spotify Playlist Genre Organizer</h1>
            <SpotifyAuth currentUser={currentUser}/><br /><br />
            <button onClick={logout}>Logout</button>
            <p>Current User: {displayName} ({currentUser})</p>
        </div>
    )
}

export default Home
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import '../App.css';
import noImage from '../assets/noimage.png';

const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const GetPlaylist = () => {
    const [token, setToken] = useState('');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('access_token')){
            setToken(localStorage.getItem('access_token'));
        }
    }, [])

    const handleGetPLaylists = () => {
        axios.get(PLAYLIST_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token, 
            },
        })
        .then(response => {setPlaylists(response.data.items)})
        .catch((error) => { console.log(error); })
    }

    return (
    <>
    <button onClick={handleGetPLaylists}>Get Playlists</button>
    {playlists? playlists.map((playlist) => {
        return (
            <div className='playlists'>            
                <img src={playlist.images[0] ? playlist.images[0].url : noImage} className='playlist-img'/>
                <p>{playlist.name}</p>
            </div>
        )
        }) : 'nu'}
    </>
    )
    
}

export default GetPlaylist;
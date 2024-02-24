import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import '../App.css';
import noImage from '../assets/noimage.png';

const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const GetPlaylist = () => {
    const [accessToken, setAccessToken] = useState('');
    const [playlists, setPlaylists] = useState([]);

    const handleGetPLaylists = () => {
        axios.get(PLAYLIST_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + accessToken, 
            },
        })
        .then(response => {
            setPlaylists(response.data.items)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3001/api/get")
        .then((response) => {
          setAccessToken(response.data[0]?.access_token);
        });
    }, [])

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
        }) : 'NOTHING'}
    </>
    )
    
}

export default GetPlaylist;
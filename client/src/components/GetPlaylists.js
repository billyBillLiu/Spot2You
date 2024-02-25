
import React from 'react';
import axios from 'axios';
import '../App.css';


const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const GetPlaylist = ({accessToken, setPlaylists}) => {

    const handleGetPLaylists = () => {
        axios.get(PLAYLIST_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + accessToken, 
            }
        })
        .then(response => {
            setPlaylists(response.data.items)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <button onClick={handleGetPLaylists}>Refresh Playlists</button>
        </div>
    )
}

export default GetPlaylist;
import { useEffect, useState } from 'react';
import './App.css';
import AuthorizationButton from './components/AuthButton';
import GetPlaylist from './components/GetPlaylists';

const App = () => {  
  const [token, setToken] = useState('');
  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = localStorage.getItem('access_token');

    if (hash) {
      accessToken = hash.substring(1).split('&').find(string => string.startsWith('access_token')).split('=')[1];
      window.location.hash = '';
      localStorage.setItem('access_token', accessToken);
    }

    setToken(accessToken);
  }, [])

  return (
      <div className='test'>
        <div>
          <AuthorizationButton />
          <GetPlaylist />
        </div>
        <div>
          <p className='token'>TOKEN: {token}</p>
        </div>
      </div>
  );
};

export default App;
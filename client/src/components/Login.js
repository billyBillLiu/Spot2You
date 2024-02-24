import React, {useState} from 'react';
import axios from 'axios';

const Login =  ({onToggleForm, setCurrentUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/api/login", {
            username: username,
            password: password
        })
        .then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                setCurrentUser(res.data[0].user_id);
            } else {
                console.log('login failed');
            }
        } )
        .catch(err => console.log(err));
    };

    return (
        <div className="regform">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <label>
                Username: <br /> 
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br />
            <label>
                Password: <br />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br /><p />
            <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a onClick={onToggleForm}>Register</a>
        </p>
      </div>
    )
};

export default Login;


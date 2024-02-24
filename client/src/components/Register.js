import React, {useState} from 'react';
import axios from 'axios';

const Login = ({onToggleForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleRegister = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            axios.post("http://localhost:3001/api/register", {
                username: username,
                password: password
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        } else {
            console.log("Passwords do not match");
        }
        onToggleForm();
    };


    return (
        <div className="regform">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
            <label>
                Username: <br />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br />
            <label>
                Password: <br />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br />
            <label>
                Confirm Password: <br />
                <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <br /><p />
            <button type="submit">Register</button>
        </form>
        <p>
          Have an account? <a onClick={onToggleForm}>Log in</a>
        </p>
      </div>
    )
};

export default Login;


import React from 'react';
import {useInput} from '../hooks/useInput';
import {Link} from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername, handleUsername] = useInput('');
    const [password, setPassword, handlePassword] = useInput('');

    const handleSubmit = e => {
        e.preventDefault();
        setUsername('');
        setPassword('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={e => handleUsername(e.target.value)}/>
                <input type='password' value={password} onChange={e => handlePassword(e.target.value)}/>
                <button>Login</button>
                <p>Need to create an account? Click <Link to='/register'>here</Link> to register.</p>
            </form>
        </div>
    );
}

export default LoginForm;
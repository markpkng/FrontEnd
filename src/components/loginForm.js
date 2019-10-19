import React from 'react';
import {useInput} from '../hooks/useInput';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../actions/actions';

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const [username, setUsername, handleUsername] = useInput('');
    const [password, setPassword, handlePassword] = useInput('');

    const handleSubmit = e => {
        e.preventDefault();
        setUsername('');
        setPassword('');
        dispatch(login({username, password}));
        props.history.push('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} placeholder='Username' onChange={e => handleUsername(e.target.value)} required/>
                <input type='password' value={password} placeholder='Password' onChange={e => handlePassword(e.target.value)} required/>
                <button type='submit'>Login</button>
                <p>Need to create an account? Click <Link to='/register/type'>here</Link> to register.</p>
            </form>
        </div>
    );
}

export default LoginForm;
import React, {useState} from 'react';
import {useInput} from '../../hooks/useInput';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../../actions/actions';

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const [username, setUsername, handleUsername] = useInput('');
    const [password, setPassword, handlePassword] = useInput('');
    const [role, setRole] = useState('rider');

    const handleSubmit = e => {
        e.preventDefault();
        setUsername('');
        setPassword('');
        dispatch(login({username, password, role}));
        props.history.push('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} placeholder='Username' onChange={e => handleUsername(e.target.value)} required/>
                <input type='password' value={password} placeholder='Password' onChange={e => handlePassword(e.target.value)} required/>
                <h3>Are you a:</h3>
                <div><label>Rider: <input type='radio' value='rider' checked={role ==='rider'} onChange={e => setRole(e.target.value)}/></label></div>
                <div><label>Driver: <input type='radio' value='driver' checked={role === 'driver'} onChange={e => setRole(e.target.value)}/></label></div>
                <button type='submit'>Login</button>
                <p>Need to create an account? Click <Link to='/register/role'>here</Link> to register.</p>
            </form>
        </div>
    );
}

export default LoginForm;
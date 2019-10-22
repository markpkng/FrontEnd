import React from 'react';
import {Button, Alert} from 'reactstrap';
import {useInput} from '../../hooks/useInput';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../actions/actions';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 400px;

    .here {
        color: #9FE09F;

        &:hover {
            color: #3CDBD3;
            text-decoration: none;
        }
    }
`
const Input = styled.input `
    width: 100%;
`

const Submit = {
    margin: '2%',
}

const Warning = {
    fontSize: '20px',
}

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const [username, setUsername, handleUsername] = useInput('');
    const [password, setPassword, handlePassword] = useInput('');

    const handleSubmit = e => {
        e.preventDefault();
        setUsername('');
        setPassword('');
        dispatch(login({username, password}, props.history));
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <FlexColumn>
                        {error && <Alert color="warning"><h2 style={Warning}>{error}</h2></Alert>}
                        <Input type='text' value={username} placeholder='Username' onChange={e => handleUsername(e.target.value)} required/>
                        <Input type='password' value={password} placeholder='Password' onChange={e => handlePassword(e.target.value)} required/>
                        <button style={Submit} type='submit'>Login</button>
                        <p>Need to create an account? Click <Link className='here' to='/register/role'>here</Link> to register.</p>
                    </FlexColumn>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
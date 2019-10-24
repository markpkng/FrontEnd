import React, {useState, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import RegisterType from './registerType';
import RegisterRider from './registerRider';
import RegisterDriver from './registerDriver';
import {useInput} from '../../hooks/useInput';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../actions/actions';
import styled from 'styled-components';

const OuterDiv = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    

    .form {
        width: 90%;
        max-width: 500px;
        background: #E6E8e5;
        padding: 3rem;
        border-radius: 5px;
        box-shadow: 10px 10px 10px darkgreen;
        margin: 3rem 0;
    }
`

const Register = ({history}) => {
    const dispatch = useDispatch();
    const [role, setRole] = useState('');
    const [username, setUsername, handleUsername] = useInput('');
    const [password, setPassword, handlePassword] = useInput('');
    const [confirmPassword, setConfirmPassword, handleConfirmPassword] = useInput('')
    const [name, setName, handleName] = useInput('');
    const [location, setLocation, handleLocation] = useInput('');
    const [price, setPrice, handlePrice] = useInput('');
    const [bio, setBio, handleBio] = useInput('');
    const [matchPass, setMatchPass] = useState(true);

    const input = {
        username, handleUsername,
        password, handlePassword,
        confirmPassword, handleConfirmPassword,
        name, handleName,
        location, handleLocation,
        price, handlePrice,
        bio, handleBio
    }

    const errorHandling = {
        matchPass, setMatchPass
    }
    
    const handleSubmit = e => {
        e.preventDefault();

        const user = role === 'rider' ? ({
            username, password, role, name, location
        }) : ({
            username, password, role, name, location, price, bio
        });

        if(password === confirmPassword){
            dispatch(register(user, history));
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setLocation('');
            setPrice('');
            setBio('');
            setRole('');
        }
    }

    useEffect(() => {
        if(confirmPassword !== password){
            setMatchPass(false);
        }else{
            setMatchPass(true);
        }
    }, [confirmPassword, password])

    return (
        <OuterDiv>
            <Redirect from='/register' to='/register/role'/>
            <form className='form' onSubmit={handleSubmit}>
                <Route path='/register/role' render={props => <RegisterType {...props} setRole={setRole}/>}/>
                <Route path='/register/rider' render={props => <RegisterRider {...props} role={role} input={input} errorHandling={errorHandling}/>}/>
                <Route path='/register/driver' render={props => <RegisterDriver {...props} role={role} input={input} errorHandling={errorHandling}/>}/>
            </form>
        </OuterDiv>
    );
}

export default Register;
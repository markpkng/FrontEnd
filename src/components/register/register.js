import React, {useState} from 'react';
import Header from '../header';
import {Redirect, Route} from 'react-router-dom';
import RegisterType from './registerType';
import RegisterRider from './registerRider';
import RegisterDriver from './registerDriver';
import {useInput} from '../../hooks/useInput';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../actions/actions';
import {toggleRegisterModal} from '../../actions/actions';
import Modal from '../modals/modal';

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
    const modal = useSelector(state => state.registerModal);

    const input = {
        username, handleUsername,
        password, handlePassword,
        confirmPassword, handleConfirmPassword,
        name, handleName,
        location, handleLocation,
        price, handlePrice,
        bio, handleBio
    }
    
    const modalAction = () => {
        dispatch(toggleRegisterModal());
        console.log('bam');
    }
    
    const handleSubmit = e => {
        const user = role === 'rider' ? ({
            username, password, role, name, location
        }) : ({
            username, password, role, name, location, price, bio
        });

        dispatch(register(user));

        e.preventDefault();
        setUsername('');
        setPassword('');
        setName('');
        setLocation('');
        setPrice('');
        setBio('');
        setRole('');
    }

    return (
        <div>
            <Redirect from='/register' to='/register/role'/>
            <Modal open={modal} message={'You have been registered.'} title={'Success'} action={modalAction}/>
            <form onSubmit={handleSubmit}>
                <Route path='/register/role' render={props => <RegisterType {...props} setRole={setRole}/>}/>
                <Route path='/register/rider' render={() => <RegisterRider role={role} input={input}/>}/>
                <Route path='/register/driver' render={() => <RegisterDriver role={role} input={input}/>}/>
            </form>
        </div>
    );
}

export default Register;
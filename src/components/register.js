import React, {useState} from 'react';
import Header from './header';
import {Redirect, Route} from 'react-router-dom';
import RegisterType from './registerType';
import RegisterRider from './registerRider';
import RegisterDriver from './registerDriver';

const Register = () => {
    const [type, setType] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div>
            <Header/>
            <form onSubmit={handleSubmit}>
                <Route path='/register/type' render={props => <RegisterType {...props} setType={setType}/>}/>
                <Route path='/register/rider' render={props => <RegisterRider type={type}/>}/>
                <Route path='/register/driver' render={props => <RegisterDriver type={type}/>}/>
            </form>
        </div>
    );
}

export default Register;
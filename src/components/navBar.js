import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {decode} from './decode';
import {NavLink as NL} from 'react-router-dom'
import {logout} from '../actions/actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const NavBar = props => {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(true);
    const loggedIn = useSelector(state => state.loggedIn);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            <Navbar className='navbar' color="faded" light>
                <NavbarBrand href="/">
                    <span className='rflNav'>Ride For Life</span><span className='forNav'> for </span><span className='safeNav'>SAFE</span>
                </NavbarBrand>
                <FontAwesomeIcon onClick={toggleNavbar} className={collapsed ? 'closedNav' : 'openNav'} icon={faBars}/>
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href='https://saferidefl.netlify.com/'><span className='nl'>About</span></NavLink>
                        </NavItem>
                        {loggedIn && (localStorage.getItem('bfl-token') && decode(localStorage.getItem('bfl-token')).role === 'rider' ? (<NavItem>
                            <NavLink tag={NL} to='/drivers'><span className='nl'>Drivers</span></NavLink>
                        </NavItem>) : (<NavItem>
                            <NavLink tag={NL} to='/riders'><span className='nl'>Riders</span></NavLink>
                        </NavItem>))}
                        {loggedIn && <NavItem>
                            <NavLink tag={NL} to='/account'><span className='nl'>My Account</span></NavLink>
                        </NavItem>}
                        {loggedIn && <NavItem>
                            <NavLink tag={NL} onClick={() => dispatch(logout())} to='/'><span className='nl'>Log Out</span></NavLink>
                        </NavItem>}
                        {!loggedIn && <NavItem>
                            <NavLink tag={NL} to='/register/role'><span className='nl'>Register</span></NavLink>
                        </NavItem>}
                        {!loggedIn && <NavItem>
                            <NavLink tag={NL} to='/login'><span className='nl'>Log In</span></NavLink>
                        </NavItem>}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;

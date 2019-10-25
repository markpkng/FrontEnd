import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import Welcome from "./components/welcome";
import Login from "./components/login/login";
import Register from "./components/register/register";
import DriverList from "./components/drivers/driverList";
import DriverProfile from "./components/drivers/driverProfile";
import RiderList from "./components/riders/riderList";
import RiderProfile from "./components/riders/riderProfile";
import RiderAccount from "./components/riders/riderAccount";
import DriverAccount from "./components/drivers/driverAccount";
import LoadingOverlay from "react-loading-overlay";
import Header from "./components/header";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, LOGOUT } from "./actions/types";
import { decode } from "./components/decode";
import { storeRider } from "./actions/actions";
import "./App.css";
import Footer from "./components/footer";
import NavBar from './components/navBar';

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
`;

const OuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding-bottom: 10rem;
    // padding-top: 5rem;
    min-height: 88vh;
    width: 100%;

    @media screen and (max-width: 500px){
        min-height: 86vh;
    }
`;

const Div = styled.div `
  overflow: auto;
`

function App() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);
    const loggedIn = useSelector(state => state.loggedIn);
    const [width, setWidth] = useState(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    })
    useEffect(() => {
        if (localStorage.getItem("bfl-token")) {
            console.log("decoded:", decode(localStorage.getItem("bfl-token")));
            const { subject, role } = decode(localStorage.getItem("bfl-token"));
            dispatch({ type: LOGIN_SUCCESS, payload: role });
            if (role === "rider") {
                dispatch(storeRider(subject));
            }
        } else {
            dispatch({ type: LOGOUT });
        }
    }, [loggedIn]);

    return (
        <Div
            style={{
                background:
                    "url(" + require("./images/bggplaypattern.png") + ") repeat"
            }}
        >
            <StyledLoader active={loading} spinner text='Loading...'>
                {width > 500 ? <Header className='header'/> : <NavBar className='navbar'/>}
                <OuterDiv
                    className='App'
                >
                    <Route exact path='/' component={Welcome} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <PrivateRoute
                        exact
                        path='/drivers'
                        component={DriverList}
                    />
                    <PrivateRoute
                        exact
                        path='/drivers/:id'
                        component={DriverProfile}
                    />
                    <PrivateRoute exact path='/riders' component={RiderList} />
                    <PrivateRoute
                        exact
                        path='/riders/:id'
                        component={RiderProfile}
                    />
                    <PrivateRoute
                        exact
                        path='/account'
                        component={
                            localStorage.getItem("bfl-token") &&
                            decode(localStorage.getItem("bfl-token")).role ===
                                "rider"
                                ? RiderAccount
                                : DriverAccount
                        }
                    />
                </OuterDiv>
                <Footer />
            </StyledLoader>
        </Div>
    );
}

export default App;

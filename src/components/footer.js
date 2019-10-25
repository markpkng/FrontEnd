import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as v from '../styles/variables';
import {faTwitter, faFacebook} from "@fortawesome/free-brands-svg-icons";

const OuterDiv = styled.div `
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 100%;
    background-color: rgba(70, 53, 29, 0.6);
    height: 6vh;
    @media screen and (max-width: 600px){height: 10vh;}
    @media screen and (max-width: 450px){height: 18vh;}

    .copy {
        width: 50%;
        text-align: center;
        font-family: Roboto;
        font-size: 2rem;
        color: white;
        @media screen and (max-width: 1400px){width: 70%;}
        @media screen and (max-width: 1100px){width: 80%;}
        @media screen and (max-width: 600px){width: 100%;}
    }

    .social {
        width: 40%;
        display: flex;
        align-items:center;
        justify-content: space-evenly;
        // @media screen and (max-width: 800px){width: 60%;}
        @media screen and (max-width: 600px){width: 80%;}

        .icon {
            color: white;

            &:hover {
                color: ${v.LIGHT_GREEN};
                text-decoration: none;
            }
        }

        .safe {
            font-size: 3.5rem;
            color: white;
            font-family: 'Audiowide', sans-serif;
            // margin-left: 2rem;

            &:hover {
                color: ${v.LIGHT_GREEN};
                text-decoration: none;
            } 
            @media (max-width: 850px) {
                font-size: 3.2rem;
                padding: 0rem;
            }
            @media (max-width: 476px) {
                font-size: 3rem;
            }
        }
    }
`
const InnerDiv = styled.div `
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    @media screen and (max-width: 750px){width: 90%;}
    @media screen and (max-width: 600px){flex-direction: column-reverse;}
    @media screen and (max-width: 500px){width: 100%;}
`

const Footer = () => {
    return (
        <OuterDiv>
            <InnerDiv>
                <div className='copy'>
                    <span>© Ride For Life Build Week Team 2019</span>
                </div>
                <div className='social'>
                    <a href="https://twitter.com/safemothers" target="blank">
                        <FontAwesomeIcon icon={faTwitter} className="fa-4x icon" />
                    </a>
                    <a href="https://www.facebook.com/SafeMothersSafeBabies/" target="blank">
                        <FontAwesomeIcon icon={faFacebook} className="fa-4x icon" />
                    </a>
                    <a className='safe' target='blank' href='http://www.safemotherssafebabies.org/'><span>SAFE</span></a>
                </div>
            </InnerDiv>
        </OuterDiv>
    );
}

export default Footer;
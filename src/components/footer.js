import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as v from '../styles/variables';
import {
  faInstagram,
  faTwitter,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

const OuterDiv = styled.div `
    display: flex;
    align-items: center;
    width: 100%;
    // background: rgba(230, 232, 229, 0.6);
    background-color: white;
    height: 6vh;

    .copy {
        width: 50%;
        text-align: center;
        font-family: Roboto;
        font-size: 1.5rem;
        color: ${v.BROWN_COLOR};
        @media (max-width: 700px) {
            font-size: 1.5rem;
        }
    }

    .social {
        width: 50%;
        display: flex;
        align-items:center;
        justify-content: space-evenly;

        .icon {
            color: #70D378;

            &:hover {
                color: #46351D;
                text-decoration: none;
            }
        }
    }

`

const Footer = () => {
    return (
        <OuterDiv>
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
            </div>
        </OuterDiv>
    );
}

export default Footer;
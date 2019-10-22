import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

const OuterDiv = styled.div `
    display: flex;
    align-items: center;
    width: 100%;
    background: #46351D;
    min-height: 6vh;

    .copy {
        width: 50%;
        text-align: center;
        font-family: Patua One;
        font-size: 1.4rem;
        color: #9FE09F;

        &:hover {
            color: #3CDBD3;
            text-decoration: none;
        }
    }

    .social {
        width: 50%;
        display: flex;
        align-items:center;
        justify-content: space-evenly;

        .icon {
            color: #9FE09F;

            &:hover {
                color: #3CDBD3;
                text-decoration: none;
            }
        }
    }

`

const Footer = () => {
    return (
        <OuterDiv>
            <div className='copy'>
                <span>© Ride For Life</span>
            </div>
            <div className='social'>
                <a href="#" target="blank">
                    <FontAwesomeIcon icon={faTwitter} className="fa-2x icon" />
                </a>
                <a href="#" target="blank">
                    <FontAwesomeIcon icon={faFacebook} className="fa-2x icon" />
                </a>
            </div>
        </OuterDiv>
    );
}

export default Footer;
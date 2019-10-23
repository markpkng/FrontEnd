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
    background: #E6E8E5;
    height: 4vh;

    .copy {
        width: 50%;
        text-align: center;
        font-family: Roboto;
        font-size: 2rem;
        color: #66bf6d;

        &:hover {
            color: #3CDBD3;
            text-decoration: none;
        }
        @media (max-width: 700px) {
            font-size: 1rem;
        }
    }

    .social {
        width: 50%;
        display: flex;
        align-items:center;
        justify-content: space-evenly;

        .icon {
            color: #66bf6d;

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
                <span>© Ride For Life Build Week Team 2019</span>
            </div>
            <div className='social'>
                <a href="#" target="blank">
                    <FontAwesomeIcon icon={faTwitter} className="fa-4x icon" />
                </a>
                <a href="#" target="blank">
                    <FontAwesomeIcon icon={faFacebook} className="fa-4x icon" />
                </a>
            </div>
        </OuterDiv>
    );
}

export default Footer;
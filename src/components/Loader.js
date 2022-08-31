import React from "react";
import styled from "styled-components";
import { TailSpin, MutatingDots, ThreeDots } from  'react-loader-spinner'

const Loading = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    width: 100%;
    opacity: 60%;
    z-index: 9999;
    background: #273B5A;
    transition: 0.4s all ease;
    margin-left: 0 !important
`

const BallLoading = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: #D35D35;
    color: #D35D35;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: .5s;
    
    &:after, &:before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
    }

    &:before {
        left: -30px;
        width: 20px;
        height: 20px;
        border-radius: 50px;
        background-color: #D35D35;
        color: #D35D35;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 0s;
    }
    &:after {
        left: 30px;
        width: 20px;
        height: 20px;
        border-radius: 50px;
        background-color: #D35D35;
        color: #D35D35;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 1s;
    }

    @keyframes dotFlashing {
        0% {
            background-color: #D35D35;
        }
        50%,
        100% {
        background-color: #ebe6ff;
        }
    }

`




const Loader = ({show}) =>{


    return(
        show ? 
            <Loading>
                <div style={{ display: 'flex'}}>
                    <BallLoading/>
                </div>
            </Loading>
        : null
    )
}

export default Loader;
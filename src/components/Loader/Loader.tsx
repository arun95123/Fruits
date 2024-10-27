import React from 'react'

import logo from '../../logo.svg';
import './Loader.css'

const Loader = () => (
    <div className="App-loader">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Picking up Fruits! Please wait</p>
    </div>
)

export default Loader
import React from 'react';
import ReactDOM from 'react-dom';
import './Display.css';

const Display = ({displayValue}) => {
    return(
        <div className="display-wrapper">{displayValue}</div>
    )
}

export default Display;
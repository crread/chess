import React from 'react';
import './RestartButton.css';

function RestartButton(props) {
    return <button onClick={props.onClick} >recommencer </button>
}

export default RestartButton
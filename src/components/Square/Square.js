import React from 'react';
import './Square.css';

function Square(props)  {
        return(
            <td>
                <button className = { props.className }
                        onClick = { props.onClick }
                        style = { props.style }
                >
                    <span>{props.value}</span>
                </button>
            </td>
        )
}

export default Square
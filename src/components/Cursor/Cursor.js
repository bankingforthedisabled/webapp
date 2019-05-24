import React from 'react';
import './Cursor.imports.scss'

function Cursor(props) {
    let style = {
        'height': '50px',
        'width': '50px',
        'display': props.visibility ? 'initial' : 'none',
        'position': 'fixed',
        'borderRadius': '50%',
        'border': '5px solid ' + (props.clicked ? '#b042f4' : '#42f477'),
        'top': props.y - 25,
        'left': props.x - 25,
        'zIndex': '999',
        'transition': 'top 100ms ease-in-out, left 100ms ease-in-out, border 300ms ease-out'
    };
    return <div style={style}/>;
}

export default Cursor;
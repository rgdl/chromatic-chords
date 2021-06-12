import PropTypes from 'prop-types';
import React from 'react';

import { CHORD_BOX_Z_INDEX, NODE_SIZE } from '../consts.js';


function validateProps(props) {
    if (props.x < 0 || props.x > 1 || props.y < 0 || props.y > 1) {
        throw new Error(`Invalid (x, y): (${props.x}, ${props.y})`);
    }
}

export default function CardinalChordBox(props) {
    validateProps(props);

    return (
        <div
            className='chord-box'
            style={{
                width: `${NODE_SIZE}%`, left: `${props.x * 100 - NODE_SIZE / 2}%`,
                height: `${NODE_SIZE}%`, top: `${props.y * 100 - NODE_SIZE / 2}%`,
                zIndex: CHORD_BOX_Z_INDEX,
            }}
        >
            {props.text}
        </div>
    );
}

CardinalChordBox.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

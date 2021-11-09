import PropTypes from 'prop-types';
import React from 'react';

import { CHORD_BOX_Z_INDEX } from '../consts.js';
import { sizeAndPositionFromAngle } from '../service.js';


// TODO: grey out if not selected
export default function CardinalChordBox(props) {
    return (
        <div
            className={`chord-box cardinal-chord-box ${props.lineToClassName}`}
            style={{ ...sizeAndPositionFromAngle(props.theta), zIndex: CHORD_BOX_Z_INDEX }}
        >
            {props.chord.name}
        </div>
    );
}

CardinalChordBox.propTypes = {
    theta: PropTypes.number.isRequired,
    chord: PropTypes.object.isRequired,
    // To be used for linking with joining lines
    lineToClassName: PropTypes.string.isRequired,
};

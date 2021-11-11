import PropTypes from 'prop-types';
import React from 'react';


// TODO: grey out if not selected
export default function CardinalChordBox(props) {
    return (
        <div className={`cardinal-chord-box ${props.positionClassName} ${props.lineToClassName}`} >
            {props.chord.name}
        </div>
    );
}

CardinalChordBox.propTypes = {
    theta: PropTypes.number.isRequired,
    chord: PropTypes.object.isRequired,
    // To be used for linking with joining lines
    lineToClassName: PropTypes.string.isRequired,
    // To be used for positioning
    positionClassName: PropTypes.string.isRequired,
};

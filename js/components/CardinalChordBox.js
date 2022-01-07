import PropTypes from 'prop-types';
import React from 'react';


export default function CardinalChordBox(props) {
    const disabledClass = props.isSelected ? "" : "disabled";
    console.log(props);
    return (
        <div className={
            `cardinal-chord-box ${props.positionClassName} ${props.lineToClassName} ${disabledClass}`
        }>
            {props.chord.name}
        </div>
    );
}

CardinalChordBox.propTypes = {
    chord: PropTypes.object.isRequired,
    // To be used for linking with joining lines
    lineToClassName: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    // To be used for positioning
    positionClassName: PropTypes.string.isRequired,
};

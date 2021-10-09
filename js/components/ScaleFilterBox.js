import React from 'react';
import PropTypes from 'prop-types';

import Chord from '../chords.js';
import { DIATONIC_SCALES } from '../scales.js';

// TODO: can I make this a flex box layout?
export default class ScaleFilterBox extends React.Component {
    render() {
        return (
            <form style={{ backgroundColor: "gray" }}>
                <h2>Filter by scale</h2>
                {Object.values(DIATONIC_SCALES).map((scale, i) => (
                    <React.Fragment key={i}>
                        <input
                            type="checkbox"
                            id={scale.name}
                            name={scale.name}
                            checked={!!this.props.selectedScales[scale.name]}
                            onChange={() => this.props.onSelectScale(scale.name)}
                        />
                        <label htmlFor={scale.name}>{scale.name}</label>
                    </React.Fragment>
                ))}
            </form>
        );
    }
}

ScaleFilterBox.propTypes = {
    selectedScales: PropTypes.objectOf(PropTypes.bool).isRequired,
    onSelectScale: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { CIRCLE_OF_FIFTHS_ORDER_NOTE_NAMES } from '../consts.js';
import { DIATONIC_SCALES } from '../scales.js';

// TODO: can I make this a flex box layout?

const SCALES = {
    'Major': DIATONIC_SCALES,
};

export default class ScaleFilterBox extends React.Component {
    scaleIsSelected = scale => !!this.props.selectedScales[scale.name]

    renderScale = (scale, tonic) => {
        return (
            <React.Fragment key={tonic}>
                <input
                    type="checkbox"
                    id={scale.name}
                    name={scale.name}
                    checked={this.scaleIsSelected(scale)}
                    onChange={() => this.props.onSelectScale(scale.name)}
                    style={{ marginLeft: '15px' }}
                />
                <label htmlFor={scale.name}>{tonic}</label>
            </React.Fragment>
        );
    }

    // TODO: in CSS overhaul, find and remove all inline styles
    render() {
        return (
            <form style={{ backgroundColor: "gray" }}>
                <h2 style={{ margin: 0 }}>Filter by scale</h2>
                {Object.keys(SCALES).map(scaleType => (
                    <React.Fragment key={scaleType}>
                        <h3 style={{ display: 'inline-block' }}>{scaleType}</h3>
                        {CIRCLE_OF_FIFTHS_ORDER_NOTE_NAMES.map(tonic => (
                            this.renderScale(SCALES[scaleType][tonic], tonic)
                        ))}
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

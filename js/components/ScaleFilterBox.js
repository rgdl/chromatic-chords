import React from 'react';
import PropTypes from 'prop-types';

import { CIRCLE_OF_FIFTHS_ORDER_NOTE_NAMES } from '../consts.js';
import { DIATONIC_SCALES } from '../scales.js';

// TODO: can I make this a flex box layout?

const SCALES = {
    'Major': DIATONIC_SCALES,
};

const SPACE = "\u00A0";

export default class ScaleFilterBox extends React.Component {
    scaleIsSelected = scale => !!this.props.selectedScales[scale.name]

    renderScale = (scale, tonic) => {
        return (
            <div key={tonic}>
                <input
                    type="checkbox"
                    id={scale.name}
                    name={scale.name}
                    checked={this.scaleIsSelected(scale)}
                    onChange={() => this.props.onSelectScale(scale.name)}
                />
                <label htmlFor={scale.name}>
                    {`${tonic}${tonic.length === 1 ? SPACE : ""}`}
                </label>
            </div>
        );
    }

    render() {
        return (
            <form className="scale-filter-box">
                <h2>Filter by Scale</h2>
                {Object.keys(SCALES).map(scaleType => (
                    <div key={scaleType}>
                        <h3>{scaleType}</h3>
                        {CIRCLE_OF_FIFTHS_ORDER_NOTE_NAMES.map(tonic => (
                            this.renderScale(SCALES[scaleType][tonic], tonic)
                        ))}
                    </div>
                ))}
            </form>
        );
    }
}

ScaleFilterBox.propTypes = {
    selectedScales: PropTypes.objectOf(PropTypes.bool).isRequired,
    onSelectScale: PropTypes.func.isRequired,
};

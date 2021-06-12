import React from 'react';

import { CHORD_BOX_Z_INDEX, NODE_SIZE } from '../consts.js'


// TODO: if there's no need for state, make this a functional component
export default class CardinalChordBox extends React.Component {
    validate() {
        if (this.props.x < 0 || this.props.x > 1 || this.props.y < 0 || this.props.y > 1) {
            throw new Error(`Invalid (x, y): (${this.props.x}, ${this.props.y})`);
        }
    }

    render() {
        // TODO: ensure we're only running this when props change
        this.validate();

        return (
            <div
                className='chord-box'
                style={{
                    width: `${NODE_SIZE}%`, left: `${this.props.x * 100 - NODE_SIZE / 2}%`,
                    height: `${NODE_SIZE}%`, top: `${this.props.y * 100 - NODE_SIZE / 2}%`,
                    zIndex: CHORD_BOX_Z_INDEX,
                }}
            >
                {this.props.text}
            </div>
        );
    }
}

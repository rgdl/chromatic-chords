import React from 'react';
import PropTypes from 'prop-types';

import { CHORD_BOX_Z_INDEX } from '../consts.js';
import { sizeAndPositionFromAngle } from '../service.js';


// TODO: what else might we need from ../chordBox.js?
// - drawing chordLinks within the box
export default function AsymmetricalChordBox(props) {
    const nRows = Math.max(...props.chordCols.map(col => col.length));
    const nCols = props.chordCols.length;

    props.chordLinks.map(link => console.assert(link[0].distance(link[1]) === 1));
    return (
        <div
            className='chord-box asymmetrical-chord-box'
            style={{ ...sizeAndPositionFromAngle(props.theta), zIndex: CHORD_BOX_Z_INDEX }}
        >
            <table>
                <tbody>
                    {Array(nRows).fill(0).map((_, i) => (
                        <tr key={i}>
                            {Array(nCols).fill(0).map((_, j) => (
                                <React.Fragment>
                                    <td key={j}>{props.chordCols[j][i].name}</td>
                                    {j < nCols - 1 && <td classname="chordLinkCell"/>}
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
 
}

AsymmetricalChordBox.propTypes = {
    theta: PropTypes.number.isRequired,
    chordCols: PropTypes.arrayOf(PropTypes.arrayOf(Object)).isRequired,
    chordLinks: PropTypes.arrayOf(PropTypes.arrayOf(Object)).isRequired,
};

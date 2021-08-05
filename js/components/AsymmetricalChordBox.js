import React from 'react';
import PropTypes from 'prop-types';

import LineTo from './LineTo.js';
import { CHORD_BOX_Z_INDEX } from '../consts.js';
import { sizeAndPositionFromAngle } from '../service.js';


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
                                    <td key={j} className={props.chordCols[j][i].name}>{props.chordCols[j][i].name}</td>
                                    {j < nCols - 1 && <td style={{ width: '20px' }} className="chordLinkCell" key={`${j}_gap`}/>}
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <React.Fragment>
                {props.chordLinks.map((chords, i) => (
                    <LineTo
                        from={chords[0].name}
                        fromAnchor="left"
                        to={chords[1].name}
                        toAnchor="right"
                        borderColor="darkred"
                        key={i}
                    />
                ))}
            </React.Fragment>
        </div>
    );
 
}

AsymmetricalChordBox.propTypes = {
    theta: PropTypes.number.isRequired,
    chordCols: PropTypes.arrayOf(PropTypes.arrayOf(Object)).isRequired,
    chordLinks: PropTypes.arrayOf(PropTypes.arrayOf(Object)).isRequired,
};

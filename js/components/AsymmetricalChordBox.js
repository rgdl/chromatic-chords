import React from 'react';
import PropTypes from 'prop-types';

import LineTo from './LineTo.js';
import { CHORD_BOX_Z_INDEX } from '../consts.js';
import { sizeAndPositionFromAngle } from '../service.js';


// TODO: also conditionally style lines so they're much more salient when both of the chords they connect are selected
// TODO: incorporate the LESS CSS framework and do a big style refactor
function renderChordTableCell(chord, selectedChords, key, isLastInRow) {
    const name = chord.name;
    const isSelected = selectedChords.includes(chord) || selectedChords.length === 0;
    // TODO: do this with CSS classes
    const style = isSelected ? {} : { color: 'lightgrey' };
    const gapStyle = { width: '20px' };
    return (
        <React.Fragment>
            <td key={key} className={name} style={style}>{name}</td>
        {isLastInRow && (
            <td style={gapStyle} className="chordLinkCell" key={`${key}_gap`} />
        )}
        </React.Fragment>
    );
}

export default function AsymmetricalChordBox(props) {
    const nRows = Math.max(...props.chordCols.map(col => col.length));
    const nCols = props.chordCols.length;

    props.chordLinks.map(link => console.assert(link[0].distance(link[1]) === 1));
    return (
        <div
            className='chord-box asymmetrical-chord-box'
            style={{ ...sizeAndPositionFromAngle(props.theta), zIndex: CHORD_BOX_Z_INDEX }}
        >
            <table><tbody>
                {Array(nRows).fill(0).map((_, i) => (
                    <tr key={i}>
                        {Array(nCols).fill(0).map((_, j) => (
                            renderChordTableCell(
                                props.chordCols[j][i],
                                props.selectedChords,
                                j,
                                j < nCols - 1,
                            )
                        ))}
                    </tr>
                ))}
            </tbody></table>
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
    selectedChords: PropTypes.arrayOf(Object).isRequired,
};

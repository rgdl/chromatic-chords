import React from 'react';
import PropTypes from 'prop-types';

import LineTo from './LineTo.js';


function renderChordTableCell(chord, selectedChords, key, isLastInRow) {
    const name = chord.name;

    const disabledClass = !isChordSelected(chord, selectedChords) ? "disabled" : "";
    const chordClassName = `${name} chordLabel ${disabledClass}`;

    return (
        <React.Fragment key={key}>
            <td key={key} className={chordClassName}>{name}</td>
            {isLastInRow && (<td className="chordLinkCell" key={`${key}_gap`} />)}
        </React.Fragment>
    );
}

function isChordSelected(chord, selectedChords) {
    return selectedChords.includes(chord) || (selectedChords.length === 0);
}

export default function AsymmetricalChordBox(props) {
    const nRows = Math.max(...props.chordCols.map(col => col.length));
    const nCols = props.chordCols.length;

    props.chordLinks.map(link => console.assert(link[0].distance(link[1]) === 1));
    return (
        <div className={`asymmetrical-chord-box ${props.positionClassName} ${props.lineToClassName}`} >
            <table><tbody>
                {Array(nRows).fill(0).map((_, i) => (
                    <tr key={`chord_row${i}`}>
                        {Array(nCols).fill(0).map((_, j) => {
                            const chord = props.chordCols[j][i];
                            if (!chord) {
                                return null;
                            }
                            return renderChordTableCell(
                                chord,
                                props.selectedChords,
                                chord.name,
                                j < nCols - 1,
                            );
                        })}
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
                        borderColor={
                            (
                                isChordSelected(chords[0], props.selectedChords)
                                && isChordSelected(chords[1], props.selectedChords)
                            ) ?
                                "darkred" :
                                "lightgrey"
                        }
                        key={`line_${i}`}
                    />
                ))}
            </React.Fragment>
        </div>
    );
 
}

AsymmetricalChordBox.propTypes = {
    chordCols: PropTypes.arrayOf(PropTypes.arrayOf(Object)).isRequired,
    chordLinks: PropTypes.arrayOf(PropTypes.arrayOf(Object)).isRequired,
    selectedChords: PropTypes.arrayOf(Object).isRequired,
    // To be used for linking with joining lines
    lineToClassName: PropTypes.string.isRequired,
    // To be used for positioning
    positionClassName: PropTypes.string.isRequired,
};

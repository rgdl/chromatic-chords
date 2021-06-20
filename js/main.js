import React from 'react';
import ReactDOM from 'react-dom';

import { AUG_TRIADS, MAJOR_CHORDS, MINOR_CHORDS } from './chords.js';
import { ChordContainer } from './visualElements.js';
import { AsymmetricalChordBox } from './chordBox.js';

import CardinalChordBox from './components/CardinalChordBox.js';
import React_AsymmetricalChordBox from './components/AsymmetricalChordBox.js';


document.addEventListener('DOMContentLoaded', function() {
    const triadContainer = new ChordContainer(
        document.getElementById("triad-container")
    );

    // Cardinal boxes

    let rccb;

    rccb = document.createElement('div');
    triadContainer.node.appendChild(rccb);
    ReactDOM.render(
        <CardinalChordBox theta={3 * Math.PI / 2} chord={AUG_TRIADS['C']} />,
        rccb,
    );

    rccb = document.createElement('div');
    triadContainer.node.appendChild(rccb);
    ReactDOM.render(
        <CardinalChordBox theta={Math.PI} chord={AUG_TRIADS['F']} />,
        rccb,
    );

    rccb = document.createElement('div');
    triadContainer.node.appendChild(rccb);
    ReactDOM.render(
        <CardinalChordBox theta={Math.PI / 2} chord={AUG_TRIADS['D']} />,
        rccb,
    );

    rccb = document.createElement('div');
    triadContainer.node.appendChild(rccb);
    ReactDOM.render(
        <CardinalChordBox theta={0} chord={AUG_TRIADS['G']} />,
        rccb,
    );

    // Triads boxes
    let racb;

    // TODO: at the App level, invoke service functions to validate the relationships between chords
    // TODO: how will the chordlinks work?

    racb = document.createElement('div');
    triadContainer.node.appendChild(racb);
    ReactDOM.render(
        <React_AsymmetricalChordBox
            theta={7 * Math.PI / 4}
            chordCols={
                [MAJOR_CHORDS, MINOR_CHORDS].map(chord =>
                    ['C', 'E', 'Ab'].map(n => chord[n])
                )
            }
            chordLinks={[
                [MAJOR_CHORDS['C'], MINOR_CHORDS['C']],
                [MAJOR_CHORDS['C'], MINOR_CHORDS['E']],
                [MAJOR_CHORDS['E'], MINOR_CHORDS['E']],
                [MAJOR_CHORDS['E'], MINOR_CHORDS['Ab']],
                [MAJOR_CHORDS['Ab'], MINOR_CHORDS['Ab']],
                [MAJOR_CHORDS['Ab'], MINOR_CHORDS['C']],
            ]}
        />,
        racb,
    );

    racb = document.createElement('div');
    triadContainer.node.appendChild(racb);
    ReactDOM.render(
        <React_AsymmetricalChordBox
            theta={1 * Math.PI / 4}
            chordCols={
                [MINOR_CHORDS, MAJOR_CHORDS].map(chord =>
                    ['G', 'B', 'Eb'].map(n => chord[n])
                )
            }
            chordLinks={[
                [MAJOR_CHORDS['G'], MINOR_CHORDS['G']],
                [MAJOR_CHORDS['G'], MINOR_CHORDS['B']],
                [MAJOR_CHORDS['B'], MINOR_CHORDS['B']],
                [MAJOR_CHORDS['B'], MINOR_CHORDS['Eb']],
                [MAJOR_CHORDS['Eb'], MINOR_CHORDS['Eb']],
                [MAJOR_CHORDS['Eb'], MINOR_CHORDS['G']],
            ]}
        />,
        racb,
    );

    racb = document.createElement('div');
    triadContainer.node.appendChild(racb);
    ReactDOM.render(
        <React_AsymmetricalChordBox
            theta={3 * Math.PI / 4}
            chordCols={
                [MINOR_CHORDS, MAJOR_CHORDS].map(chord =>
                    ['D', 'Gb', 'Bb'].map(n => chord[n])
                )
            }
            chordLinks={[
                [MAJOR_CHORDS['D'], MINOR_CHORDS['D']],
                [MAJOR_CHORDS['D'], MINOR_CHORDS['Gb']],
                [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Gb']],
                [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Bb']],
                [MAJOR_CHORDS['Bb'], MINOR_CHORDS['Bb']],
                [MAJOR_CHORDS['Bb'], MINOR_CHORDS['D']],
            ]}
        />,
        racb,
    );

    racb = document.createElement('div');
    triadContainer.node.appendChild(racb);
    ReactDOM.render(
        <React_AsymmetricalChordBox
            theta={5 * Math.PI / 4}
            chordCols={
                [MAJOR_CHORDS, MINOR_CHORDS].map(chord =>
                    ['F', 'A', 'Db'].map(n => chord[n])
                )
            }
            chordLinks={[
                [MAJOR_CHORDS['F'], MINOR_CHORDS['F']],
                [MAJOR_CHORDS['F'], MINOR_CHORDS['A']],
                [MAJOR_CHORDS['A'], MINOR_CHORDS['A']],
                [MAJOR_CHORDS['A'], MINOR_CHORDS['Db']],
                [MAJOR_CHORDS['Db'], MINOR_CHORDS['Db']],
                [MAJOR_CHORDS['Db'], MINOR_CHORDS['F']],
            ]}
        />,
        racb,
    );

});

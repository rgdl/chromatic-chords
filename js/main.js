import React from 'react';
import ReactDOM from 'react-dom';

import { AUG_TRIADS, MAJOR_CHORDS, MINOR_CHORDS, assertChordDistanceEquals } from './chords.js';
import { DIATONIC_SCALES } from './scales.js';

import AsymmetricalChordBox from './components/AsymmetricalChordBox.js';
import CardinalChordBox from './components/CardinalChordBox.js';
import ScaleFilterBox from './components/ScaleFilterBox.js';
import LineTo from './components/LineTo.js';


// TODO: eventually should have index.js instead of index.html
// TODO: make chord boxes look better
// TODO: tooltip over chord telling which keys it's in
// TODO: add 7th chords!

const chordsBetweenCAndG = [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['C', 'E', 'Ab'].map(n => chord[n]));
const chordLinksBetweenCAndG = [
    [MINOR_CHORDS['C'], MAJOR_CHORDS['C']], [MINOR_CHORDS['E'], MAJOR_CHORDS['C']],
    [MINOR_CHORDS['E'], MAJOR_CHORDS['E']], [MINOR_CHORDS['Ab'], MAJOR_CHORDS['E']],
    [MINOR_CHORDS['Ab'], MAJOR_CHORDS['Ab']], [MINOR_CHORDS['C'], MAJOR_CHORDS['Ab']],
];
chordsBetweenCAndG[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['C'], 1));
chordsBetweenCAndG[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['G'], 1));

const chordsBetweenGAndD = [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['G', 'B', 'Eb'].map(n => chord[n]));
const chordLinksBetweenGAndD = [
    [MAJOR_CHORDS['G'], MINOR_CHORDS['G']], [MAJOR_CHORDS['G'], MINOR_CHORDS['B']],
    [MAJOR_CHORDS['B'], MINOR_CHORDS['B']], [MAJOR_CHORDS['B'], MINOR_CHORDS['Eb']],
    [MAJOR_CHORDS['Eb'], MINOR_CHORDS['Eb']], [MAJOR_CHORDS['Eb'], MINOR_CHORDS['G']],
];
chordsBetweenGAndD[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['G'], 1));
chordsBetweenGAndD[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['D'], 1));

const chordsBetweenDAndF = [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['D', 'Gb', 'Bb'].map(n => chord[n]));
const chordLinksBetweenDAndF = [
    [MAJOR_CHORDS['D'], MINOR_CHORDS['D']], [MAJOR_CHORDS['D'], MINOR_CHORDS['Gb']],
    [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Gb']], [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Bb']],
    [MAJOR_CHORDS['Bb'], MINOR_CHORDS['Bb']], [MAJOR_CHORDS['Bb'], MINOR_CHORDS['D']],
];
chordsBetweenDAndF[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['D'], 1));
chordsBetweenDAndF[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['F'], 1));

const chordsBetweenFAndC = [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['F', 'A', 'Db'].map(n => chord[n]));
const chordLinksBetweenFAndC = [
    [MINOR_CHORDS['F'], MAJOR_CHORDS['F']], [MINOR_CHORDS['A'], MAJOR_CHORDS['F']],
    [MINOR_CHORDS['A'], MAJOR_CHORDS['A']], [MINOR_CHORDS['Db'], MAJOR_CHORDS['A']],
    [MINOR_CHORDS['Db'], MAJOR_CHORDS['Db']], [MINOR_CHORDS['F'], MAJOR_CHORDS['Db']],
];
chordsBetweenFAndC[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['F'], 1));
chordsBetweenFAndC[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['C'], 1));

const connectingLineProps = [
    { from: "c-aug-box", fromAnchor: "right", to: "chords-between-c-and-g-box" },
    { from: "c-aug-box", fromAnchor: "left", to: "chords-between-f-and-c-box" },
    { from: "g-aug-box", fromAnchor: "top", to: "chords-between-c-and-g-box" },
    { from: "g-aug-box", fromAnchor: "bottom", to: "chords-between-g-and-d-box" },
    { from: "d-aug-box", fromAnchor: "right", to: "chords-between-g-and-d-box" },
    { from: "d-aug-box", fromAnchor: "left", to: "chords-between-d-and-f-box" },
    { from: "f-aug-box", fromAnchor: "bottom", to: "chords-between-d-and-f-box" },
    { from: "f-aug-box", fromAnchor: "top", to: "chords-between-f-and-c-box" },
];

function buildPositionClassName(n, total) {
    // If this is the 2nd of 6 chord boxes in a circle, we should have n = 1, total = 6
    return `box-position-${n}-of-${total}`;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedScales: {}, selectedChords: [] };
    }

    onSelectScale = (scale) => {
        this.setState(prevState => (
            { selectedScales: {
                ...prevState.selectedScales,
                [scale]: !prevState.selectedScales[scale],
            }}
        ), this.getChordsFromScales);
    }

    getChordsFromScales = () => {
        // Use the currently selected scales to work out which chords to highlight
        const chords = [];
        Object.values(DIATONIC_SCALES)
            .filter(s => this.state.selectedScales[s.name])
            .map(s => s.chords.map(c => chords.includes(c) || chords.push(c)));
        this.setState({ selectedChords: chords });
    }

    render() {
        const nTriadBoxes = 8;

        return (
            <React.Fragment>
                <h1>Chromatic Chords</h1>

                <h2>Triads</h2>
                <div className='triad-container'>
                    <CardinalChordBox
                        chord={AUG_TRIADS['C']}
                        lineToClassName="c-aug-box"
                        positionClassName={buildPositionClassName(0, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={chordsBetweenCAndG}
                        chordLinks={chordLinksBetweenCAndG}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-c-and-g-box"
                        positionClassName={buildPositionClassName(1, nTriadBoxes)}
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['G']}
                        lineToClassName="g-aug-box"
                        positionClassName={buildPositionClassName(2, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={chordsBetweenGAndD}
                        chordLinks={chordLinksBetweenGAndD}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-g-and-d-box"
                        positionClassName={buildPositionClassName(3, nTriadBoxes)}
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['D']}
                        lineToClassName="d-aug-box"
                        positionClassName={buildPositionClassName(4, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={chordsBetweenDAndF}
                        chordLinks={chordLinksBetweenDAndF}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-d-and-f-box"
                        positionClassName={buildPositionClassName(5, nTriadBoxes)}
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['F']}
                        lineToClassName="f-aug-box"
                        positionClassName={buildPositionClassName(6, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={chordsBetweenFAndC}
                        chordLinks={chordLinksBetweenFAndC}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-f-and-c-box"
                        positionClassName={buildPositionClassName(7, nTriadBoxes)}
                    />
                    {connectingLineProps.map((p, i) => (
                        <LineTo {...p} borderColor="darkred" zIndex={0} key={i} />
                    ))}
                </div>

                <ScaleFilterBox
                    onSelectScale={this.onSelectScale}
                    selectedScales={this.state.selectedScales}
                />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

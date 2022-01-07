import React from 'react';
import ReactDOM from 'react-dom';

import { TRIAD_GROUPS, TRIAD_LINKS } from './chords.js';
import { AUG_TRIADS } from './chords.js';
import { DIATONIC_SCALES } from './scales.js';
import AsymmetricalChordBox from './components/AsymmetricalChordBox.js';
import CardinalChordBox from './components/CardinalChordBox.js';
import ScaleFilterBox from './components/ScaleFilterBox.js';
import LineTo from './components/LineTo.js';


// TODO: eventually should have index.js instead of index.html
// TODO: make chord boxes look better
// TODO: tooltip over chord telling which keys it's in
// TODO: add 7th chords!

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
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['C'])
                        }
                        lineToClassName="c-aug-box"
                        positionClassName={buildPositionClassName(6, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenCAndG}
                        chordLinks={TRIAD_LINKS.betweenCAndG}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-c-and-g-box"
                        positionClassName={buildPositionClassName(7, nTriadBoxes)}
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['G']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['G'])
                        }
                        lineToClassName="g-aug-box"
                        positionClassName={buildPositionClassName(0, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenGAndD}
                        chordLinks={TRIAD_LINKS.betweenGAndD}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-g-and-d-box"
                        positionClassName={buildPositionClassName(1, nTriadBoxes)}
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['D']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['D'])
                        }
                        lineToClassName="d-aug-box"
                        positionClassName={buildPositionClassName(2, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenDAndF}
                        chordLinks={TRIAD_LINKS.betweenDAndF}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-d-and-f-box"
                        positionClassName={buildPositionClassName(3, nTriadBoxes)}
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['F']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['F'])
                        }
                        lineToClassName="f-aug-box"
                        positionClassName={buildPositionClassName(4, nTriadBoxes)}
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenFAndC}
                        chordLinks={TRIAD_LINKS.betweenFAndC}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="chords-between-f-and-c-box"
                        positionClassName={buildPositionClassName(5, nTriadBoxes)}
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

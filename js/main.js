import React from 'react';
import ReactDOM from 'react-dom';

import { TRIAD_GROUPS, TRIAD_LINKS, SEVENTH_GROUPS, SEVENTH_LINKS } from './chords.js';
import { AUG_TRIADS, DIMINISHED_7THS } from './chords.js';
import { DIATONIC_SCALES } from './scales.js';
import AsymmetricalChordBox from './components/AsymmetricalChordBox.js';
import CardinalChordBox from './components/CardinalChordBox.js';
import ScaleFilterBox from './components/ScaleFilterBox.js';
import LineTo from './components/LineTo.js';



// TODO: Display as a CSS grid?
// TODO: eventually should have index.js instead of index.html, match the structure of a stock example react repo
// TODO: make chord boxes look better, probably each chord as a separate bubble
// TODO: tooltip over chord telling which keys it's in
// TODO: fix lines on 7th chords

const connectingLineProps = [
    { from: "c-aug-box", fromAnchor: "right", to: "triads-between-c-and-g-box" },
    { from: "c-aug-box", fromAnchor: "left", to: "triads-between-f-and-c-box" },
    { from: "g-aug-box", fromAnchor: "top", to: "triads-between-c-and-g-box" },
    { from: "g-aug-box", fromAnchor: "bottom", to: "triads-between-g-and-d-box" },
    { from: "d-aug-box", fromAnchor: "right", to: "triads-between-g-and-d-box" },
    { from: "d-aug-box", fromAnchor: "left", to: "triads-between-d-and-f-box" },
    { from: "f-aug-box", fromAnchor: "bottom", to: "triads-between-d-and-f-box" },
    { from: "f-aug-box", fromAnchor: "top", to: "triads-between-f-and-c-box" },
];

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
        return (
            <React.Fragment>
                <h1>Chromatic Chords</h1>

                <h2>Triads</h2>
                <div className='chord-container'>
                    <CardinalChordBox
                        chord={AUG_TRIADS['C']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['C'])
                        }
                        lineToClassName="c-aug-box"
                        positionClassName="top-box h-middle-box"
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenCAndG}
                        chordLinks={TRIAD_LINKS.betweenCAndG}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="triads-between-c-and-g-box"
                        positionClassName="top-box right-box"
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['G']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['G'])
                        }
                        lineToClassName="g-aug-box"
                        positionClassName="v-middle-box right-box"
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenGAndD}
                        chordLinks={TRIAD_LINKS.betweenGAndD}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="triads-between-g-and-d-box"
                        positionClassName="bottom-box right-box"
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['D']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['D'])
                        }
                        lineToClassName="d-aug-box"
                        positionClassName="bottom-box h-middle-box"
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenDAndF}
                        chordLinks={TRIAD_LINKS.betweenDAndF}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="triads-between-d-and-f-box"
                        positionClassName="bottom-box left-box"
                    />

                    <CardinalChordBox
                        chord={AUG_TRIADS['F']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(AUG_TRIADS['F'])
                        }
                        lineToClassName="f-aug-box"
                        positionClassName="v-middle-box left-box"
                    />
                    <AsymmetricalChordBox
                        chordCols={TRIAD_GROUPS.betweenFAndC}
                        chordLinks={TRIAD_LINKS.betweenFAndC}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="triads-between-f-and-c-box"
                        positionClassName="top-box left-box"
                    />
                    {connectingLineProps.map((p, i) => (
                        <LineTo {...p} borderColor="darkred" zIndex={0} key={i} />
                    ))}
                </div>

                <ScaleFilterBox
                    onSelectScale={this.onSelectScale}
                    selectedScales={this.state.selectedScales}
                />

                <h2>7th Chords</h2>
                <div className='chord-container'>
                    <CardinalChordBox
                        chord={DIMINISHED_7THS['C']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(DIMINISHED_7THS['C'])
                        }
                        lineToClassName="c-dim-box"
                        positionClassName="top-box h-middle-box"
                    />
                    <AsymmetricalChordBox
                        chordCols={SEVENTH_GROUPS.betweenFAndC}
                        chordLinks={SEVENTH_LINKS.betweenFAndC}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="sevenths-between-f-and-c-box"
                        positionClassName="v-middle-box left-box"
                    />
                    <CardinalChordBox
                        chord={DIMINISHED_7THS['F']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(DIMINISHED_7THS['F'])
                        }
                        lineToClassName="f-dim-box"
                        positionClassName="bottom-box left-box"
                    />
                    <AsymmetricalChordBox
                        chordCols={SEVENTH_GROUPS.betweenGAndF}
                        chordLinks={SEVENTH_LINKS.betweenGAndF}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="sevenths-between-g-and-f-box"
                        positionClassName="v-middle-box right-box"
                    />
                    <CardinalChordBox
                        chord={DIMINISHED_7THS['G']}
                        isSelected={
                            this.state.selectedChords.length === 0
                            || this.state.selectedChords.includes(DIMINISHED_7THS['G'])
                        }
                        lineToClassName="g-dim-box"
                        positionClassName="bottom-box right-box"
                    />
                    <AsymmetricalChordBox
                        chordCols={SEVENTH_GROUPS.betweenCAndG}
                        chordLinks={SEVENTH_LINKS.betweenCAndG}
                        selectedChords={this.state.selectedChords}
                        lineToClassName="sevenths-between-c-and-g-box"
                        positionClassName="bottom-box h-middle-box"
                    />
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

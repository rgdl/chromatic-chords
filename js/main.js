import React from 'react';
import ReactDOM from 'react-dom';

import { AUG_TRIADS, MAJOR_CHORDS, MINOR_CHORDS } from './chords.js';
import { ChordContainer } from './visualElements.js';

import AsymmetricalChordBox from './components/AsymmetricalChordBox.js';
import CardinalChordBox from './components/CardinalChordBox.js';
import { CONTAINER_SIZE, NODE_SIZE } from './consts.js';


// TODO: eventually should have index.js instead of index.html
// TODO: what else needs to be moved from vanilla javascript to react?

function assertChromaticNeighbour(chord, otherChords) {
    const allDistances = otherChords.map(c => c.distance(chord));
    console.assert(Math.min(...allDistances) === 1, `Failed for ${chord.name} and ${otherChords.map(c => c.name)}`);
}

const chordsBetweenCAndG = [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['C', 'E', 'Ab'].map(n => chord[n]));
const chordLinksBetweenCAndG = [
    [MINOR_CHORDS['C'], MAJOR_CHORDS['C']], [MINOR_CHORDS['E'], MAJOR_CHORDS['C']],
    [MINOR_CHORDS['E'], MAJOR_CHORDS['E']], [MINOR_CHORDS['Ab'], MAJOR_CHORDS['E']],
    [MINOR_CHORDS['Ab'], MAJOR_CHORDS['Ab']], [MINOR_CHORDS['C'], MAJOR_CHORDS['Ab']],
];
assertChromaticNeighbour(AUG_TRIADS['C'], chordsBetweenCAndG[0]);
assertChromaticNeighbour(AUG_TRIADS['G'], chordsBetweenCAndG[1]);

const chordsBetweenGAndD = [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['G', 'B', 'Eb'].map(n => chord[n]));
const chordLinksBetweenGAndD = [
    [MAJOR_CHORDS['G'], MINOR_CHORDS['G']], [MAJOR_CHORDS['G'], MINOR_CHORDS['B']],
    [MAJOR_CHORDS['B'], MINOR_CHORDS['B']], [MAJOR_CHORDS['B'], MINOR_CHORDS['Eb']],
    [MAJOR_CHORDS['Eb'], MINOR_CHORDS['Eb']], [MAJOR_CHORDS['Eb'], MINOR_CHORDS['G']],
];
assertChromaticNeighbour(AUG_TRIADS['G'], chordsBetweenGAndD[1]);
assertChromaticNeighbour(AUG_TRIADS['D'], chordsBetweenGAndD[0]);

const chordsBetweenDAndF = [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['D', 'Gb', 'Bb'].map(n => chord[n]));
const chordLinksBetweenDAndF = [
    [MAJOR_CHORDS['D'], MINOR_CHORDS['D']], [MAJOR_CHORDS['D'], MINOR_CHORDS['Gb']],
    [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Gb']], [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Bb']],
    [MAJOR_CHORDS['Bb'], MINOR_CHORDS['Bb']], [MAJOR_CHORDS['Bb'], MINOR_CHORDS['D']],
];
assertChromaticNeighbour(AUG_TRIADS['D'], chordsBetweenDAndF[1]);
assertChromaticNeighbour(AUG_TRIADS['F'], chordsBetweenDAndF[0]);

const chordsBetweenFAndC = [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['F', 'A', 'Db'].map(n => chord[n]));
const chordLinksBetweenFAndC = [
    [MINOR_CHORDS['F'], MAJOR_CHORDS['F']], [MINOR_CHORDS['A'], MAJOR_CHORDS['F']],
    [MINOR_CHORDS['A'], MAJOR_CHORDS['A']], [MINOR_CHORDS['Db'], MAJOR_CHORDS['A']],
    [MINOR_CHORDS['Db'], MAJOR_CHORDS['Db']], [MINOR_CHORDS['F'], MAJOR_CHORDS['Db']],
];
assertChromaticNeighbour(AUG_TRIADS['F'], chordsBetweenFAndC[0]);
assertChromaticNeighbour(AUG_TRIADS['C'], chordsBetweenFAndC[1]);

class App extends React.Component {
    render() {
        return (
			<React.Fragment>
				<h1>Chromatic Chords</h1>

				<h2>Triads</h2>
				<div
					className='triad-container'
					style={{
						width: `${CONTAINER_SIZE}%`, height: `${CONTAINER_SIZE}%`,
						marginTop: `${NODE_SIZE / 2}%`,  marginBottom: `${NODE_SIZE / 2}%`,
					}}
				>
					<CardinalChordBox theta={3 * Math.PI / 2} chord={AUG_TRIADS['C']} />
					<AsymmetricalChordBox theta={7 * Math.PI / 4} chordCols={chordsBetweenCAndG} chordLinks={chordLinksBetweenCAndG} />

					<CardinalChordBox theta={0} chord={AUG_TRIADS['G']} />
					<AsymmetricalChordBox theta={1 * Math.PI / 4} chordCols={chordsBetweenGAndD} chordLinks={chordLinksBetweenGAndD} />

					<CardinalChordBox theta={Math.PI / 2} chord={AUG_TRIADS['D']} />
					<AsymmetricalChordBox theta={3 * Math.PI / 4} chordCols={chordsBetweenDAndF} chordLinks={chordLinksBetweenDAndF} />

					<CardinalChordBox theta={Math.PI} chord={AUG_TRIADS['F']} />
					<AsymmetricalChordBox theta={5 * Math.PI / 4} chordCols={chordsBetweenFAndC} chordLinks={chordLinksBetweenFAndC} />
				</div>
			</React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

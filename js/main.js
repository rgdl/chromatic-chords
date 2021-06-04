import { AUG_TRIADS, MAJOR_CHORDS, MINOR_CHORDS } from './chords.js';
import { ChordContainer } from './visualElements.js';
import { AsymmetricalChordBox, CardinalChordBox } from './chordBox.js';


document.addEventListener('DOMContentLoaded', function() {
    const triadContainer = new ChordContainer(
        document.getElementById("triad-container")
    );

    // TODO: uncomment once it does something
    //const triadSelection = new ChordSelection(
    //    document.getElementById("triad-selection")
    //);

    // Cardinal boxes
    const cardinalBoxPositions = [[0, 0.5], [0.5, 0], [1, 0.5], [0.5, 1]];
    const triadCardinalBoxes = Object.fromEntries(
        ['C', 'F', 'D', 'G'].map((n, i) => [
            n, new CardinalChordBox(triadContainer, `${n} augmented`, AUG_TRIADS[n], cardinalBoxPositions[i])
        ])
    );

    // Triads boxes
    new AsymmetricalChordBox(
        triadContainer,
        [triadCardinalBoxes['C'], triadCardinalBoxes['G']],
        [MAJOR_CHORDS, MINOR_CHORDS].map(chord =>
            ['C', 'E', 'Ab'].map(n => chord[n])
        ),
        [
            [MAJOR_CHORDS['C'], MINOR_CHORDS['C']],
            [MAJOR_CHORDS['C'], MINOR_CHORDS['E']],
            [MAJOR_CHORDS['E'], MINOR_CHORDS['E']],
            [MAJOR_CHORDS['E'], MINOR_CHORDS['Ab']],
            [MAJOR_CHORDS['Ab'], MINOR_CHORDS['Ab']],
            [MAJOR_CHORDS['Ab'], MINOR_CHORDS['C']],
        ],
    );

    new AsymmetricalChordBox(
        triadContainer,
        [triadCardinalBoxes['D'], triadCardinalBoxes['G']],
        [MINOR_CHORDS, MAJOR_CHORDS].map(chord =>
            ['G', 'B', 'Eb'].map(n => chord[n])
        ),
        [
            [MAJOR_CHORDS['G'], MINOR_CHORDS['G']],
            [MAJOR_CHORDS['G'], MINOR_CHORDS['B']],
            [MAJOR_CHORDS['B'], MINOR_CHORDS['B']],
            [MAJOR_CHORDS['B'], MINOR_CHORDS['Eb']],
            [MAJOR_CHORDS['Eb'], MINOR_CHORDS['Eb']],
            [MAJOR_CHORDS['Eb'], MINOR_CHORDS['G']],
        ],
    );

    new AsymmetricalChordBox(
        triadContainer,
        [triadCardinalBoxes['F'], triadCardinalBoxes['D']],
        [MINOR_CHORDS, MAJOR_CHORDS].map(chord =>
            ['D', 'Gb', 'Bb'].map(n => chord[n])
        ),
        [
            [MAJOR_CHORDS['D'], MINOR_CHORDS['D']],
            [MAJOR_CHORDS['D'], MINOR_CHORDS['Gb']],
            [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Gb']],
            [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Bb']],
            [MAJOR_CHORDS['Bb'], MINOR_CHORDS['Bb']],
            [MAJOR_CHORDS['Bb'], MINOR_CHORDS['D']],
        ],
    );

    new AsymmetricalChordBox(
        triadContainer,
        [triadCardinalBoxes['F'], triadCardinalBoxes['C']],
        [MAJOR_CHORDS, MINOR_CHORDS].map(chord =>
            ['F', 'A', 'Db'].map(n => chord[n])
        ),
        [
            [MAJOR_CHORDS['F'], MINOR_CHORDS['F']],
            [MAJOR_CHORDS['F'], MINOR_CHORDS['A']],
            [MAJOR_CHORDS['A'], MINOR_CHORDS['A']],
            [MAJOR_CHORDS['A'], MINOR_CHORDS['Db']],
            [MAJOR_CHORDS['Db'], MINOR_CHORDS['Db']],
            [MAJOR_CHORDS['Db'], MINOR_CHORDS['F']],
        ],
    );

});

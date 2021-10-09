/*
 * A Scale is just a set of Chords.
*/
import { AUG_TRIADS, MAJOR_CHORDS, MINOR_CHORDS } from './chords.js';
import { NOTE_NAMES } from './consts.js';

export default class Scale {
    constructor(name, chords) {
        this.name = name;
        this.chords = chords;
    }

    contains(chord) {
        return this.chords.includes(chord);
    }
};

export const DIATONIC_SCALES = Object.fromEntries(NOTE_NAMES.map(
    (root, i) => [root, new Scale(
        `${root} Major`,
        [
            MAJOR_CHORDS[NOTE_NAMES[i % 12]],
            MINOR_CHORDS[NOTE_NAMES[(i + 2) % 12]],
            MINOR_CHORDS[NOTE_NAMES[(i + 4) % 12]],
            MAJOR_CHORDS[NOTE_NAMES[(i + 5) % 12]],
            MAJOR_CHORDS[NOTE_NAMES[(i + 7) % 12]],
            MINOR_CHORDS[NOTE_NAMES[(i + 9) % 12]],
        ],
    )]
));

// Spot checks
console.assert(DIATONIC_SCALES['C'].contains(MAJOR_CHORDS['C']));
console.assert(DIATONIC_SCALES['C'].contains(MINOR_CHORDS['A']));
console.assert(DIATONIC_SCALES['B'].contains(MAJOR_CHORDS['Gb']));

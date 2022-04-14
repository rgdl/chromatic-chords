/*
 * A Scale is just a set of Chords.
*/
import { MAJOR_CHORDS, MINOR_CHORDS, MINOR_7THS, DOMINANT_7THS, HALF_DIMINISHED_7THS } from './chords.js';
import { NOTE_NAMES } from './consts.js';

export default class Scale {
    constructor(name, chords) {
        this.name = name;
        this.chords = chords;
    }

    contains(chord) {
        return this.chords.includes(chord);
    }
}

export const DIATONIC_SCALES = Object.fromEntries(NOTE_NAMES.map(
    (root, i) => [root, new Scale(
        `${root} Major`,
        [
            // Triads
            MAJOR_CHORDS[NOTE_NAMES[i % 12]],
            MINOR_CHORDS[NOTE_NAMES[(i + 2) % 12]],
            MINOR_CHORDS[NOTE_NAMES[(i + 4) % 12]],
            MAJOR_CHORDS[NOTE_NAMES[(i + 5) % 12]],
            MAJOR_CHORDS[NOTE_NAMES[(i + 7) % 12]],
            MINOR_CHORDS[NOTE_NAMES[(i + 9) % 12]],

            // 7th Chords
            MINOR_7THS[NOTE_NAMES[(i + 2) % 12]],
            MINOR_7THS[NOTE_NAMES[(i + 4) % 12]],
            DOMINANT_7THS[NOTE_NAMES[(i + 7) % 12]],
            MINOR_7THS[NOTE_NAMES[(i + 9) % 12]],
            HALF_DIMINISHED_7THS[NOTE_NAMES[(i + 11) % 12]],
        ],
    )]
));

// Spot checks
console.assert(DIATONIC_SCALES['C'].contains(MAJOR_CHORDS['C']));
console.assert(DIATONIC_SCALES['C'].contains(MINOR_CHORDS['A']));
console.assert(DIATONIC_SCALES['B'].contains(MAJOR_CHORDS['Gb']));

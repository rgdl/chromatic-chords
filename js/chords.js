import { NOTE_NAMES } from './consts';

class Chord {
    constructor(name, notes) {
        this.name = name;
        this.notes = notes;
        this.verify();
    }

    verify() {
        this.notes.map((note, i) => {
            console.assert(note >= 0);
            console.assert(note < 12);
            i > 0 && console.assert(note > this.notes[i - 1]);
        });
    }
 
    distance(other, verbose = false) {
        console.assert(this.notes.length === other.notes.length);
        let minDist = Infinity;
        const otherNotes = [...other.notes];

        // Iterate through all possible rotations of `otherNotes`
        for (let i = 0; i < this.notes.length; i++) {
            verbose && console.log(otherNotes, this.notes);
            const dist = otherNotes
                .map((n, i) => {
                    const noteDistances = [Math.abs(12 + n - this.notes[i]) % 12, Math.abs(12 + this.notes[i] - n) % 12];
                    verbose && console.log(noteDistances);
                    return Math.min(...noteDistances);
                })
                .reduce((a, b) => a + b, 0);
            if (dist < minDist) {
                minDist = dist;
            }
            verbose && console.log(dist);
            otherNotes.unshift(otherNotes.pop());
        }
        return minDist;
    }
}

function buildChordCollection(name, intervals) {
    return Object.fromEntries(NOTE_NAMES.map(
        (rootName, root) => [
            rootName,
            new Chord(
                `${rootName} ${name}`,
                intervals
                    .map(i => root + i)
                    .map(n => n % 12)
                    .sort((a, b) => a - b)
            )
        ]
    ));
}

// Triads
export const AUG_TRIADS = buildChordCollection('Augmented', [0, 4, 8]);
export const MAJOR_CHORDS = buildChordCollection('Major', [0, 4, 7]);
export const MINOR_CHORDS = buildChordCollection('Minor', [0, 3, 7]);

// 7th Chords
export const DIMINISHED_7THS = buildChordCollection('Diminished 7', [0, 3, 6, 9]);
export const DOMINANT_FLAT_5THS = buildChordCollection('Dominant Flat 5', [0, 4, 6, 10]);
export const MINOR_7THS = buildChordCollection('Minor 7th', [0, 3, 7, 10]);
export const DOMINANT_7THS = buildChordCollection('Dominant 7th', [0, 4, 7, 10]);
export const HALF_DIMINISHED_7THS = buildChordCollection('Half-Diminished 7th', [0, 3, 6, 10]);

export const TRIAD_GROUPS = {
    betweenCAndG: [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['C', 'E', 'Ab'].map(n => chord[n])),
    betweenGAndD: [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['G', 'B', 'Eb'].map(n => chord[n])),
    betweenDAndF: [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['D', 'Gb', 'Bb'].map(n => chord[n])),
    betweenFAndC: [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['F', 'A', 'Db'].map(n => chord[n])),
};

export const SEVENTH_GROUPS = {
    betweenCAndG: [
        ['C', 'Eb', 'Gb', 'A'].map(n => HALF_DIMINISHED_7THS[n]),
        [
            ...['C', 'Eb', 'Gb', 'A'].map(n => MINOR_7THS[n]),
            ...['C', 'A'].map(n => DOMINANT_FLAT_5THS[n]),
        ],
        ['C', 'Eb', 'Gb', 'A'].map(n => DOMINANT_7THS[n]),
    ],
    betweenGAndF: [
        ['G', 'Bb', 'Db', 'E'].map(n => HALF_DIMINISHED_7THS[n]),
        [
            ...['G', 'Bb', 'Db', 'E'].map(n => MINOR_7THS[n]),
            ...['G', 'E'].map(n => DOMINANT_FLAT_5THS[n]),
        ],
        ['G', 'Bb', 'Db', 'E'].map(n => DOMINANT_7THS[n]),
    ],
    betweenFAndC: [
        ['F', 'Ab', 'B', 'D'].map(n => HALF_DIMINISHED_7THS[n]),
        [
            ...['F', 'Ab', 'B', 'D'].map(n => MINOR_7THS[n]),
            ...['F', 'D'].map(n => DOMINANT_FLAT_5THS[n]),
        ],
        ['F', 'Ab', 'B', 'D'].map(n => DOMINANT_7THS[n]),
    ],
}; 

// Chords that can be interchanged by moving one voice by a semitone
export const TRIAD_LINKS = {
    betweenCAndG: [
        [MINOR_CHORDS['C'], MAJOR_CHORDS['C']], [MINOR_CHORDS['E'], MAJOR_CHORDS['C']],
        [MINOR_CHORDS['E'], MAJOR_CHORDS['E']], [MINOR_CHORDS['Ab'], MAJOR_CHORDS['E']],
        [MINOR_CHORDS['Ab'], MAJOR_CHORDS['Ab']], [MINOR_CHORDS['C'], MAJOR_CHORDS['Ab']],
    ],
    betweenGAndD: [
        [MAJOR_CHORDS['G'], MINOR_CHORDS['G']], [MAJOR_CHORDS['G'], MINOR_CHORDS['B']],
        [MAJOR_CHORDS['B'], MINOR_CHORDS['B']], [MAJOR_CHORDS['B'], MINOR_CHORDS['Eb']],
        [MAJOR_CHORDS['Eb'], MINOR_CHORDS['Eb']], [MAJOR_CHORDS['Eb'], MINOR_CHORDS['G']],
    ],
    betweenDAndF: [
        [MAJOR_CHORDS['D'], MINOR_CHORDS['D']], [MAJOR_CHORDS['D'], MINOR_CHORDS['Gb']],
        [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Gb']], [MAJOR_CHORDS['Gb'], MINOR_CHORDS['Bb']],
        [MAJOR_CHORDS['Bb'], MINOR_CHORDS['Bb']], [MAJOR_CHORDS['Bb'], MINOR_CHORDS['D']],
    ],
    betweenFAndC: [
        [MINOR_CHORDS['F'], MAJOR_CHORDS['F']], [MINOR_CHORDS['A'], MAJOR_CHORDS['F']],
        [MINOR_CHORDS['A'], MAJOR_CHORDS['A']], [MINOR_CHORDS['Db'], MAJOR_CHORDS['A']],
        [MINOR_CHORDS['Db'], MAJOR_CHORDS['Db']], [MINOR_CHORDS['F'], MAJOR_CHORDS['Db']],
    ],
};

export const SEVENTH_LINKS = {
    betweenCAndG: [
        [HALF_DIMINISHED_7THS['Eb'], MINOR_7THS['Gb']],
        [HALF_DIMINISHED_7THS['Eb'], MINOR_7THS['Eb']],
        [HALF_DIMINISHED_7THS['Eb'], DOMINANT_FLAT_5THS['A']],

        [HALF_DIMINISHED_7THS['Gb'], MINOR_7THS['A']],
        [HALF_DIMINISHED_7THS['Gb'], MINOR_7THS['Gb']],
        [HALF_DIMINISHED_7THS['Gb'], DOMINANT_FLAT_5THS['C']],

        [HALF_DIMINISHED_7THS['A'], MINOR_7THS['C']],
        [HALF_DIMINISHED_7THS['A'], MINOR_7THS['A']],
        [HALF_DIMINISHED_7THS['A'], DOMINANT_FLAT_5THS['A']],

        [HALF_DIMINISHED_7THS['C'], MINOR_7THS['Eb']],
        [HALF_DIMINISHED_7THS['C'], MINOR_7THS['C']],
        [HALF_DIMINISHED_7THS['C'], DOMINANT_FLAT_5THS['C']],

        [DOMINANT_7THS['Eb'], MINOR_7THS['C']],
        [DOMINANT_7THS['Eb'], MINOR_7THS['Eb']],
        [DOMINANT_7THS['Eb'], DOMINANT_FLAT_5THS['A']],

        [DOMINANT_7THS['Gb'], MINOR_7THS['Eb']],
        [DOMINANT_7THS['Gb'], MINOR_7THS['Gb']],
        [DOMINANT_7THS['Gb'], DOMINANT_FLAT_5THS['C']],

        [DOMINANT_7THS['A'], MINOR_7THS['Gb']],
        [DOMINANT_7THS['A'], MINOR_7THS['A']],
        [DOMINANT_7THS['A'], DOMINANT_FLAT_5THS['A']],

        [DOMINANT_7THS['C'], MINOR_7THS['A']],
        [DOMINANT_7THS['C'], MINOR_7THS['C']],
        [DOMINANT_7THS['C'], DOMINANT_FLAT_5THS['C']],
    ],

    betweenGAndF: [
        [HALF_DIMINISHED_7THS['E'], MINOR_7THS['G']],
        [HALF_DIMINISHED_7THS['E'], MINOR_7THS['E']],
        [HALF_DIMINISHED_7THS['E'], DOMINANT_FLAT_5THS['E']],

        [HALF_DIMINISHED_7THS['G'], MINOR_7THS['Bb']],
        [HALF_DIMINISHED_7THS['G'], MINOR_7THS['G']],
        [HALF_DIMINISHED_7THS['G'], DOMINANT_FLAT_5THS['G']],

        [HALF_DIMINISHED_7THS['Bb'], MINOR_7THS['Db']],
        [HALF_DIMINISHED_7THS['Bb'], MINOR_7THS['Bb']],
        [HALF_DIMINISHED_7THS['Bb'], DOMINANT_FLAT_5THS['E']],

        [HALF_DIMINISHED_7THS['Db'], MINOR_7THS['E']],
        [HALF_DIMINISHED_7THS['Db'], MINOR_7THS['Db']],
        [HALF_DIMINISHED_7THS['Db'], DOMINANT_FLAT_5THS['G']],

        [DOMINANT_7THS['E'], MINOR_7THS['Db']],
        [DOMINANT_7THS['E'], MINOR_7THS['E']],
        [DOMINANT_7THS['E'], DOMINANT_FLAT_5THS['E']],

        [DOMINANT_7THS['G'], MINOR_7THS['E']],
        [DOMINANT_7THS['G'], MINOR_7THS['G']],
        [DOMINANT_7THS['G'], DOMINANT_FLAT_5THS['G']],

        [DOMINANT_7THS['Bb'], MINOR_7THS['G']],
        [DOMINANT_7THS['Bb'], MINOR_7THS['Bb']],
        [DOMINANT_7THS['Bb'], DOMINANT_FLAT_5THS['E']],

        [DOMINANT_7THS['Db'], MINOR_7THS['Bb']],
        [DOMINANT_7THS['Db'], MINOR_7THS['Db']],
        [DOMINANT_7THS['Db'], DOMINANT_FLAT_5THS['G']],
    ],

    betweenFAndC: [
        [HALF_DIMINISHED_7THS['F'], MINOR_7THS['Ab']],
        [HALF_DIMINISHED_7THS['F'], MINOR_7THS['F']],
        [HALF_DIMINISHED_7THS['F'], DOMINANT_FLAT_5THS['F']],

        [HALF_DIMINISHED_7THS['Ab'], MINOR_7THS['B']],
        [HALF_DIMINISHED_7THS['Ab'], MINOR_7THS['Ab']],
        [HALF_DIMINISHED_7THS['Ab'], DOMINANT_FLAT_5THS['D']],

        [HALF_DIMINISHED_7THS['B'], MINOR_7THS['D']],
        [HALF_DIMINISHED_7THS['B'], MINOR_7THS['B']],
        [HALF_DIMINISHED_7THS['B'], DOMINANT_FLAT_5THS['F']],

        [HALF_DIMINISHED_7THS['D'], MINOR_7THS['F']],
        [HALF_DIMINISHED_7THS['D'], MINOR_7THS['D']],
        [HALF_DIMINISHED_7THS['D'], DOMINANT_FLAT_5THS['D']],

        [DOMINANT_7THS['F'], MINOR_7THS['D']],
        [DOMINANT_7THS['F'], MINOR_7THS['F']],
        [DOMINANT_7THS['F'], DOMINANT_FLAT_5THS['F']],

        [DOMINANT_7THS['Ab'], MINOR_7THS['F']],
        [DOMINANT_7THS['Ab'], MINOR_7THS['Ab']],
        [DOMINANT_7THS['Ab'], DOMINANT_FLAT_5THS['D']],

        [DOMINANT_7THS['B'], MINOR_7THS['B']],
        [DOMINANT_7THS['B'], MINOR_7THS['B']],
        [DOMINANT_7THS['B'], DOMINANT_FLAT_5THS['F']],

        [DOMINANT_7THS['D'], MINOR_7THS['B']],
        [DOMINANT_7THS['D'], MINOR_7THS['D']],
        [DOMINANT_7THS['D'], DOMINANT_FLAT_5THS['D']],
    ],
};

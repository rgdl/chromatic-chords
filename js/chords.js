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

export const AUG_TRIADS = Object.fromEntries(['C', 'F', 'D', 'G'].map(
    (root, i) => [root, new Chord(`${root} Augmented`, [i, 4 + i, 8 + i])]
));

export const MAJOR_CHORDS = Object.fromEntries(NOTE_NAMES.map(
    (root, i) => [root, new Chord(`${root} Major`, [i, 4 + i, 7 + i].map(n => n % 12).sort((a, b) => a - b))]
));

export const MINOR_CHORDS = Object.fromEntries(NOTE_NAMES.map(
    (root, i) => [root, new Chord(`${root} Minor`, [i, 3 + i, 7 + i].map(n => n % 12).sort((a, b) => a - b))]
));

export function assertChordDistanceEquals(chordA, chordB, expectedDistance) {
    const actualDistance = chordA.distance(chordB);
    if (actualDistance !== expectedDistance) {
        chordA.distance(chordB);
        throw new Error(`Distance from ${chordA.name} to ${chordB.name} is ${actualDistance}, but the expected distance is ${expectedDistance}`);
    }
}

// Spot-check assertions on chord distances
[['C', 'F'], ['F', 'D'], ['D', 'G'], ['G', 'C']].map(
    chords => assertChordDistanceEquals(AUG_TRIADS[chords[0]], AUG_TRIADS[chords[1]], 3)
);
[['C', 'D'], ['F', 'G'], ['D', 'C'], ['G', 'F']].map(
    chords => assertChordDistanceEquals(AUG_TRIADS[chords[0]], AUG_TRIADS[chords[1]], 6)
);
assertChordDistanceEquals(MAJOR_CHORDS['C'], MINOR_CHORDS['E'], 1);
assertChordDistanceEquals(MAJOR_CHORDS['C'], MAJOR_CHORDS['G'], 3);
assertChordDistanceEquals(MAJOR_CHORDS['E'], AUG_TRIADS['C'], 1);
assertChordDistanceEquals(AUG_TRIADS['C'], MAJOR_CHORDS['E'], 1);

export const TRIAD_GROUPS = {
    betweenCAndG: [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['C', 'E', 'Ab'].map(n => chord[n])),
    betweenGAndD: [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['G', 'B', 'Eb'].map(n => chord[n])),
    betweenDAndF: [MINOR_CHORDS, MAJOR_CHORDS].map(chord => ['D', 'Gb', 'Bb'].map(n => chord[n])),
    betweenFAndC: [MAJOR_CHORDS, MINOR_CHORDS].map(chord => ['F', 'A', 'Db'].map(n => chord[n])),
};

// Spot-check on triad groups
TRIAD_GROUPS.betweenCAndG[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['C'], 1));
TRIAD_GROUPS.betweenCAndG[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['G'], 1));

TRIAD_GROUPS.betweenGAndD[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['G'], 1));
TRIAD_GROUPS.betweenGAndD[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['D'], 1));

TRIAD_GROUPS.betweenDAndF[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['D'], 1));
TRIAD_GROUPS.betweenDAndF[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['F'], 1));

TRIAD_GROUPS.betweenFAndC[0].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['F'], 1));
TRIAD_GROUPS.betweenFAndC[1].map(chord => assertChordDistanceEquals(chord, AUG_TRIADS['C'], 1));

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

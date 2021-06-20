const NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export default class Chord {
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
[['C', 'F'], ['F', 'D'], ['D', 'G'], ['G', 'C']].map(chords => assertChordDistanceEquals(AUG_TRIADS[chords[0]], AUG_TRIADS[chords[1]], 3));
[['C', 'D'], ['F', 'G'], ['D', 'C'], ['G', 'F']].map(chords => assertChordDistanceEquals(AUG_TRIADS[chords[0]], AUG_TRIADS[chords[1]], 6));
assertChordDistanceEquals(MAJOR_CHORDS['C'], MINOR_CHORDS['E'], 1);
assertChordDistanceEquals(MAJOR_CHORDS['C'], MAJOR_CHORDS['G'], 3);
assertChordDistanceEquals(MAJOR_CHORDS['E'], AUG_TRIADS['C'], 1);
assertChordDistanceEquals(AUG_TRIADS['C'], MAJOR_CHORDS['E'], 1);

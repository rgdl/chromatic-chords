// TODO: because of CORS issues, need to supply over a local server if I want importable modules. This may become necessary if the file grows too much. Rather than the server approach, maybe I could have a transpiling step with webpack?
// TODO: position with flex box or grid instead?
const CONTAINER_SIZE = 60;
const NODE_SIZE = CONTAINER_SIZE / 6;

const NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

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

const AUG_TRIADS = Object.fromEntries(['C', 'F', 'D', 'G'].map(
    (root, i) => [root, new Chord(`${root} Augmented`, [i, 4 + i, 8 + i])]
));

const MAJOR_CHORDS = Object.fromEntries(NOTE_NAMES.map(
    (root, i) => [root, new Chord(`${root} Major`, [i, 4 + i, 7 + i].map(n => n % 12).sort((a, b) => a - b))]
));

const MINOR_CHORDS = Object.fromEntries(NOTE_NAMES.map(
    (root, i) => [root, new Chord(`${root} Minor`, [i, 3 + i, 7 + i].map(n => n % 12).sort((a, b) => a - b))]
));

function assertChordDistanceEquals(chordA, chordB, expectedDistance) {
    const actualDistance = chordA.distance(chordB);
    if (actualDistance !== expectedDistance) {
        chordA.distance(chordB, verbose = true);
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

class VisualElement {
    constructor(node, style = {}) {
        this.node = node;
        this.applyStyle(style);
    }

    applyStyle(style) {
        Object.keys(style).map(k => this.node.style[k] = style[k]);
    }
}

class ChordSelection extends VisualElement {
    constructor(node) {
        super(node);
    }
}

class ChordContainer extends VisualElement {
    constructor(node) {
        super(
            node,
            {
                width: `${CONTAINER_SIZE}%`, height: `${CONTAINER_SIZE}%`,
                marginTop: `${NODE_SIZE / 2}%`,  marginBottom: `${NODE_SIZE / 2}%`,
            },
        );

        // Un-hide once properties are set
        this.node.style.display = 'block';
    }

    appendChild(node) {
        this.node.appendChild(node);
    }
}

class ChordBox extends VisualElement {
    constructor(container, text, position) {
        const node = document.createElement('div');
        if (text) {
            node.textContent = text;
        }
        node.className = 'chord-box';
        container.appendChild(node);
        super(
            node,
            {
                width: `${NODE_SIZE}%`, left: `${position[1] * 100 - NODE_SIZE / 2}%`,
                height: `${NODE_SIZE}%`, top: `${position[0] * 100 - NODE_SIZE / 2}%`,
            },
        );
        this.position = position;
        this.validate();
    }

    validate() {
        console.assert(Math.min(...this.position) >= 0)
        console.assert(Math.max(...this.position) <= 1)
    }
}

/**
 * A symmetrical chord (augmented triad or diminished seventh)
 */
class CardinalChordBox extends ChordBox {
    constructor(container, text, chord, position) {
        super(container, text, position);
        this.chord = chord;
    }
}

/**
 * A collection of asymettrical chords (e.g. major triads, dominant sevenths)
 */
class AsymmetricalChordBox extends ChordBox {
    constructor(container, neighbours, chordCols, chordLinks) {
        console.assert(neighbours.length === 2);
        const position = [0, 1].map(i => (neighbours[0].position[i] + neighbours[1].position[i]) / 2);
        super(container, null, position);
        this.chordCols = chordCols;
        this.checkChordDistances();
    }

    checkChordDistances() {
        this.chordCols[0].map(chord => assertChordDistanceEquals(neighbours[0].chord, chord, 1));
        this.chordCols[this.chordCols.length - 1].map(chord => assertChordDistanceEquals(neighbours[1].chord, chord, 1));

        // TODO: assertions going from column to column within 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const triadContainer = new ChordContainer(
        document.getElementById("triad-container")
    )

    const triadSelection = new ChordSelection(
        document.getElementById("triad-selection")
    );

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
        neighbours = [triadCardinalBoxes['C'], triadCardinalBoxes['G']],
        chordCols = [MAJOR_CHORDS, MINOR_CHORDS].map(chord =>
            ['C', 'E', 'Ab'].map(n => chord[n])
        ),
    );
    //new AsymmetricalChordBox(triadContainer, [1, 0.5])
    //new AsymmetricalChordBox(triadContainer, [0.5, 0.75])
})

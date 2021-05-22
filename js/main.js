// TODO: because of CORS issues, need to supply over a local server if I want importable modules. This may become necessary if the file grows too much
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

    distance(other) {
        console.assert(this.notes.length === other.notes.length);
        let minDist = Infinity;
        const otherNotes = [...other.notes];

        // Iterate through all possible rotations of `otherNotes`
        for (let i = 0; i < this.notes.length; i++) {
            const dist = otherNotes
                .map((n, i) => Math.min(
                    Math.abs(n - this.notes[i]),
                    Math.abs(12 + n - this.notes[i]),
                ))
                .reduce((a, b) => a + b, 0);
            if (dist < minDist) {
                minDist = dist;
            }
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

// Spot-check assertions on chord distances
[['C', 'F'], ['F', 'D'], ['D', 'G'], ['G', 'C']].map(chords => console.assert(AUG_TRIADS[chords[0]].distance(AUG_TRIADS[chords[1]]) === 3));
[['C', 'D'], ['F', 'G'], ['D', 'C'], ['G', 'F']].map(chords => console.assert(AUG_TRIADS[chords[0]].distance(AUG_TRIADS[chords[1]]) === 6));
console.assert(MAJOR_CHORDS['C'].distance(MINOR_CHORDS['E']), 1);
console.assert(MAJOR_CHORDS['C'].distance(MAJOR_CHORDS['G']), 3);


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
        node.textContent = text;
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

document.addEventListener('DOMContentLoaded', function() {
    const triadContainer = new ChordContainer(
        document.getElementById("triad-container")
    )

    const triadSelection = new ChordSelection(
        document.getElementById("triad-selection")
    );

    // Cardinal boxes
    new ChordBox(triadContainer, 'C augmented', [0, 0.5]);
    new ChordBox(triadContainer, 'F augmented', [1, 0]);
    new ChordBox(triadContainer, 'G augmented', [1, 1]);

    // Triads boxes
    new ChordBox(triadContainer, 'between c and f', [0.5, 0.25])
    new ChordBox(triadContainer, 'between f and g', [1, 0.5])
    new ChordBox(triadContainer, 'between g and c', [0.5, 0.75])
})

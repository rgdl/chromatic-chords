import { ChordLink, VisualElement } from './visualElements.js';
import { assertChordDistanceEquals } from './chords.js';
import { CHORD_BOX_Z_INDEX, NODE_SIZE } from './consts.js';


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
                zIndex: CHORD_BOX_Z_INDEX,
            },
        );
        this.position = position;
        this.validate();
    }

    validate() {
        console.assert(Math.min(...this.position) >= 0);
        console.assert(Math.max(...this.position) <= 1);
    }
}

/**
 * A collection of asymettrical chords (e.g. major triads, dominant sevenths)
 */
export class AsymmetricalChordBox extends ChordBox {
    constructor(container, neighbours, chordCols, chordLinks) {
        console.assert(neighbours.length === 2);
        const position = [0, 1].map(i => (neighbours[0].position[i] + neighbours[1].position[i]) / 2);
        super(container, null, position);
        this.container = container;
        this.neighbours = neighbours;
        this.chordCols = chordCols;
        this.chordLinks = chordLinks;
        this.checkChords();
        this.build();
        this.addClass('asymmetrical-chord-box');
    }

    build() {
        // Build table of chords inside box
        const table = document.createElement('table');
        const tBody = document.createElement('tbody');

        // Keep track of DOM elements corresponding to chords in this box
        const chordLookup = {};

        let i = 0;
        for (;;) {
            const row = document.createElement('tr');
            let chordFound = false;

            for (const col of this.chordCols) {
                if (i < col.length) {
                    const chord = col[i];
                    const td = document.createElement('td');
                    console.assert(!Object.keys(chordLookup).includes(chord.name));
                    chordLookup[chord.name] = td;
                    td.textContent = chord.name;
                    row.appendChild(td);
                    chordFound = true;
                }
            }

            if (!chordFound) {
                break;
            }

            tBody.appendChild(row);
            i++;
        }
        table.appendChild(tBody);
        this.node.appendChild(table);

        // Build links to neighbour cardinal chords
        this.neighbours.map(n => new ChordLink(this.node, n.node, true));

        // Build links between chords within AssymetricalChordBox
        this.chordLinks.map(n => new ChordLink(chordLookup[n[0].name], chordLookup[n[1].name]));
    }

    checkChords() {
        // Correct distances between adjacent chords
        this.chordCols[0].map(chord => assertChordDistanceEquals(this.neighbours[0].chord, chord, 1));
        for (let i = 1; i < this.chordCols.length; i++) {
            // For each chord in a column there must be at least one chord in the next column whose distance is 1
            const colBefore = this.chordCols[i - 1];
            const colAfter = this.chordCols[i];
            for (const chord of colBefore) {
                const minDist = Math.min(...colAfter.map(c => chord.distance(c)));
                console.assert(minDist === 1);
            }
        }
        this.chordCols[this.chordCols.length - 1].map(chord => assertChordDistanceEquals(this.neighbours[1].chord, chord, 1));

        // Correct distances bewteen linked chords
        for (let chords of this.chordLinks) {
            console.assert(chords[0].distance(chords[1]));
        }
    }
}


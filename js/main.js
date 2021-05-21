// TODO: because of CORS issues, need to supply over a local server if I want importable modules. This may become necessary if the file grows too much
// TODO: position with flex box or grid instead?
const CONTAINER_SIZE = 60;
const NODE_SIZE = CONTAINER_SIZE / 6;

class VisualElement {
    constructor(node, style = {}) {
        this.node = node;
        this.applyStyle(style);
    }

    applyStyle(style) {
        Object.keys(style).map(k => this.node.style[k] = style[k]);
    }
}

class ChordContainer extends VisualElement {
    constructor(node) {
        super(
            node,
            {
                width: `${CONTAINER_SIZE}%`, height: `${CONTAINER_SIZE}%`,
                padding: `${CONTAINER_SIZE * NODE_SIZE / 200}%`,
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

    // Cardinal boxes
    new ChordBox(triadContainer, 'C augmented', [0, 0.5]);
    new ChordBox(triadContainer, 'F augmented', [1, 0]);
    new ChordBox(triadContainer, 'G augmented', [1, 1]);

    // Triads boxes
    new ChordBox(triadContainer, 'between c and f', [0.5, 0.25])
    new ChordBox(triadContainer, 'between f and g', [1, 0.5])
    new ChordBox(triadContainer, 'between g and c', [0.5, 0.75])
})

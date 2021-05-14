// TODO: refactor to OOP style once basic functionality is there
// TODO: because of CORS issues, need to supply over a local server if I want importable modules. This may become necessary if the file grows too much
// TODO: position with flex box or grid instead?
const CONTAINER_SIZE = 60;
const NODE_SIZE = CONTAINER_SIZE / 6;

function applyStyleToNode(node, style) {
    Object.keys(style).map(k => node.style[k] = style[k]);
}

document.addEventListener('DOMContentLoaded', function() {
    const triadContainer = document.getElementById("triad-container")

    function setUpTriadContainer() {
        applyStyleToNode(
            triadContainer,
            {
                width: `${CONTAINER_SIZE}%`,
                height: `${CONTAINER_SIZE}%`,
                padding: `${CONTAINER_SIZE * NODE_SIZE / 200}%`,
            },
        );

        // Un-hide once properties are set
        triadContainer.style.display = 'block';
    }

    function cardinalChordBox(name, position) {
        console.assert(Math.min(...position) >= 0)
        console.assert(Math.max(...position) <= 1)
        let node = document.createElement('div');
        node.textContent = name;
        node.className = 'cardinal-box';
        applyStyleToNode(
            node,
            {
                width: `${NODE_SIZE}%`,
                height: `${NODE_SIZE}%`,
                left: `${position[1] * 100 - NODE_SIZE / 2}%`,
                top: `${position[0] * 100 - NODE_SIZE / 2}%`,
            },
        );
        triadContainer.appendChild(node);
    }

    cardinalChordBox('C augmented', [0, 0.5]);
    cardinalChordBox('F augmented', [1, 0]);
    cardinalChordBox('G augmented', [1, 1]);
    setUpTriadContainer();
})

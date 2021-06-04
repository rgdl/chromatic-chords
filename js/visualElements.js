import { CHORD_BOX_Z_INDEX, CONTAINER_SIZE, NODE_SIZE } from './consts.js';

export class VisualElement {
    constructor(node, style = {}) {
        this.node = node;
        this.applyStyle(style);
    }

    applyStyle(style) {
        Object.keys(style).map(k => this.node.style[k] = style[k]);
    }

    addClass(className) {
        const cn = this.node.className;
        this.node.className = cn ? `${cn} ${className}` : `${className}`;
    }
}

export class ChordLink extends VisualElement {
    constructor(neighbourA, neighbourB, behindBoxes = false) {
        const node = document.createElement('div');
        node.className = 'chord-link';
        document.body.appendChild(node);
        super(node, { zIndex: CHORD_BOX_Z_INDEX + (behindBoxes ? -1 : 1)});
        this.neighbours = [neighbourA, neighbourB];
        this.setPosition();

        window.addEventListener('resize', () => this.setPosition());
    }

    setPosition() {
        const neighbourRects = this.neighbours.map(n => n.getBoundingClientRect());
        const neighbourMidpoints = neighbourRects.map(n => [n.left + n.width / 2, n.top + n.height / 2]);

        const xDiff = neighbourMidpoints[1][0] - neighbourMidpoints[0][0];
        const yDiff = neighbourMidpoints[1][1] - neighbourMidpoints[0][1];

        const theta = 180 * Math.atan(yDiff / xDiff) / Math.PI;
        const r = Math.sqrt(xDiff ** 2 + yDiff ** 2);

        const left = (neighbourMidpoints[0][0] + neighbourMidpoints[1][0] - r) / 2;
        const top = (neighbourMidpoints[0][1] + neighbourMidpoints[1][1]) / 2;

        this.applyStyle({
            transform: `rotate(${theta}deg)`,
            width: `${r}px`,
            left: `${left}px`,
            top: `${top}px`,
        });
    }
}

// TODO: uncomment when ready to use
//class ChordSelection extends VisualElement {
//    constructor(node) {
//        super(node);
//    }
//}

// TODO: when avoidable, don't set style in here. Use LESS CSS to define these constants
export class ChordContainer extends VisualElement {
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


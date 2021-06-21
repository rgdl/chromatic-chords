import { NODE_SIZE } from './consts.js';

export function sizeAndPositionFromAngle(theta) {
    const results = {
        width: NODE_SIZE + '%',
        height: NODE_SIZE + '%',
        left: (0 + Math.cos(theta) * 50 - NODE_SIZE / 2) + '%',
        top: (0 + Math.sin(theta) * 50 - NODE_SIZE / 2) + '%',
    };
    return results;
}


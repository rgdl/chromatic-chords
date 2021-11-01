export const NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const CIRCLE_OF_FIFTHS_ORDER = [6, 1, 8, 3, 10, 5, 0, 7, 2, 9, 4, 11];
export const CIRCLE_OF_FIFTHS_ORDER_NOTE_NAMES = CIRCLE_OF_FIFTHS_ORDER.map(
    i => NOTE_NAMES[i]
);

export const CONTAINER_SIZE = 60;
export const NODE_SIZE = CONTAINER_SIZE / 3;
export const CHORD_BOX_Z_INDEX= 1;


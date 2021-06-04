/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/chordBox.js":
/*!************************!*\
  !*** ./js/chordBox.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CardinalChordBox\": () => (/* binding */ CardinalChordBox),\n/* harmony export */   \"AsymmetricalChordBox\": () => (/* binding */ AsymmetricalChordBox)\n/* harmony export */ });\n/* harmony import */ var _visualElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visualElements.js */ \"./js/visualElements.js\");\n/* harmony import */ var _chords_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chords.js */ \"./js/chords.js\");\n/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./consts.js */ \"./js/consts.js\");\n\n\n\n\n\nclass ChordBox extends _visualElements_js__WEBPACK_IMPORTED_MODULE_0__.VisualElement {\n    constructor(container, text, position) {\n        const node = document.createElement('div');\n        if (text) {\n            node.textContent = text;\n        }\n        node.className = 'chord-box';\n        container.appendChild(node);\n        super(\n            node,\n            {\n                width: `${_consts_js__WEBPACK_IMPORTED_MODULE_2__.NODE_SIZE}%`, left: `${position[1] * 100 - _consts_js__WEBPACK_IMPORTED_MODULE_2__.NODE_SIZE / 2}%`,\n                height: `${_consts_js__WEBPACK_IMPORTED_MODULE_2__.NODE_SIZE}%`, top: `${position[0] * 100 - _consts_js__WEBPACK_IMPORTED_MODULE_2__.NODE_SIZE / 2}%`,\n                zIndex: _consts_js__WEBPACK_IMPORTED_MODULE_2__.CHORD_BOX_Z_INDEX,\n            },\n        );\n        this.position = position;\n        this.validate();\n    }\n\n    validate() {\n        console.assert(Math.min(...this.position) >= 0);\n        console.assert(Math.max(...this.position) <= 1);\n    }\n}\n\n/**\n * A symmetrical chord (augmented triad or diminished seventh)\n */\nclass CardinalChordBox extends ChordBox {\n    constructor(container, text, chord, position) {\n        super(container, text, position);\n        this.chord = chord;\n    }\n}\n\n/**\n * A collection of asymettrical chords (e.g. major triads, dominant sevenths)\n */\nclass AsymmetricalChordBox extends ChordBox {\n    constructor(container, neighbours, chordCols, chordLinks) {\n        console.assert(neighbours.length === 2);\n        const position = [0, 1].map(i => (neighbours[0].position[i] + neighbours[1].position[i]) / 2);\n        super(container, null, position);\n        this.container = container;\n        this.neighbours = neighbours;\n        this.chordCols = chordCols;\n        this.chordLinks = chordLinks;\n        this.checkChords();\n        this.build();\n        this.addClass('asymmetrical-chord-box');\n    }\n\n    build() {\n        // Build table of chords inside box\n        const table = document.createElement('table');\n        const tBody = document.createElement('tbody');\n\n        // Keep track of DOM elements corresponding to chords in this box\n        const chordLookup = {};\n\n        let i = 0;\n        for (;;) {\n            const row = document.createElement('tr');\n            let chordFound = false;\n\n            for (const col of this.chordCols) {\n                if (i < col.length) {\n                    const chord = col[i];\n                    const td = document.createElement('td');\n                    console.assert(!Object.keys(chordLookup).includes(chord.name));\n                    chordLookup[chord.name] = td;\n                    td.textContent = chord.name;\n                    row.appendChild(td);\n                    chordFound = true;\n                }\n            }\n\n            if (!chordFound) {\n                break;\n            }\n\n            tBody.appendChild(row);\n            i++;\n        }\n        table.appendChild(tBody);\n        this.node.appendChild(table);\n\n        // Build links to neighbour cardinal chords\n        this.neighbours.map(n => new _visualElements_js__WEBPACK_IMPORTED_MODULE_0__.ChordLink(this.node, n.node, true));\n\n        // Build links between chords within AssymetricalChordBox\n        this.chordLinks.map(n => new _visualElements_js__WEBPACK_IMPORTED_MODULE_0__.ChordLink(chordLookup[n[0].name], chordLookup[n[1].name]));\n    }\n\n    checkChords() {\n        // Correct distances between adjacent chords\n        this.chordCols[0].map(chord => (0,_chords_js__WEBPACK_IMPORTED_MODULE_1__.assertChordDistanceEquals)(this.neighbours[0].chord, chord, 1));\n        for (let i = 1; i < this.chordCols.length; i++) {\n            // For each chord in a column there must be at least one chord in the next column whose distance is 1\n            const colBefore = this.chordCols[i - 1];\n            const colAfter = this.chordCols[i];\n            for (const chord of colBefore) {\n                const minDist = Math.min(...colAfter.map(c => chord.distance(c)));\n                console.assert(minDist === 1);\n            }\n        }\n        this.chordCols[this.chordCols.length - 1].map(chord => (0,_chords_js__WEBPACK_IMPORTED_MODULE_1__.assertChordDistanceEquals)(this.neighbours[1].chord, chord, 1));\n\n        // Correct distances bewteen linked chords\n        for (let chords of this.chordLinks) {\n            console.assert(chords[0].distance(chords[1]));\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://chromatic-chords/./js/chordBox.js?");

/***/ }),

/***/ "./js/chords.js":
/*!**********************!*\
  !*** ./js/chords.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AUG_TRIADS\": () => (/* binding */ AUG_TRIADS),\n/* harmony export */   \"MAJOR_CHORDS\": () => (/* binding */ MAJOR_CHORDS),\n/* harmony export */   \"MINOR_CHORDS\": () => (/* binding */ MINOR_CHORDS),\n/* harmony export */   \"assertChordDistanceEquals\": () => (/* binding */ assertChordDistanceEquals)\n/* harmony export */ });\nconst NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];\n\nclass Chord {\n    constructor(name, notes) {\n        this.name = name;\n        this.notes = notes;\n        this.verify();\n    }\n\n    verify() {\n        this.notes.map((note, i) => {\n            console.assert(note >= 0);\n            console.assert(note < 12);\n            i > 0 && console.assert(note > this.notes[i - 1]);\n        });\n    }\n\n    distance(other, verbose = false) {\n        console.assert(this.notes.length === other.notes.length);\n        let minDist = Infinity;\n        const otherNotes = [...other.notes];\n\n        // Iterate through all possible rotations of `otherNotes`\n        for (let i = 0; i < this.notes.length; i++) {\n            verbose && console.log(otherNotes, this.notes);\n            const dist = otherNotes\n                .map((n, i) => {\n                    const noteDistances = [Math.abs(12 + n - this.notes[i]) % 12, Math.abs(12 + this.notes[i] - n) % 12];\n                    verbose && console.log(noteDistances);\n                    return Math.min(...noteDistances);\n                })\n                .reduce((a, b) => a + b, 0);\n            if (dist < minDist) {\n                minDist = dist;\n            }\n            verbose && console.log(dist);\n            otherNotes.unshift(otherNotes.pop());\n        }\n        return minDist;\n    }\n}\n\nconst AUG_TRIADS = Object.fromEntries(['C', 'F', 'D', 'G'].map(\n    (root, i) => [root, new Chord(`${root} Augmented`, [i, 4 + i, 8 + i])]\n));\n\nconst MAJOR_CHORDS = Object.fromEntries(NOTE_NAMES.map(\n    (root, i) => [root, new Chord(`${root} Major`, [i, 4 + i, 7 + i].map(n => n % 12).sort((a, b) => a - b))]\n));\n\nconst MINOR_CHORDS = Object.fromEntries(NOTE_NAMES.map(\n    (root, i) => [root, new Chord(`${root} Minor`, [i, 3 + i, 7 + i].map(n => n % 12).sort((a, b) => a - b))]\n));\n\nfunction assertChordDistanceEquals(chordA, chordB, expectedDistance) {\n    const actualDistance = chordA.distance(chordB);\n    if (actualDistance !== expectedDistance) {\n        chordA.distance(chordB);\n        throw new Error(`Distance from ${chordA.name} to ${chordB.name} is ${actualDistance}, but the expected distance is ${expectedDistance}`);\n    }\n}\n\n// Spot-check assertions on chord distances\n[['C', 'F'], ['F', 'D'], ['D', 'G'], ['G', 'C']].map(chords => assertChordDistanceEquals(AUG_TRIADS[chords[0]], AUG_TRIADS[chords[1]], 3));\n[['C', 'D'], ['F', 'G'], ['D', 'C'], ['G', 'F']].map(chords => assertChordDistanceEquals(AUG_TRIADS[chords[0]], AUG_TRIADS[chords[1]], 6));\nassertChordDistanceEquals(MAJOR_CHORDS['C'], MINOR_CHORDS['E'], 1);\nassertChordDistanceEquals(MAJOR_CHORDS['C'], MAJOR_CHORDS['G'], 3);\nassertChordDistanceEquals(MAJOR_CHORDS['E'], AUG_TRIADS['C'], 1);\nassertChordDistanceEquals(AUG_TRIADS['C'], MAJOR_CHORDS['E'], 1);\n\n\n//# sourceURL=webpack://chromatic-chords/./js/chords.js?");

/***/ }),

/***/ "./js/consts.js":
/*!**********************!*\
  !*** ./js/consts.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CONTAINER_SIZE\": () => (/* binding */ CONTAINER_SIZE),\n/* harmony export */   \"NODE_SIZE\": () => (/* binding */ NODE_SIZE),\n/* harmony export */   \"CHORD_BOX_Z_INDEX\": () => (/* binding */ CHORD_BOX_Z_INDEX)\n/* harmony export */ });\nconst CONTAINER_SIZE = 60;\nconst NODE_SIZE = CONTAINER_SIZE / 3;\nconst CHORD_BOX_Z_INDEX= 1;\n\n\n\n//# sourceURL=webpack://chromatic-chords/./js/consts.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chords_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chords.js */ \"./js/chords.js\");\n/* harmony import */ var _visualElements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visualElements.js */ \"./js/visualElements.js\");\n/* harmony import */ var _chordBox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chordBox.js */ \"./js/chordBox.js\");\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', function() {\n    const triadContainer = new _visualElements_js__WEBPACK_IMPORTED_MODULE_1__.ChordContainer(\n        document.getElementById(\"triad-container\")\n    );\n\n    // TODO: uncomment once it does something\n    //const triadSelection = new ChordSelection(\n    //    document.getElementById(\"triad-selection\")\n    //);\n\n    // Cardinal boxes\n    const cardinalBoxPositions = [[0, 0.5], [0.5, 0], [1, 0.5], [0.5, 1]];\n    const triadCardinalBoxes = Object.fromEntries(\n        ['C', 'F', 'D', 'G'].map((n, i) => [\n            n, new _chordBox_js__WEBPACK_IMPORTED_MODULE_2__.CardinalChordBox(triadContainer, `${n} augmented`, _chords_js__WEBPACK_IMPORTED_MODULE_0__.AUG_TRIADS[n], cardinalBoxPositions[i])\n        ])\n    );\n\n    // Triads boxes\n    new _chordBox_js__WEBPACK_IMPORTED_MODULE_2__.AsymmetricalChordBox(\n        triadContainer,\n        [triadCardinalBoxes['C'], triadCardinalBoxes['G']],\n        [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS].map(chord =>\n            ['C', 'E', 'Ab'].map(n => chord[n])\n        ),\n        [\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.C, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.C],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.C, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.E],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.E, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.E],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.E, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Ab],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Ab, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Ab],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Ab, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.C],\n        ],\n    );\n\n    new _chordBox_js__WEBPACK_IMPORTED_MODULE_2__.AsymmetricalChordBox(\n        triadContainer,\n        [triadCardinalBoxes['D'], triadCardinalBoxes['G']],\n        [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS].map(chord =>\n            ['G', 'B', 'Eb'].map(n => chord[n])\n        ),\n        [\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.G, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.G],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.G, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.B],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.B, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.B],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.B, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Eb],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Eb, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Eb],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Eb, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.G],\n        ],\n    );\n\n    new _chordBox_js__WEBPACK_IMPORTED_MODULE_2__.AsymmetricalChordBox(\n        triadContainer,\n        [triadCardinalBoxes['F'], triadCardinalBoxes['D']],\n        [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS].map(chord =>\n            ['D', 'Gb', 'Bb'].map(n => chord[n])\n        ),\n        [\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.D, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.D],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.D, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Gb],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Gb, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Gb],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Gb, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Bb],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Bb, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Bb],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Bb, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.D],\n        ],\n    );\n\n    new _chordBox_js__WEBPACK_IMPORTED_MODULE_2__.AsymmetricalChordBox(\n        triadContainer,\n        [triadCardinalBoxes['F'], triadCardinalBoxes['C']],\n        [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS].map(chord =>\n            ['F', 'A', 'Db'].map(n => chord[n])\n        ),\n        [\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.F, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.F],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.F, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.A],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.A, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.A],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.A, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Db],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Db, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.Db],\n            [_chords_js__WEBPACK_IMPORTED_MODULE_0__.MAJOR_CHORDS.Db, _chords_js__WEBPACK_IMPORTED_MODULE_0__.MINOR_CHORDS.F],\n        ],\n    );\n\n});\n\n\n//# sourceURL=webpack://chromatic-chords/./js/main.js?");

/***/ }),

/***/ "./js/visualElements.js":
/*!******************************!*\
  !*** ./js/visualElements.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"VisualElement\": () => (/* binding */ VisualElement),\n/* harmony export */   \"ChordLink\": () => (/* binding */ ChordLink),\n/* harmony export */   \"ChordContainer\": () => (/* binding */ ChordContainer)\n/* harmony export */ });\n/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts.js */ \"./js/consts.js\");\n\n\nclass VisualElement {\n    constructor(node, style = {}) {\n        this.node = node;\n        this.applyStyle(style);\n    }\n\n    applyStyle(style) {\n        Object.keys(style).map(k => this.node.style[k] = style[k]);\n    }\n\n    addClass(className) {\n        const cn = this.node.className;\n        this.node.className = cn ? `${cn} ${className}` : `${className}`;\n    }\n}\n\nclass ChordLink extends VisualElement {\n    constructor(neighbourA, neighbourB, behindBoxes = false) {\n        const node = document.createElement('div');\n        node.className = 'chord-link';\n        document.body.appendChild(node);\n        super(node, { zIndex: _consts_js__WEBPACK_IMPORTED_MODULE_0__.CHORD_BOX_Z_INDEX + (behindBoxes ? -1 : 1)});\n        this.neighbours = [neighbourA, neighbourB];\n        this.setPosition();\n\n        window.addEventListener('resize', () => this.setPosition());\n    }\n\n    setPosition() {\n        const neighbourRects = this.neighbours.map(n => n.getBoundingClientRect());\n        const neighbourMidpoints = neighbourRects.map(n => [n.left + n.width / 2, n.top + n.height / 2]);\n\n        const xDiff = neighbourMidpoints[1][0] - neighbourMidpoints[0][0];\n        const yDiff = neighbourMidpoints[1][1] - neighbourMidpoints[0][1];\n\n        const theta = 180 * Math.atan(yDiff / xDiff) / Math.PI;\n        const r = Math.sqrt(xDiff ** 2 + yDiff ** 2);\n\n        const left = (neighbourMidpoints[0][0] + neighbourMidpoints[1][0] - r) / 2;\n        const top = (neighbourMidpoints[0][1] + neighbourMidpoints[1][1]) / 2;\n\n        this.applyStyle({\n            transform: `rotate(${theta}deg)`,\n            width: `${r}px`,\n            left: `${left}px`,\n            top: `${top}px`,\n        });\n    }\n}\n\n// TODO: uncomment when ready to use\n//class ChordSelection extends VisualElement {\n//    constructor(node) {\n//        super(node);\n//    }\n//}\n\n// TODO: when avoidable, don't set style in here. Use LESS CSS to define these constants\nclass ChordContainer extends VisualElement {\n    constructor(node) {\n        super(\n            node,\n            {\n                width: `${_consts_js__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_SIZE}%`, height: `${_consts_js__WEBPACK_IMPORTED_MODULE_0__.CONTAINER_SIZE}%`,\n                marginTop: `${_consts_js__WEBPACK_IMPORTED_MODULE_0__.NODE_SIZE / 2}%`,  marginBottom: `${_consts_js__WEBPACK_IMPORTED_MODULE_0__.NODE_SIZE / 2}%`,\n            },\n        );\n\n        // Un-hide once properties are set\n        this.node.style.display = 'block';\n    }\n\n    appendChild(node) {\n        this.node.appendChild(node);\n    }\n}\n\n\n\n//# sourceURL=webpack://chromatic-chords/./js/visualElements.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;
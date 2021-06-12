import React from 'react';

/*
 * Base class for all objects shown in the DOM. 
 * Try moving from inheritance to composition
 *
 * TODO: is this class redundant when everything is in react?
 */

export default class VisualElement extends React.Component {
    state = {
        style: {},
    };

    render() {
        return <p>no</p>;
    }
}

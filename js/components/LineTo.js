import React from 'react';
import LineToOriginal from 'react-lineto';

// Wrapper class around LineTo from react-lineto
// There's a weird bug with LineTo where it's only visible on the second render
// Also, it doesn't update when the screen is resized

export default class LineTo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rendered: false, resizeCount: 0 };
    }

    componentDidMount() {
        // Workaround for invisibility on first render
        this.state.rendered || this.setState({ rendered: true });
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    // Workaround for ignoring screen resize
    handleResize = () => this.forceUpdate();

    render() {
        return (<LineToOriginal {...this.props} />);
    }
}


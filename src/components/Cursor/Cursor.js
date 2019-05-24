import React from 'react';
import './Cursor.imports.scss'

class Cursor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'x': 0, 'y': 0, 'clicked': false};

        this.counter = 0;
        this.xPredTempAvg = 0;
        this.yPredTempAvg = 0;

        this.handleGaze = this.handleGaze.bind(this);
        this.setupWebpack = this.setupWebpack.bind(this);
    }

    handleGaze(data, elapsedTime) {
        if (data == null) {
            return;
        }

        this.xPredTempAvg += data.x;
        this.yPredTempAvg += data.y;
        this.counter += 1;

        if (this.counter === 15) {
            this.xPredTempAvg = this.xPredTempAvg / 15;
            this.yPredTempAvg = this.yPredTempAvg / 15;
            this.counter = 0;
            if (window.cursorListener) {
                window.cursorListener(this.xPredTempAvg, this.yPredTempAvg);
            }
            this.setState({
                x: this.xPredTempAvg,
                y: this.yPredTempAvg
            });
            this.xPredTempAvg = 0;
            this.yPredTempAvg = 0;
        }
    }

    componentDidMount() {
        // Setup web gazer
        const script = document.createElement("script");

        script.src = "/webgazer.js";
        script.async = false;

        document.body.appendChild(script);

        setTimeout(() => {
            this.webgazer = window.webgazer;
            this.webgazer.begin();
            this.setupWebpack(this.webgazer);
        }, 2000);

        window.cursorClickListener = () => {
            console.log("Click listener activated");
            this.setState({'clicked': true});
            setTimeout(
                () => {this.setState({'clicked': false})},
                800
            );
        }
    }

    componentWillUnmount() {
        if (this.webgazer) {
            console.log('Webgazer closed!');
            this.webgazer.end();
        }
    }

    setupWebpack(webgazer) {
        // Setup webpack configuration
        console.log("Setting up webgazer");

        webgazer.setRegression('ridge').setTracker('clmtrackr').begin().showPredictionPoints(true);
        this.webgazer.setGazeListener(this.handleGaze);
        console.log("Set webgaze listener");
    }

    render() {
        let style = {
            'height': '50px',
            'width': '50px',
            'position': 'fixed',
            'borderRadius': '50%',
            'border': '5px solid ' + (this.state.clicked ? '#b042f4' : '#42f477'),
            'top': this.state.y - 25,
            'left': this.state.x - 25,
            'zIndex': '999',
            'transition': 'top 100ms ease-in-out, left 100ms ease-in-out, border 300ms ease-out'
        };
        return <div style={style}/>;
    }
}

export default Cursor;
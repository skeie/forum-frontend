import React from 'react';
import { Font } from 'expo';
import App from './src/';

export default class Intro extends React.Component {
    componentDidMount() {
        Font.loadAsync({
            poppins: require('./assets/Poppins-Regular.ttf'),
            bold: require('./assets/Poppins-SemiBold.ttf'),
            italic: require('./assets/Poppins-LightItalic.ttf'),
        });
    }

    componentDidCatch(error, info) {
        console.log('ERROR!', error, info);
    }

    render() {
        return <App />;
    }
}

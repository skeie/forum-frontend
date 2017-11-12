import React from 'react';
import { Font } from 'expo';
import Loading from './src/common/Loading';
import App from './src/';

export default class Intro extends React.Component {
    state = {
        isReady: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            poppins: require('./assets/Poppins-Regular.ttf'),
            italic: require('./assets/Poppins-LightItalic.ttf'),
        });
        this.setState({
            isReady: true,
        });
    }

    componentDidCatch(error, info) {
        console.log('ERROR!', error, info);
    }

    render() {
        if (!this.state.isReady) {
            return <Loading />;
        }
        return <App />;
    }
}

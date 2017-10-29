import React from 'react';
import { Font } from 'expo';
import { ActivityIndicator, View } from 'react-native';
import App from './src/';

export default class Intro extends React.Component {
    state = {
        isReady: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            poppins: require('./assets/Poppins-Regular.ttf'),
            bold: require('./assets/Poppins-SemiBold.ttf'),
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
            return (
                <View flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator />
                </View>
            );
        }
        return <App />;
    }
}

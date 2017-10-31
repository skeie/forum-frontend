import { Constants } from 'expo';
import { Analytics, Hits as GAHits } from 'react-native-google-analytics';

class MockAnalytics {
    constructor() {}

    openApp = () => {};

    sendEvent = () => {};
}

class AppAnalytics {
    constructor() {
        this.init();
    }

    init = async () => {
        console.log('hit?');
        const userAgent = await Constants.getWebViewUserAgentAsync();
        console.log('sapdap', userAgent);
        const clientId = Expo.Constants.deviceId;
        this.analytics = new Analytics(
            'UA-108379879-1',
            clientId,
            1,
            userAgent,
        );
        this.AppOpen();
    };

    AppOpen = () => {
        const screenView = new GAHits.ScreenView('VGD');
        this.analytics.send(screenView);
    };

    sendEvent = (event: string) => {
        const gEvent = new GAHits.Event(event);
        this.analytics.send(gEvent);
    };
}

export default (__DEV__ ? MockAnalytics : AppAnalytics);

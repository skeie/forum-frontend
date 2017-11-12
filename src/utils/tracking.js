import { Constants } from 'expo';
import { postExt } from '../fetch/fetch';
const GOOGLE_ANALYTICS_ROOT_URL = 'https://www.google-analytics.com/collect';

class MockAnalytics {
    constructor() {}
    sendGoogleAnalytics = () => {};
}

class AppAnalytics {
    analytics = {};

    constructor() {}
    sendGoogleAnalytics = (screenName: string) => {
        postExt(
            `${GOOGLE_ANALYTICS_ROOT_URL}?v=1&t=pageview&tid=UA-108379879-1&cid=${Expo
                .Constants.deviceId}&dp=${screenName}`,
        );
    };
}

export default (__DEV__ ? MockAnalytics : AppAnalytics);

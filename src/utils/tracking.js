import Expo from 'expo';
const GOOGLE_ANALYTICS_ROOT_URL = 'analytics.google.com'
export const sendGoogleAnalytics = (page, data1, data2) => {
  const options = {
    method: 'POST',
    headers: {
      'User-Agent': 'SuggestionBox',
    },
  };

  const uri = `${GOOGLE_ANALYTICS_ROOT_URL}${Expo.Constants.deviceId}&cd=${page}&cd1=${data1}&cd2=${data2}`;
  const googleURL = encodeURI(uri);
  fetch(googleURL, options)
    .catch(error => console.log('Error in sendGoogleAnalytics(): ', error));
}

// v=1&t=pageview&tid=UA-108379879-1&cid=555&dh=mydemo.com&dp=%2Fhome&dt=homepage

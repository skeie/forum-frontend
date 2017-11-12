/**
 * @flow
 */

import { AsyncStorage } from 'react-native';

export async function setItem(key: string, value: any) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // eslint-disable-next-line no-undef
        if (__DEV__) {
            console.error(`Error storing ${key} in async storage`, error);
        }

        throw error;
    }

    return value;
}

export async function getItem(key: string) {
    try {
        return JSON.parse(await AsyncStorage.getItem(key));
    } catch (error) {
        // eslint-disable-next-line no-undef
        if (__DEV__) {
            console.error(`Error fetching ${key} from async storage`, error);
        }

        throw error;
    }
}

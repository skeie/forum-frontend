import { Platform } from 'react-native';

export const getShadowStyle = ({
    shadowColor,
    shadowOpacity,
    shadowRadius,
    height,
    width,
    elevation = width,
}) =>
    Platform.select({
        ios: {
            shadowColor,
            shadowOpacity,
            shadowRadius,
            shadowOffset: {
                height,
                width,
            },
        },
        android: {
            elevation,
        },
    });

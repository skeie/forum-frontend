// @flow
import React from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, theme } from '../common';
import type { State as ArrowState, Way } from './arrow';

type Props = ArrowState & {
    onPress: () => void,
    way: Way,
};

export default function Arrow({
    loaded,
    clickable,
    way,
    number,
    onPress,
}: Props) {
    if (!loaded) {
        return <ActivityIndicator color="white" />;
    }

    if (!clickable) {
        return null;
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {way !== 'left' && <Text>{number}</Text>}
                <MaterialIcons
                    name={`keyboard-arrow-${way}`}
                    size={32}
                    color="white"
                />
                {way === 'left' && <Text>{number}</Text>}
            </View>
        </TouchableOpacity>
    );
}

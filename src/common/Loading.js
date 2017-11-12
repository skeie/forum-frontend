import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { theme } from './';

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator color={theme.primary} size="large" />
        </View>
    );
};

export default Loading;

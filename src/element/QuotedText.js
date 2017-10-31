//@flow
import React from 'react';
import { View } from 'react-native';
import { Text, theme } from '../common';

function QuotedText({ text }: { text: string }) {
    console.log(text, 'sapdap text');
    return (
        <View
            style={{
                backgroundColor: theme.primary,
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
            }}>
            <Text style={{ color: 'white', fontSize: 14 }} type="date">
                {text}
            </Text>
        </View>
    );
}

export default QuotedText;

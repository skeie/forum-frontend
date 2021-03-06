import React from 'react';
import { View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Text } from '../common';

const Post = ({ content }) => {
    return (
        <View style={{ width: '100%' }}>
            {content.map((content, index) => (
                <Hyperlink
                    linkDefault
                    key={`${content}-${index}`}
                    linkStyle={{ color: '#C0DEEF' }}>
                    <Text
                        style={{
                            marginTop: index > 0 ? 10 : 0,
                            color: '#B6B9BB',
                        }}>
                        {content}
                    </Text>
                </Hyperlink>
            ))}
        </View>
    );
};

export default Post;

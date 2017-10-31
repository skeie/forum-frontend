import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from '../common';
class Post extends Component {
    render() {
        return (
            <View style={{ width: '100%' }}>
                {this.props.content.map((content, index) => (
                    <Text
                        key={`${content}-${index}`}
                        style={{
                            marginTop: index > 0 ? 10 : 0,
                            color: '#B6B9BB',
                        }}>
                        {content}
                    </Text>
                ))}
            </View>
        );
    }
}

export default Post;

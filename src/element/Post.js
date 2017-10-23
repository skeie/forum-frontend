import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from '../common';
class Post extends Component {
    render() {
        const split = this.props.content
            .split(/(\r\n|\n|\r)/gm)
            .filter(content => content !== '\n')
            .map(content => content.trim());
        return (
            <View style={{ width: '100%' }}>
                {split.map((content, index) => (
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

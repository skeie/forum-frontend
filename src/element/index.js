import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Post from './Post';
import { ProfileImage, Username, Date } from './Profile';
import { Text } from '../common';
import { getShadowStyle } from '../utils/platform';
import QuotedText from './QuotedText';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 5,
        flexDirection: 'row',
        ...getShadowStyle({
            shadowOpacity: 0.1,
            shadowRadius: 2,
            height: 4,
            width: -4,
        }),
    },
    dateAndUserNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    flex: {
        flex: 1,
        marginRight: 10,
    },
});

class Element extends Component {
    render() {
        const { item } = this.props;
        const { item: { user: { userImage, username } } } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View style={styles.dateAndUserNameContainer}>
                        <ProfileImage userImage={userImage} />
                        <Date date={item.date} />
                    </View>
                    <Username username={username} />
                    {item.quoteText && <QuotedText text={item.quoteText} />}
                    {item.content && <Post content={item.content} />}
                </View>
            </View>
        );
    }
}

export default Element;

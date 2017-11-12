// @flow

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from '../common';

export const Username = ({ username }: { username: string }) => (
    <Text
        style={{
            color: '#55555C',
            marginTop: 20,
            fontSize: 20,
        }}>
        {username}
    </Text>
);

export const ProfileImage = ({ userImage }: { userImage: string }) => (
    <Image
        source={{ uri: userImage }}
        style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            marginRight: 10,
        }}
    />
);

export const Date = ({ date }: { date: string }) => (
    <Text type="date" numberOfLines={1}>
        {date}
    </Text>
);

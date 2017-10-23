import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, theme } from '../common';
import PropTypes from 'prop-types';
import { getExt } from '../fetch/fetch';
import { setItem } from '../utils/asyncStorage';
import { currentPageNumber } from '../utils/constants';

type Props = {
    fetch: number => void,
    way: 'left' | 'right',
};

class Arrow extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: props.way === 'left' ? true : false,
            clickable: props.way === 'left' ? true : false,
        };
    }

    props: Props;

    onPress = () => {
        let newPageNumber = this.props.number;
        if (this.props.way === 'left') {
            newPageNumber = --newPageNumber;
        }
        this.props.fetch(newPageNumber);
    };

    componentWillReceiveProps({ way, number }) {
        if (number !== this.props.number) {
            this.checkNextPage(way, number);
        }
    }

    async checkNextPage(way, number) {
        if (way === 'right') {
            try {
                await getExt(
                    `https://www.vgd.no/sport/fotball-internasjonal/tema/1580279/tittel/real-madrid-cf-klubbtraad/side/${number}`,
                );
                this.setState({
                    loaded: true,
                    clickable: true,
                });
            } catch (error) {
                console.log('error if you can go to next page', error);
                this.setState({
                    loaded: true,
                    clickable: false,
                });
            }
        }
    }

    componentDidMount() {
        this.checkNextPage(this.props.way, this.props.number);
    }

    render() {
        if (!this.state.loaded) {
            return <ActivityIndicator />;
        }

        if (!this.state.clickable) {
            return null;
        }

        console.log('number i arrow', this.props.number);

        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this.props.way !== 'left' && (
                        <Text>{this.props.number}</Text>
                    )}
                    <MaterialIcons
                        name={`keyboard-arrow-${this.props.way}`}
                        size={32}
                        color="white"
                    />
                    {this.props.way === 'left' && (
                        <Text>{this.props.number}</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}

export default Arrow;

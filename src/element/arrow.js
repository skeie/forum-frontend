// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getExt } from '../fetch/fetch';
import { setItem } from '../utils/asyncStorage';
import { currentPageNumber } from '../utils/constants';
import ArrowUI from './arrowUI';

export type Way = 'left' | 'right';

type Props = {
    fetch: ({ pageid: number, shouldScrollToTop?: boolean }) => Promise<void>,
    way: Way,
    number: number,
};

export type State = {
    loaded: boolean,
    clickable: boolean,
};

class Arrow extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loaded: props.way === 'left' ? true : false,
            clickable: props.way === 'left' ? true : false,
        };
    }

    props: Props;

    onPress = () => {
        this.props.fetch({
            pageid: this.props.number,
            shouldScrollToTop: true,
        });
    };

    componentWillReceiveProps({ way, number }: Props) {
        if (number !== this.props.number) {
            this.checkNextPage(way, number);
        }
    }

    async checkNextPage(way: Way, number: number) {
        if (way === 'right') {
            console.log(getExt, 'sapdap');
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
        return (
            <ArrowUI
                way={this.props.way}
                loaded={this.state.loaded}
                clickable={this.state.clickable}
                number={this.props.number}
                onPress={this.onPress}
            />
        );
    }
}

export default Arrow;

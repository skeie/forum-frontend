import React, { Component } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    style: { color: 'white', fontFamily: 'poppins' },
    header: { color: 'black', fontSize: 32, fontFamily: 'bold' },
    date: { color: '#DCDDE3', fontFamily: 'italic' },
});

class Text extends Component {
    render() {
        const { style = {}, type = null } = this.props;
        return (
            <RNText
                {...this.props}
                style={[styles.style, type && styles[type], style]}>
                {this.props.children}
            </RNText>
        );
    }
}

export default Text;

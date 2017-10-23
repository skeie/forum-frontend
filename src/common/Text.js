import React, { Component } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    style: { color: 'white' },
});

class Text extends Component {
    render() {
        const { style = {} } = this.props;
        return (
            <RNText {...this.props} style={[styles.style, style]}>
                {this.props.children}
            </RNText>
        );
    }
}

export default Text;

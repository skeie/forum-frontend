import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    ActivityIndicator,
} from 'react-native';
import { get } from './fetch/fetch';
import Post from './element/Post';
import Profile from './element/Profile';
import Element from './element';
import posts from './testData/posts';
import { Text, theme } from './common';
import Arrow from './element/arrow';
import { getItem, setItem } from './utils/asyncStorage';
import { currentPageNumber } from './utils/constants';

export default class App extends React.Component {
    state = {
        posts: null,
        loading: false,
    };

    pageid = -1;
    ref = null;

    componentDidMount() {
        this.getCurrentPage();
    }

    getPageNumberFromAsync = async () => {
        let currentNumber = 4637;
        try {
            currentNumber = (await getItem(currentPageNumber)) || currentNumber;
        } catch (e) {
            console.log(
                `No number saved, probz first time running the app, defaulter to ${currentNumber}`,
            );
        }
        return currentNumber;
    };

    getCurrentPage = async () => {
        this.setState({
            loading: true,
        });
        this.pageid = await this.getPageNumberFromAsync();
        this.fetch(this.pageid);
    };

    fetch = async (pageid: number) => {
        // let data = posts;
        let data = {};
        try {
            const res = await get('/', { params: { pageid } });
            data = res.data;
            this.pageid = pageid;
            setItem(currentPageNumber, pageid);
        } catch (error) {
            console.log('error getting data from backend', error);
        }

        this.setState(
            {
                posts: data,
                loading: false,
            },
            () => {
                if (this.ref) {
                    this.ref.scrollToOffset({ offset: 0 });
                }
            },
        );
    };

    renderSeparator = () => (
        <View style={{ height: 30, backgroundColor: '#F5F6F8' }} />
    );

    goToNextPage = () => {
        setItem(currentPageNumber, newPageNumber);
    };

    renderHeader = () => (
        <View style={styles.header}>
            <Text type="header">VGD</Text>
        </View>
    );

    renderFooter = () => (
        <View style={styles.footer}>
            <Arrow way="left" number={this.pageid - 1} fetch={this.fetch} />
            <Arrow way="right" number={this.pageid + 1} fetch={this.fetch} />
        </View>
    );

    setRef = ref => {
        this.ref = ref;
    };

    render() {
        if (this.pageid <= 0) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator color={theme.primary} size="large" />
                </View>
            );
        }
        return (
            <FlatList
                ref={this.setRef}
                data={this.state.posts}
                renderItem={({ item }) => <Element item={item} />}
                keyExtractor={({ date }, index) => `${date}-${index}`}
                ItemSeparatorComponent={this.renderSeparator}
                style={{ backgroundColor: '#F5F6F8' }}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.getCurrentPage}
                refreshing={this.state.loading}
            />
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    footer: {
        backgroundColor: theme.primary,
        height: 70,
        marginTop: 30,
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        backgroundColor: theme.primary,
        height: 70,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

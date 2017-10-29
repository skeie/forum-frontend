import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    ActivityIndicator,
    AppState,
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
import AppAnalytics from './utils/tracking';

export default class App extends React.Component {
    state = {
        posts: null,
        loading: false,
        contentOffset: { x: 0, y: 0 },
    };

    pageid = -1;
    ref = null;

    componentDidMount() {
        this.analytics = new AppAnalytics();
        this.getCurrentPage();
    }

    getCurrentcontentOffset = async () => {
        try {
            let contentOffset = {
                y: 0,
            };
            contentOffset = await getItem('contentOffset');
            if (this.ref) {
                this.ref.scrollToOffset({ offset: contentOffset.y });
            }
            return Promise.resolve();
        } catch (error) {
            console.log('error getCurrentcontentOffset', error);
            return Promise.reject(error);
        }
    };

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
            posts: [],
        });
        this.pageid = await this.getPageNumberFromAsync();
        this.fetch({ pageid: this.pageid, shouldScrollToTop: false });
        return Promise.resolve();
    };

    componentWillMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => {
        if (nextAppState === 'background' && this.contentOffset) {
            setItem('contentOffset', this.contentOffset);
        }
    };

    fetch = async ({
        pageid,
        shouldScrollToTop = false,
    }: {
        pageid: number,
        shouldScrollToTop: boolean,
    }) => {
        // let data = posts;
        let data = {};
        this.analytics.sendEvent(`Fetching page with pageid: ${pageid}`);
        try {
            const res = await get('/', { params: { pageid } });
            data = res.data;
            this.pageid = pageid;
            !shouldScrollToTop && this.getCurrentcontentOffset();
            setItem(currentPageNumber, pageid);
        } catch (error) {
            console.log('error getting data from backend', error);
            return Promise.reject(error);
        }

        this.setState(
            {
                posts: data,
                loading: false,
            },
            () => {
                if (this.ref && shouldScrollToTop) {
                    this.ref.scrollToOffset({ offset: 0 });
                }
            },
        );
        return Promise.resolve();
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

    onSroll = event => {
        this.contentOffset = event.nativeEvent.contentOffset;
    };

    render() {
        if (this.pageid <= 0) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator color={theme.primary} size="large" />
                </View>
            );
        }

        console.log(this.pageid);

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
                onScroll={this.onSroll}
                initialNumToRender={100}
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

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import { SceneMap, TabView, TabBar, PagerPan, PagerScroll } from 'react-native-tab-view';
import Episodes from './Episodes'
import Trailers from './Trailers'

class TabsEpisodes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'EPISODES' },
                { key: 'second', title: 'TRAILERS & MORE' }
            ]
        }
    }

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => <TabBar {...props} />;


    _renderScene({ route }) {
        switch (route.key) {
            case 'first':
                return <Episodes
                    seasons={this.props.seasons}
                    getSeason={this.props.getSeason}
                    navigation={this.props.navigation}
                    currentSeason={this.props.currentSeason}
                    episodes={this.props.data}
                />
            case 'second':
                return <Trailers />
            default:
                return null
        }
    }

    _renderPager(props) {
        return (Platform.OS === 'ios') ? <PagerScroll {...props} /> : <PagerPan {...props} />
    }

    render() {
        return (
            <TabView
                style={styles.container}
               
                navigationState={this.state}
                renderScene={this._renderScene.bind(this)}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange.bind(this)}
                initialLayout={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
                renderPager={this._renderPager}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 2,
        borderColor: 'black'
    },
    indicator: {
        backgroundColor: 'red',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 2,
    },
})

export default TabsEpisodes
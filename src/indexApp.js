import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import App from './app';
import Search from './components/Search';
import Details from './components/Details';
import Video from './components/VideoPlayerView';
import EpisodesPicker from './components/EpisodesPicker';


const IndexApp = createStackNavigator({
    Home: {screen: App},
    Details: {screen: Details},
    Search: {screen: Search},
    Video: {screen: Video},
    EpisodesPicker: {screen: EpisodesPicker},
},{
    initialRouteName: 'Home',
    headerMode: 'none'
})

export default createAppContainer(IndexApp);
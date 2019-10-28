import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import App from './app';
import Search from './components/Search';
import Details from './components/Details';
import Video from './components/VideoPlayerView';


const IndexApp = createStackNavigator({
    Home: {screen: App},
    Details: {screen: Details},
    Search: {screen: Search},
    Video: {screen: Video},
},{
    initialRouteName: 'Home',
    headerMode: 'none'
})

export default createAppContainer(IndexApp);
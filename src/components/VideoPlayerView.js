import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

import video from '../Videos/video.mp4'

export default class VideoPlayerView extends Component {

    componentWillMount() {
        Orientation.lockToLandscape();
    }

    _back() {
        Orientation.lockToPortrait();
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <VideoPlayer
                    source={video}
                    title={this.props.title}
                    onBack={() => this._back()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});
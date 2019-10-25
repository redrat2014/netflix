import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default class Trailers extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text> Trailers & More</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});
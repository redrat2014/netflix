import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

import List from './components/List';
import Slider from './components/Slider';

export default class App extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
               <Slider />
               <List /> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
    }
});
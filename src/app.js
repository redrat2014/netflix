import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

import List from './components/List';

export default class App extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
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
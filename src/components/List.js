import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import Orientation from 'react-native-orientation';
import {getTwoItems} from '../api/api';

export default class List extends Component {

    componentWillMount() {
        Orientation.lockToPortrait();
    }

    newPushContent(item) {
        this.props.navigator.push({
            ident: 'Details',
            passProps: {
                item
            }
        });
    }

    _renderItem(item) {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={
                () => navigate('Details', {item: item})}   
            >
                <Image style={styles.picture} source={{ uri: item.image }} />
            </TouchableWithoutFeedback>
        )
    }

    render() {
        console.log(this.props)
        return (
            <ScrollView style={styles.wrapper}>
                <View style={styles.listWrapper}>
                    <Text style={styles.title}>My List</Text>
                    <FlatList
                        horizontal
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => this._renderItem(item)}
                        data={getTwoItems[0]}
                    />
                </View>
                <View style={styles.listWrapper}>
                    <Text style={styles.title}>Top Picks For You</Text>
                    <FlatList
                        horizontal
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => this._renderItem(item)}
                        data={getTwoItems[1]}
                    />
                </View>
                <View style={styles.listWrapper}>
                    <Text style={styles.title}>Most Viewed</Text>
                    <FlatList
                        horizontal
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => this._renderItem(item)}
                        data={getTwoItems[0]}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
    },
    listWrapper: {

    },
    picture: {
        width: 120,
        height: 180,
    },
    separator: {
        width: 5,
    },
    title: {
        color: 'white',
    }
});
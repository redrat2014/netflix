import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const shows_first = [
    {
        key: 1,
        name: 'Suits',
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2432.jpg'
    },
    {
        key: 2,
        name: 'Modern Family',
        image: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/628.jpg'
    },
    {
        key: 3,
        name: 'The Flash',
        image: 'http://static.tvmaze.com/uploads/images/medium_portrait/129/323466.jpg'
    },
    {
        key: 4,
        name: 'SuperGirl',
        image: 'http://static.tvmaze.com/uploads/images/medium_portrait/152/382219.jpg'
    },
    {
        key: 5,
        name: 'Suits',
        image: 'http://static.tvmaze.com/uploads/images/medium_portrait/160/402351.jpg'
    },
    {
        key: 6,
        name: 'Elementary',
        image: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/1888.jpg'
    },
    {
        key: 7,
        name: 'Jack Irish',
        image: 'http://static.tvmaze.com/uploads/images/medium_portrait/18/47317.jpg'
    },
]

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: ''
        }
    }

    filter(text) {
        const newData = shows_first.filter(function (item) {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
            text: text,
        })
    }

    deleteData() {
        this.setState({ text: '', data: '' });
    }

    _renderItem(item) {
        return (
            <Image
                key={item.key}
                source={{uri: item.image}}
                style={styles.imageItem}
            />
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Icon
                        name="search"
                        color="grey"
                        size={18}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        value={this.state.text}
                        onChangeText={(text) => this.filter(text)}
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="grey"
                        keyboardAppearance="dark"
                        autoFocus={true}
                    />
                    {this.state.text ?
                        <TouchableWithoutFeedback onPress={() => this.deleteData()}>
                            <Icon
                                name="times-circle"
                                color="grey"
                                size={18}
                                style={styles.inputCloseIcon}
                            />
                        </TouchableWithoutFeedback>
                        : null}
                    <TouchableHighlight 
                        style={styles.cancelButton} 
                        onPress={() => this.props.navigator.pop()}
                    
                    >
                        <View style={styles.wrapperButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <ScrollView>
                    <FlatList
                        style={styles.flatList}
                        data={this.state.data}
                        numColumns={3}
                        columnWrapperStyle={{marginTop: 5, marginLeft: 5}}
                        renderItem={({ item }) => this._renderItem(item)}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#181818',
    },
    header: {
        height: 40,
        backgroundColor: '#181818',
        borderBottomWidth: 1,
        borderColor: '#3a3a3a',
        paddingBottom: 5,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        width: width - (width / 5.5),
        height: 30,
        backgroundColor: '#323232',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 30,
        marginHorizontal: 10,
        borderRadius: 3,

    },
    cancelButton: {

    },
    wrapperButton: {

    },
    cancelButtonText: {
        color: 'white',

    },
    searchIcon: {
        position: 'absolute',
        top: 7,
        left: 15,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    inputCloseIcon: {
        position: 'absolute',
        top: 8,
        right: 75,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    imageItem: {
        marginRight: 5,
        width: 127,
        height: 187,
    },
    flatList: {
        marginHorizontal: 5
    }
});
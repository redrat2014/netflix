import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TextInput, TouchableHighlight, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAll } from '../api/api';

const { width, height } = Dimensions.get('window');

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: ''
        }
    }

    filter(text) {
        const data = getAll();
        const newData = data.filter(function (item) {
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

    _renderItem(item){
        const {navigate} = this.props.navigation
        return (
            <TouchableWithoutFeedback onPress={
                () => navigate('Details', {item: item})}
            >
                <Image style={styles.imageItem} source={{uri: item.image}}/>
            </TouchableWithoutFeedback>
        )
    }

    _back() {
        const { goBack } = this.props.navigation;
        goBack();
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
                        onPress={() => this._back()}     
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
        color: 'grey'

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
    },
    picture: {
        width: 120,
        height: 180,
    },
});
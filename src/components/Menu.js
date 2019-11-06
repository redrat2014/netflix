import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import userImage from '../images/user.png';

const { width, height } = Dimensions.get('window');

export default class Menu extends Component {
    
    _renderItemsMenu(){
        const genres = ["Home","Drama","Action","Fantasy","Horror","Romance","Crime","Thriller","Mystery","Science-Fiction","Comedy","Family","Music","Adventure","Espionage","Supernatural"]
        const {itemSelectedValue} = this.props
        return genres.map((element, key) => (
            <TouchableHighlight 
                key={key}
                style={element == itemSelectedValue ? [styles.items, styles.itemSelected]: styles.noSelectedItems}
                onPress={() => this.props.itemSelected(element)}    
            >
                <Text style={styles.text}>{element}</Text>
            </TouchableHighlight>
        ))
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.wrapper}>
                <View style={styles.avatarWrapper}>
                    <View style={styles.avatarImage}>
                        <Image 
                            source={userImage}
                            style={styles.avatar}
                        />
                        <Text style={styles.textName}>Renato</Text> 
                    </View>
                    <Icon
                        name="exchange"
                        color="white"
                        size={25}
                    />
                </View>
                <ScrollView style={styles.scrollWrapper}>
                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            <Icon 
                                name="download"
                                color="white"
                                size={28}
                                style={styles.iconWithText}
                            />
                            <Text style={styles.downloadText}>My Downloads</Text>
                        </View>
                        <Icon 
                            name="angle-right"
                            color="white"
                            size={25}
                            style={styles.rightIcon}
                        />
                    </View>
                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            <Ionicons 
                                name="md-checkmark"
                                color="white"
                                size={28}
                                style={styles.iconWithText}
                            />
                            <Text style={styles.downloadText}>My List</Text>
                        </View>
                        <Icon 
                            name="angle-right"
                            color="white"
                            size={25}
                            style={styles.rightIcon}
                        />
                    </View>
                   {this._renderItemsMenu()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: "#191919",
    },
    avatarWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 2 + 68,
        borderBottomWidth: 3,
        borderBottomColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 20,

    },
    avatarImage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20,
    },
    text: {
        color: '#b3b3b3',
        fontSize: 15
    },
    textName: {
        color: "#b3b3b3",
        fontSize: 18,
    },
    scrollWrapper: {
        width: width / 2 + 68
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderColor: "black",
        borderBottomWidth: 3,
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightIcon: {
        paddingRight: 20
    },
    iconWithText: {
        marginRight: 10,
        paddingLeft: 20,
    },
    downloadText: {
        color: "#d3d3d3",
        fontSize: 15,
    },
    itemText: {
        color: "white",
        fontSize: 15,
    },
    items: {
        paddingVertical: 15,
        paddingLeft: 20,
        marginTop: 5,
    },
    itemSelected: {
        borderLeftWidth: 5,
        borderColor: 'red',
    },
    noSelectedItems: {
        paddingVertical: 15,
        paddingLeft: 25,
        marginTop: 5,
    }
});
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import logo from '../images/Netflix-logo.png';

const Header = props => (
    <View style={styles.wrapper}>
        <TouchableWithoutFeedback
            onPress={() => props.toggleSideMenu()}
        >
            <Icon 
                name="bars"
                color="white"
                size={25}
            />
        </TouchableWithoutFeedback>
        <Image 
            source={logo}
            style={styles.logo}
        />
        <Icon 
            name="search"
            color="white"
            size={25}
        />
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: 'black',
    },
    logo: {
        width: 120,
        height: 40,
    },

});

export default Header;
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabsEpisodes from './TabsEpisodes';

const { width, height } = Dimensions.get('window');

export default class Details extends Component {

    componentWillMount() {
        Orientation.lockToPortrait();
    }

    openVideo() {
        const { name } = this.props.item;

        Orientation.lockToLandscape();
        this.props.navigator.push({
            ident: 'Video',
            title: name
        });
    }

    render() {
        const { episodes } = this.props.item.details;
        const { name } = this.props.item;
        const { thumbnail, cast, description, year, creator, numOfEpisodes, season } = this.props.item.details;

        return (
            <ScrollView style={styles.wrapper}>
                <Image
                    source={{ uri: thumbnail }}
                    style={styles.thumbnail}
                />
                <View style={styles.buttonPlay}>
                    <TouchableWithoutFeedback onPress={() => this.openVideo()}>
                        <View>
                            <Icon
                                name="play-circle"
                                color="white"
                                size={90}
                                style={styles.iconPlay}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.nameContainer}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['transparent', '#181818', '#181818']} style={styles.linearGradient}>
                        <Text style={[styles.text, styles.titleShow]}>{name}</Text>
                    </LinearGradient>
                </View>
                <View style={styles.descriptionWrapper}>
                    <View style={styles.subtitle}>
                        <Text style={[styles.text, styles.subtitleText]}>{year}</Text>
                        <Text style={[styles.text, styles.subtitleText]}>{numOfEpisodes}</Text>
                        <Text style={[styles.text, styles.subtitleText]}>{season} Season</Text>
                    </View>
                </View>
                
                <View style={styles.detailsWrapper}>
                    <View style={styles.description}>
                        <Text style={[styles.text, styles.lightText]}>{description}</Text>
                    </View>
                    <Text style={styles.text}>Cast: {cast}</Text>
                    <Text style={styles.text}>Creator: {creator}</Text>
                    <View style={styles.shareListIcons}>
                        <View style={styles.myListIcon}>
                            <Ionicons
                                name="md-checkmark"
                                color="grey"
                                size={27}
                                style={styles.listIcon}
                            />
                            <Text style={styles.text}>My List</Text>
                        </View>
                        <View style={styles.myShareIcon}>
                            <Icon
                                name="share-alt"
                                color="grey"
                                size={25}
                                style={styles.shareIcon}
                            />
                            <Text style={styles.text}>Share</Text>
                        </View>
                    </View>
                </View>

                <TabsEpisodes data={episodes} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#181818',
    },
    thumbnail: {
        width: width,
        height: 300,
    },
    buttonPlay: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        height: 290,
    },
    iconPlay: {
        opacity: 0.4,
        backgroundColor: 'transparent',
    },
    descriptionWrapper: {
        paddingHorizontal: 20,
    },
    subtitle: {
        flexDirection: 'row',
    },
    subtitleText: {
        marginRight: 20,
    },
    text: {
        color: '#b3b3b3',
        fontSize: 16,
    },
    shareListIcons: {
        flexDirection: 'row',
        marginVertical: 30,
    },
    listIcon: {
        height: 25,
    },
    shareIcon: {
        height: 25
    },
    myListIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
    myShareIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
    description: {
        marginVertical: 10,
    },
    lightText: {
        fontWeight: '100',
    },
    detailsWrapper: {
        paddingHorizontal: 20
    },
    nameContainer: {
        backgroundColor: 'transparent', 
    },
    titleShow: {
        fontSize: 35,
        paddingLeft: 10,
        marginBottom: 10,
        marginTop: 0,
        color: 'white',
        backgroundColor: 'transparent',
    },
    linearGradient: {
        paddingLeft: 9,
        paddingRight: 10,
        height: 50,
        width: '100%',
        marginTop: -35,
    },
});
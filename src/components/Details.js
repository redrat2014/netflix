import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    Share
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import TabsEpisodes from './TabsEpisodes';

const { width, height } = Dimensions.get('window');

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            measures: 0,
            header: false,
            animation: ''
        }
    }

    componentWillMount() {
        Orientation.lockToPortrait();
    }

    onShare() {
        Share.share({
            title: 'Designated Survivor',
            url: 'www.youtube.com',
            message: 'Awesome Tv show'
        }, {
            //android
            dialogTitle: 'Share this awesome content',
            //ios
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        });
    }

    handleScroll(event) {
        if (event.nativeEvent.contentOffset.y > this.state.measures) {
            this.setState({
                header: true,
                animation: 'slideInDown'
            });
        } else {
            this.setState({
                header: false
            });
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        const { episodes } = params.item.details;
        const { navigate } = this.props.navigation;
        const { name } = params.item;
        const { thumbnail, cast, description, year, creator, numOfEpisodes, season } = params.item.details;

        return (
            <View style={styles.headerdWrapper}>
               {this.state.header ? 
                    <Animatable.View 
                        animation={this.state.animation}
                        style={styles.header}
                    >
                        <Text style={styles.headerText}>{name}</Text>
                    </Animatable.View> 
                : null}
                <ScrollView
                    onScroll={this.handleScroll.bind(this)}
                    style={styles.wrapper}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        style={styles.thumbnail}
                    />
                    <View style={styles.buttonPlay}>
                        <TouchableWithoutFeedback 
                            onPress={() => navigate('Video', {name: name})}
                        >
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
                    <View style={styles.nameContainer}
                        onLayout={({ nativeEvent }) => {
                            this.setState({
                                measures: nativeEvent.layout.y
                            });
                        }}
                    >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['transparent', '#181818', '#181818']} style={styles.linearGradient}>
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
                            <TouchableHighlight
                                onPress={this.onShare}
                            >
                                <View style={styles.myShareIcon}>
                                    <Icon
                                        name="share-alt"
                                        color="grey"
                                        size={25}
                                        style={styles.shareIcon}
                                    />
                                    <Text style={styles.text}>Share</Text>
                                </View>
                            </TouchableHighlight>

                        </View>
                    </View>

                    <TabsEpisodes data={episodes} />
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
        paddingHorizontal: 30,
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
        paddingHorizontal: 30
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
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        width: '100%',
        marginTop: -40,
    },
    headerdWrapper: {
        flex: 1,
    },
    header: {
        backgroundColor: '#181818',
        paddingVertical: 10,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    headerText: {
        color: 'white',
        fontSize: 20
    }
});
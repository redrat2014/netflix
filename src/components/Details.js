import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Dimensions,
    Share,
    Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


import TabsEpisodes from './TabsEpisodes';

const { width, height } = Dimensions.get('window');

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            measuresTitle: 0,
            measuresSeason: 0,
            scrollY: new Animated.Value(0),
            currentSeason: 1,
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

    getSeason(season) {
        this.setState({
            currentSeason: season
        });
    }

    render() {
        const headerNameToggle = this.state.scrollY.interpolate({
            inputRange: [this.state.measuresTitle, this.state.measuresTitle + 1],
            outputRange: [0, 1]
        });
        const headerSeasonHide = this.state.scrollY.interpolate({
            inputRange: [
                this.state.measuresSeason - 1,
                this.state.measuresSeason,
                this.state.measuresSeason + 1
            ],
            outputRange: [-width, 0, 0]
        });
        const headerSeasonToggle = this.state.scrollY.interpolate({
            inputRange: [this.state.measuresSeason, this.state.measuresSeason + 1],
            outputRange: [0, 1]
        });
        const { goBack } = this.props.navigation;
        const { params } = this.props.navigation.state;
        const { episodes } = params.item.details;
        const { navigate } = this.props.navigation;
        const { name } = params.item;
        const { thumbnail, cast, description, year, creator, numOfEpisodes, season } = params.item.details;

        return (
            <View style={styles.headerdWrapper}>
                <TouchableHighlight
                    style={styles.closeButton}
                    onPress={() => goBack()}
                >
                    <Icon
                        name="times"
                        color="white"
                        size={18}
                    />
                </TouchableHighlight>
                <Animated.View style={[styles.header, { opacity: headerNameToggle }]}>
                    <Text style={styles.headerText}>{name}</Text>
                </Animated.View>
                <Animated.View style={[styles.header,
                { opacity: headerSeasonToggle, transform: [{ translateY: 0 }, { translateX: headerSeasonHide }] }]}
                >
                    {season == 1 ? <TouchableHighlight>
                        <Text style={styles.headerText}>Season {this.state.currentSeason}</Text>
                    </TouchableHighlight> :
                        <TouchableHighlight
                            onPress={() => navigate('EpisodesPicker', {
                                getSeason: this.getSeason.bind(this),
                                seasons: season,
                                currentSeason: this.state.currentSeason
                            })}>
                            <View style={styles.headerWithIcon}>
                                <Text style={styles.headerText}>Season {this.state.currentSeason}</Text>
                                <Icon
                                    style={styles.iconDown}
                                    name="chevron-down"
                                    color="white"
                                    size={15}
                                />
                            </View>
                        </TouchableHighlight>}
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={1}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true }
                        )
                    }
                    style={styles.wrapper}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        style={styles.thumbnail}
                    />
                    <View style={styles.buttonPlay}>
                        <TouchableWithoutFeedback
                            onPress={() => navigate('Video', { name: name })}
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
                                measuresTitle: nativeEvent.layout.y
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
                    <View onLayout={({ nativeEvent }) => {
                        this.setState({
                            measuresSeason: nativeEvent.layout.y + 10
                        });
                    }}>
                        <TabsEpisodes
                            seasons={season}
                            getSeason={this.getSeason.bind(this)}
                            navigation={this.props.navigation}
                            data={episodes}
                            currentSeason={this.state.currentSeason}
                        />
                    </View>
                </Animated.ScrollView>
            </View>
        );
    }
}

export default Details;

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
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 10,
        zIndex: 2
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
    },
    headerWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconDown: {
        marginLeft: 5,
    }
});
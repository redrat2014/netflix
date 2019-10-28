import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Episodes extends Component {
    renderEpisodes() {
        const { currentSeason } = this.props;

        return this.props.episodes.filter(function (element) {
            return element.season == currentSeason;
        }).map((item, i) => {
            const img = item.image == null ? 'https://static.tvmaze.com/uploads/images/medium_landscape/76/190262.jpg' : item.image.medium
            return (
                <View style={styles.video} key={i}>
                    <View style={styles.videoEpisode}>
                        <View style={styles.buttonPlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        style={styles.iconPlay}
                                        name="play-circle"
                                        size={30}
                                        color="white"
                                    />
                                    <Image style={styles.image} source={{ uri: img }} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.episodeName}>
                            <Text style={styles.text}>{item.number}. {item.name}</Text>
                            <Text style={styles.text}>{item.runtime}</Text>
                        </View>
                    </View>
                    <Text style={styles.summary}>{item.summary}</Text>
                </View>
            );
        });
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.wrapper}>
                {this.props.season == 1 ?
                    <TouchableWithoutFeedback>
                        <View>
                            <Text style={styles.buttonText}>Season {this.props.currentSeason}</Text>
                        </View>
                    </TouchableWithoutFeedback> : <TouchableWithoutFeedback
                        onPress={() => navigate('EpisodesPicker',
                            { getSeason: this.props.getSeason, seasons: this.props.seasons, currentSeason: this.props.currentSeason }
                        )}>
                        <View style={styles.buttonWithIcon}>
                            <Text style={styles.buttonText}>Season {this.props.currentSeason}</Text>
                            <Icon
                                style={styles.iconDown}
                                name="chevron-down"
                                color="white"
                                size={10}
                            />
                        </View>
                    </TouchableWithoutFeedback>}
                    <View style={styles.renderEpisodes}>
                        {this.renderEpisodes()}
                    </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 10
    },
    buttonWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    iconDown: {
        MarginLeft: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    iconDown: {
        marginLeft: 5
    },
    renderEpisodes: {
        marginTop: 10
    },
    image: {
        width: 150,
        height: 80,
        marginRight: 10
    },
    buttonPlay: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1
        position: 'relative'
    },
    iconContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconPlay: {
        zIndex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    },
    episodeName: {
        justifyContent: 'center',
    },
    videoEpisode: {
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 17
    },
    summary: {
        color: 'grey',
        marginVertical: 10
    },
})

export default Episodes;
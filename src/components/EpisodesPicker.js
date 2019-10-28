import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class EpisodesPicker extends Component {

    goBack() {
        const { goBack } = this.props.navigation
        goBack();
    }

    createData(seasons) {
        const data =[];
        for(var i = 1; i<= seasons; i++) {
            data.push({key: i, season: i});
        }
        return data;
    }

    saveSeason(item) {
        const { goBack } = this.props.navigation
        this.props.navigation.state.params.getSeason(item.season);
        goBack();
    }

    _renderItem(item) {
        const { currentSeason } = this.props.navigation.state.params;
        if (currentSeason == item.season) {
            return (
                <TouchableHighlight 
                    onPress={() => this.saveSeason(item)}
                    style={styles.row}
                >   
                    <View style={styles.seasonChecked}>
                       <Text style={styles.textList}>Season {item.season}</Text> 
                       <Icon 
                            name="check"
                            size={18}
                            color="white"
                        />
                    </View>
                </TouchableHighlight>
            )
        } else {
            return (
                <TouchableHighlight 
                    onPress={() => this.saveSeason(item)}
                    style={styles.row}
                >
                    <View>
                       <Text style={styles.textList}>Season {item.season}</Text> 
                    </View>
                </TouchableHighlight>
            )
        }
    }

    

    render() {
        const { seasons } = this.props.navigation.state.params;
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.textTitle}>Seasons</Text>
                    </View>
                    <View style={styles.cancelButtonView}>
                        <TouchableWithoutFeedback
                            onPress={() => this.goBack()}
                        >
                            <View style={styles.buttonWrapper}>
                                <Text style={styles.textCancel}>Cancel</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <FlatList 
                    style={{flex: 1}}
                    renderItem={({item}) => this._renderItem(item)}
                    data={this.createData(seasons)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#181818',
    },
    textCancel: {
        color: '#f9f9f9',
        fontSize: 18,
    },
    textTitle: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
    },
    header: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'black',
        paddingBottom: 10,
    },
    cancelButtonView: {
        position: 'absolute',
        right: 7,
        top: 25,
    },
    textList: {
        color: '#f9f9f9',
        fontSize: 18,
    },
    seasonChecked: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
      paddingVertical: 20,
      paddingHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'black',  
    }
})

export default EpisodesPicker;
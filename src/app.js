import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import SideMenu from 'react-native-side-menu';

import List from './components/List';
import Slider from './components/Slider';
import Header from './components/Header';
import Menu from './components/Menu';
import Genres from './components/Genres';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            itemSelected: 'Home'
        }
        this.getTwoRows = this.getTwoRows.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
    }

    toggleSideMenu() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    itemSelected(item) {
        this.setState({
            itemSelected: item,
            isOpen: false
        });
    }

    updateMenu(isOpen) {
        this.setState({isOpen});
    }

    getTwoRows(){
        const {shows} = this.props
        const array = shows.slice(0)
        const val = Math.floor(array.length / 2)
        const newArray = array.splice(0, val)
        return [
            array,
            newArray
        ]
    }

    render() {
        return (
            <View style={styles.wrapper}>
             <SideMenu
                    menu={<Menu 
                        navigation={this.props.navigation}
                        itemSelected={this.itemSelected}
                        itemSelectedValue={this.state.itemSelected}
                    />}
                    isOpen={this.state.isOpen}
                    onChange={(isOpen) => this.updateMenu(isOpen)}
                >
                    <View style={styles.wrapper}>
                        <Header navigation={this.props.navigation} toggleSideMenu={this.toggleSideMenu.bind(this)} />
                        {this.state.itemSelected == 'Home' ? <View style={{flex: 1}}>
                            <Slider />
                            <List 
                                navigation={this.props.navigation} 
                                getTwoRows={this.getTwoRows} 
                            />
                        </View> :
                        <Genres 
                            item={this.state.itemSelected}
                        />}
                    </View>

                </SideMenu>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
    }
});

export default connect(state => ({shows: state.shows}))(App)
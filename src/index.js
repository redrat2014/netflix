import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Routes from './config/routes'

import getStore from './store'


let RootStack = createStackNavigator(Routes, {
    headerMode: 'none'
})

let Navigator = createAppContainer(RootStack);

const navReducer = (state, action) => {
    const newState = Navigator.router.getStateForAction(action, state)
    return newState || state
}

const store = getStore(navReducer);
const AppIndex = connect(state => ({ nav: state.nav }))(Navigator)

export default class App extends Component {

    render() {
        return (
            <Provider 
                store={store} 
                navigation={{
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                }}
            >
                <AppIndex />
            </Provider>
        )
    }
}

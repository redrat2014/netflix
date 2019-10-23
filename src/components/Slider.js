import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native'

import ViewPager from '@react-native-community/viewpager';


export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            imagesSlider: [
                require('../images/1.jpg'),
                require('../images/2.jpg'),
                require('../images/3.jpg')
            ]
        }
    }
    render(){
        const Banners = props => ( 
            <View style={styles.container}>
                <Image style={styles.image} source={props.uri}/>
            </View>
        )

        return (
            <View style={styles.container}>
                <ViewPager
                    height={240}
                >
                {
                    this.state.imagesSlider.map((item, i) => <Banners 
                        uri={item}
                        key={i}
                    />)
                }
                </ViewPager>
            </View>
        )
    }
}

const styles = StyleSheet.create({
     container: {
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
    },
});
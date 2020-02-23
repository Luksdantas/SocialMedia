import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Gravatar } from 'react-native-gravatar'

import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    StatusBar,
} from 'react-native'
import * as Font from 'expo-font'
import icon from '../../assets/imgs/icon.png'

class Header extends Component {
    state =  {
        fontLoaded: false,
    }
        
    async componentDidMount() {
        await Font.loadAsync({
          'shelter': require('../../assets/fonts/shelter.otf'),
        });
    
        this.setState({ fontLoaded: true });
      }

    render() {
        const name = this.props.name || 'Anonymous'
        const gravatar = this.props.email ?
            <Gravatar options={{ email: this.props.email, secure: true}} style={styles.avatar}/> 
            : null
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image}></Image>
                    <Text style={styles.title}>SocialMedia</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>

        )
    }
}




const styles = StyleSheet.create({
    container: {
       marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    title: {
        color: '#000',
        height: 30,
        fontSize: 28,
        fontFamily: null
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    user: {
        fontSize: 10,
        color: '#888'
    },
    avatar: {
        width: 30,
        height: 30,
        marginLeft: 10,
    }
})

const mapStateToProps = ({ user }) => {
  return {
      email: user.email,
      name: user.name
  }
}

export default connect(mapStateToProps)(Header)
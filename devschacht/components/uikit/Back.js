import  React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import {THEME} from '../../const/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

function Back({nav}) {
    const navigation = useNavigation()
    return (
        <Icon name="arrow-back" size={(width / 360) * 30} color='#fff' onPress={() => {
            navigation.pop()
            // go back later
        }} />
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        borderRadius: 16
    }
})

export default Back

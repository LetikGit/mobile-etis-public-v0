import React, { useState, useEffect } from 'react'
import {Header} from 'react-native-elements'
import {View, StyleSheet, Dimensions, Alert, AsyncStorage} from 'react-native'
import { THEME } from '../../const'
import HeaderText from './components/HeaderText'
import Back from '../uikit/Back'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

const { width, height } = Dimensions.get('window');

const heightHeader = (width / 360) * 84

const action = () => {
    alert('Функция находится в разработке.')
}

const AppHeader = ({ title, notify, back }) => {

    const [secondaryImage, setSecondaryImage] = useState('https://sun3-10.userapi.com/Nhs48fVyJPQMmnkNjxYlS2IQCE0GI6zcEFEwHw/XtfaS5j69-A.jpg')


    useEffect(() => {
        async function fetchBg() {
            const secondaryImageBg = await SecureStore.getItemAsync('secondaryImageBg')
            secondaryImageBg ? setSecondaryImage(secondaryImageBg) : undefined
        }

        fetchBg()
      }, [])


return (
    <Header
        leftContainerStyle={{flex: back ? 1 : 2, marginTop: '3%'}}
        centerContainerStyle={{flex: back ? 2 : 0, marginTop: '3%'}}
        rightContainerStyle={{flex: 1, marginTop: '3%'}}
        barStyle="light-content"
        statusBarProps={{ backgroundColor: "transparent", translucent: true}}
        backgroundImage={{uri: secondaryImage}}
        backgroundImageStyle={styles.default}
        centerComponent={back ? <HeaderText title={title} /> : {}}
        leftComponent={back ? <Back nav={back} /> : <HeaderText title={title} />}
        rightComponent={notify ? {
            icon: 'notifications',
            color: '#fff',
            size: (width / 360) * 24,
            onPress: () => Alert.alert(
                'Внимание!',
                'Данная функция находится в разработке.'
            )
        } : {}}
        containerStyle={styles.container}
    />
)}

const styles = StyleSheet.create({
    default: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    container: {
        backgroundColor: THEME.BACKGROUND_MAIN_COLOR,
        paddingHorizontal: width / 12,
        height: heightHeader
    }
})

export default AppHeader

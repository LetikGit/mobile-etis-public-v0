import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Text, Tooltip, Divider } from 'react-native-elements';
import { THEME } from '../../const/index'
import { NavigationActions, StackActions  } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

const { width, height } = Dimensions.get('window');





function AccountMenuItem({data}) {

    const navigation = useNavigation();

        return (
                    <TouchableOpacity style={styles.container} onPress={() => {
                        if (data.action === 'exit') {
                            SecureStore.setItemAsync('user', '')
                            SecureStore.setItemAsync('password', '')
                            SecureStore.setItemAsync('session', '')
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'AuthStack' })],
                            });
                            navigation.dispatch(resetAction);
                        } else if (data.navigate) {
                            navigation.navigate(data.navigate)
                        } else {
                            Alert.alert(
                                'Внимание!',
                                'Данный раздел находится в разработке.'
                            )
                        }
                      }} >
                        <View>
                            <Icon
                                name={data.icon}
                                size={(width / 360) * 26}
                                color={data.color}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{data.title}</Text>
                        </View>
                    </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: (width / 360) * 80,
        width: '46%',
        margin: '2%',
        padding: (width / 360) * 10,
        borderRadius: 10
    },
    title: {
        fontFamily: 'PTRoot-Bold',
        fontSize: (width / 360) * 15,
        color: THEME.TEXT_BOLD_BLACK_COLOR,
    },
    subtitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 12,
        color: THEME.TEXT_MEDIUM_DARK_COLOR
    },
    textContainer: {
        marginTop: '5%'
    }
  });

export default AccountMenuItem

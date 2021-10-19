import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { THEME } from '../../const/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Lesson from './Lesson'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: '4%',
        paddingVertical: 10,
        marginHorizontal: '6%',
        marginVertical: '2%',
        borderRadius: 16,
        flexDirection: 'row',
    },
    avatarContainer: {
        paddingRight: 10
    },
    infoContainer: {
        flexDirection: 'column',
        width: '78%'
    },
    name: {
        fontFamily: 'Nunito-Bold',
        color: THEME.TEXT_BOLD_BLACK_COLOR,
        paddingBottom: 4
    },
    cafedra: {
        fontFamily: 'Nunito-SemiBold',
        color: THEME.DEFAULT_GRAY_COLOR,
        paddingBottom: 4,
        fontSize: (width / 360) * 12
    },
    discipline: {
        fontFamily: 'Nunito-Light',
        color: THEME.DEFAULT_GRAY_COLOR,
        fontSize: (width / 360) * 11
    }
  });

const TeacherItem = ({ name, avatar, cafedra, discipline }) => {
        return (
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Image 
                          source={{uri: avatar}}
                          style={{ width: 64, height: 80, borderRadius: 15 }}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.cafedra}>{cafedra}</Text>
                        <Text style={styles.discipline}>{discipline}</Text>
                    </View>
                </View>
        )
}

export default TeacherItem
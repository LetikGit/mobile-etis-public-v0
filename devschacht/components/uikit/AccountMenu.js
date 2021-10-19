import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, ScrollView, } from 'react-native';
import { THEME } from '../../const/index'
import AccountMenuItem from './AccountMenuItem'

const { width, height } = Dimensions.get('window');

const AccountMenu = ({ studentData }) => {

    const {
        anonceCount,
        birthday,
        fullname,
        missingClassesCount,
        msgCount,
        specialization,
        studyStartedYear,
        studyType,
    } = studentData;

    const menu = [
        {
            icon: 'time-outline',
            title: `Пропуски (${missingClassesCount})`,
            color: THEME.PSU_MAIN_COLOR
        },
        {
            icon: 'mail-outline',
            title: `Сообщения (${msgCount})`,
            color: THEME.PSU_MAIN_COLOR
        },
        {
            icon: 'newspaper-outline',
            title: `Объявления (${anonceCount})`,
            color: THEME.PSU_MAIN_COLOR
        },
        {
            icon: 'settings-outline',
            title: 'Настройки',
            color: THEME.PSU_MAIN_COLOR,
            navigate: 'Settings'
        },
        {
            icon: 'ios-help-circle-outline',
            title: 'О приложении',
            color: THEME.PSU_MAIN_COLOR,
            navigate: 'About'
        },
        {
            icon: 'exit-outline',
            title: 'Выход',
            color: THEME.PSU_MAIN_COLOR,
            action: 'exit',
            navigate: 'Login'
        }
    ]

        return (
            <React.Fragment>
                <View style={styles.menu}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                    {
                        <View style={styles.row}>
                        {
                            menu.map(item => (
                                <AccountMenuItem data={item} key={item.title} />
                            ))
                        }
                        </View>
                    }
                    </ScrollView>
                </View>
            </React.Fragment>
        )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    menu: {
        backgroundColor: THEME.BACKGROUND_MAIN_COLOR,
        paddingHorizontal: (width / 360) * 18,
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: (width / 360) * 16
    }
  });

export default AccountMenu;

import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import { Text, Tooltip, Divider } from 'react-native-elements';
import { THEME } from '../../const/index'
import { PureNativeButton  } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import AccountMenuItem from './AccountMenuItem'
import { useNavigation } from '@react-navigation/native';

function mapStateToProps(state) {
    return {action: state.action }
}

function mapDispatchToProps(dispatch) {
    return {
        closeMenu: () => dispatch({
            type: "CLOSE_MENU"
        })
    }
}

const AnimatedView = Animated.createAnimatedComponent(View)
const { width, height } = Dimensions.get('window');


class ModalCard extends React.Component {

    state = {
        top: new Animated.Value(height),
    };

    componentDidMount() {
        this.toggleMenu()
    }

    componentDidUpdate() {
        this.toggleMenu()
    }

    toggleMenu = () => {
        if (this.props.action == "openMenu") {
            Animated.spring(this.state.top, {
                toValue: 0
            }).start()
        }

        if (this.props.action == "closeMenu") {
            Animated.spring(this.state.top, {
                toValue: height
            }).start()
        }
    }

    








    render() {
        const menu = [
            {
                icon: 'md-bed',
                title: 'Пропущенные занятия',
                subtitle: `${this.props.data.missing_classes} пропущенных занятий`,
                color: THEME.PSU_MAIN_COLOR
            },
            {
                icon: 'md-document',
                title: 'Приказы',
                subtitle: '',
                color: THEME.PSU_MAIN_COLOR
            },
            {
                icon: 'ios-mail',
                title: 'Сообщения от преподавателей',
                subtitle: `${this.props.data.msgCount} новых сообщения`,
                color: THEME.PSU_MAIN_COLOR
            },
            {
                icon: 'ios-paper',
                title: 'Объявления',
                subtitle: `${this.props.data.anonceCount} новых объявлений`,
                color: THEME.PSU_MAIN_COLOR
            },
            {
                icon: 'md-settings',
                title: 'Настройки',
                subtitle: '',
                color: THEME.PSU_MAIN_COLOR,
                navigate: 'Settings'
            },
            {
                icon: 'ios-code',
                title: 'О приложении',
                subtitle: '',
                color: THEME.PSU_MAIN_COLOR,
                navigate: 'About'
            },
            {
                icon: 'ios-exit',
                title: 'Выход',
                subtitle: '',
                color: THEME.PSU_MAIN_COLOR,
                action: 'exit',
                navigate: 'Login'
            }
        ]
        return (
            <AnimatedView style={[styles.container, {top: this.state.top}]}>
                <View style={styles.header} />
                <TouchableOpacity
                    onPress={this.props.closeMenu}
                    style={styles.closeContainer}
                >
                    <View style={styles.closeView}>
                        <Icon name="ios-close" size={34} color={THEME.PSU_MAIN_COLOR} />
                    </View>
                </TouchableOpacity>
                <View style={styles.menu}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                    {
                        menu.map(item => (
                            <AccountMenuItem data={item} key={item.title} />
                        ))
                    }
                    </ScrollView>
                </View>
            </AnimatedView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    header: {
        height: (width / 360) * 96,
        width: width
    },
    menu: {
        backgroundColor: THEME.BACKGROUND_MAIN_COLOR,
        height: height * 0.84,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: '10%',
        paddingBottom: '8%',
        paddingHorizontal: '14%'
    },
    closeView: {
        borderRadius: 22,
        width: (width / 360) * 40,
        height: (width / 360) * 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    closeContainer: {
        left: '50%',
        position: 'absolute',
        marginLeft: -22,
        top: (width / 360) * 84,
        zIndex: 1,
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard)

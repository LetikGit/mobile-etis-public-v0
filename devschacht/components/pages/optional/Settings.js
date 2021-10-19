import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Alert, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { Image, Text, Input, Button, LinearGradient } from 'react-native-elements';
import * as Font from 'expo-font';
import {THEME} from '../../../const/index'
import AppHeader from '../../nav/AppHeader';
import Loading from '../../uikit/Loading';
import LinkCard from '../../uikit/LinkCard'
import * as SecureStore from "expo-secure-store";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	center: {
      flex: 1,
      backgroundColor: THEME.BACKGROUND_MAIN_COLOR
    },
    appInfoContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '4%',
        paddingTop: '4%'
    },
    appInfoText: {
        color: THEME.DEFAULT_GRAY_COLOR,
        fontFamily: 'Nunito-SemiBold',
        fontSize: (width / 360) * 14
    },
    linkContainer: {
        backgroundColor: 'red',
        width: '100%',
        height: (width / 360) * 240,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    container: {
        flexGrow: 1,
        paddingBottom: 20,
        paddingTop: 20,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      formContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      signUpText: {
        color: 'white',
        fontSize: (SCREEN_WIDTH / 360) * 28,
      },
      whoAreYouText: {
        color: '#7384B4',
        fontSize: (SCREEN_WIDTH / 360) * 14,
      },
      userTypesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: SCREEN_WIDTH,
        alignItems: 'center',
      },
      userTypeItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
      },
      userTypeItemContainerSelected: {
        opacity: 1,
      },
      userTypeMugshot: {
        margin: 4,
        height: 70,
        width: 70,
      },
      userTypeMugshotSelected: {
        height: 100,
        width: 100,
      },
      userTypeLabel: {
        color: 'yellow',
        fontSize: (SCREEN_WIDTH / 360) * 11,
      },
      inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#f8f8ff',
        height: 45,
        marginVertical: 10,
      },
      inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontSize: (SCREEN_WIDTH / 360) * 16,
      },
      errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#F44336',
      },
      signUpButtonText: {
        fontSize: (SCREEN_WIDTH / 360) * 16,
      },
      signUpButton: {
        width: 250,
        borderRadius: Math.round(45 / 2),
        height: 45,
      },
      loginHereContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      alreadyAccountText: {
        fontSize: (SCREEN_WIDTH / 360) * 12,
        color: 'white',
      },
      loginHereText: {
        color: '#FF9800',
        fontSize: (SCREEN_WIDTH / 360) * 12,
      },
  });


export default class About extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          fontLoaded: false,
          counter: 0,
          secondaryImageBg: '',
          mainImageBg: ''
        };
      }
      onValueChange(value) {
        this.setState({
          selected: value
        })
      }


    async componentDidMount() {
        this._isMounted = true;
        await Font.loadAsync({
            'Nunito-Bold':require('../../../assets/fonts/Nunito-Bold.ttf'),
            'Nunito-SemiBold':require('../../../assets/fonts/Nunito-SemiBold.ttf')
        })
        this.setState({ fontLoaded: true })

        const mainImageBg = await SecureStore.getItemAsync('mainImageBg')
        const secondaryImageBg = await SecureStore.getItemAsync('secondaryImageBg')

        this.setState({
            mainImageBg: mainImageBg,
            secondaryImageBg: secondaryImageBg
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }


    save = async () => {
        await SecureStore.setItemAsync('mainImageBg', this.state.mainImageBg)
        await SecureStore.setItemAsync('secondaryImageBg', this.state.secondaryImageBg)
        Alert.alert('Изменения', 'Все изменения успешно сохранены')
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.center}>
                        <AppHeader back='Account' title="Настройки" notify={false} />
                        <View style={styles.appInfoContainer}>
                        <Input
                            placeholder='Вставьте ссылку на картинку'
                            label='Свой фон шапки (страница "Аккаунт")'
                            value={this.state.mainImageBg}
                            onChangeText={mainImageBg => this.setState({ mainImageBg })}
                        />
                        <Input
                            placeholder='Вставьте ссылку на картинку'
                            label='Свой фон шапки (второстепенный)'
                            value={this.state.secondaryImageBg}
                            onChangeText={secondaryImageBg => this.setState({ secondaryImageBg })}
                        />
                        <Button
                            title="Сохранить"
                            containerStyle={{ flex: -1, marginTop: '80%' }}
                            buttonStyle={styles.signUpButton}
                            titleStyle={styles.signUpButtonText}
                            onPress={this.save}
                        />
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <Loading />
            )
        }

    }

}


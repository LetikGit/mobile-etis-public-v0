import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  AsyncStorage,
  SafeAreaView,
  View,
} from 'react-native';
import Loading from './uikit/Loading'
import { Input, Button, Icon } from 'react-native-elements';
import axios from 'axios'
import iconv from 'iconv-lite'
import { Buffer } from 'buffer';
global.Buffer = Buffer
import { NavigationActions, StackActions  } from 'react-navigation'
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { CONFIG } from '../const/request'

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Login extends Component {

    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }


    componentDidMount() {
      this._isMounted = true
      if (this._isMounted) {
        this._loadInitialState().done()
      }
    }

    _loadInitialState = async () => {
        let valueUser = await SecureStore.getItemAsync('user')
        let valuePassword = await SecureStore.getItemAsync('password')
        if (valueUser !== null && valuePassword !== null) {
            this.props.navigation.navigate('Account')

        }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  login = () => {
    if (this.state.username.length === 0) {
        this.usernameInput.shake();
    } else if (this.state.password.length === 0) {
        this.passwordInput.shake();
    }
    else {
        let surname = this.state.username
        let pass = this.state.password
        let message = iconv.encode(surname, 'win1251')
        let messagePass = iconv.encode(pass, 'win1251')
        let URIstr = ''

        let URIstrPass = ''
        URIstr = ''
        message.forEach((i, item) => {
            URIstr += '%'+i.toString(16).toUpperCase()
        })
        messagePass.forEach((i, item) => {
          URIstrPass += '%'+i.toString(16)
      })

        let url = "https://student.psu.ru/pls/stu_cus_et/stu.login?p_username="+URIstr+"&p_password="+URIstrPass
        axios.get(url)
        .then(async (response) => {
            if (true || (response.headers['set-cookie'] !== undefined)) {
                await SecureStore.setItemAsync('user', this.state.username)
                await SecureStore.setItemAsync('password', this.state.password)
                await SecureStore.setItemAsync('session', response.headers['set-cookie'][0].split(';')[0].split('=')[1])
                // если чекбокс "сохранить" не стоял, то обнулить состояние для password

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'TabBar'})],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                Alert.alert(
                    'Ошибка!',
                    'Логин или пароль неверны, пожалуйста проверьте данные и попробуйте ещё через некоторое время, возможно ЕТИС заблокировал вход на пару минут.'
                )
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

  render() {
    const {
      isLoading,
      password,
      username,
    } = this.state;


      return (
        <SafeAreaView style={{flex: 1}}>
      <LinearGradient start={{ x: 0, y: 0.1 }}
        end={{ x: 0.1, y: 1 }} colors={['#cb2d3e', '#ef473a']}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={styles.formContainer}
          >
          <Image style={{width: 180, height: 180, marginBottom: '4%'}} source={require('../assets/logo_psu.png')}/>
            <View style={{ width: '100%', alignItems: 'center' , marginBottom: '4%'}}>
              <FormInput
                refInput={input => (this.usernameInput = input)}
                icon="user"
                value={username}
                onChangeText={username => this.setState({ username })}
                placeholder="Фамилия"
                returnKeyType="next"
              />
              <FormInput
                refInput={input => (this.passwordInput = input)}
                icon="lock"
                value={password}
                onChangeText={password => this.setState({ password })}
                placeholder="Пароль"
                secureTextEntry
                returnKeyType="next"
              />
            </View>
            <Button
              loading={isLoading}
              title="Войти"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              linearGradientProps={{
                colors: ['#ED213A', '#93291E'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              ViewComponent={LinearGradient}
              titleStyle={styles.signUpButtonText}
              onPress={this.login}
              disabled={isLoading}
            />
          </KeyboardAvoidingView>
        </ScrollView>
        </LinearGradient>
        </SafeAreaView>
      );

  }
}


export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={
        <Icon name={icon} type={'simple-line-icon'} color="#f8f8ff" size={18} />
      }
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#f8f8ff"
    />
  );
};

const styles = StyleSheet.create({
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
    fontSize: (SCREEN_WIDTH / 360) * 13,
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

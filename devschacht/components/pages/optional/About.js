import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Image, Text } from 'react-native-elements';
import * as Font from 'expo-font';
import {THEME} from '../../../const/index'
import AppHeader from '../../nav/AppHeader';
import Loading from '../../uikit/Loading';
import LinkCard from '../../uikit/LinkCard'

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
    }
  });

const aboutThis = `
Благодарю за всё. За тишину.
За свет звезды, что спорит с темнотою.
Благодарю за сына, за жену.
За музыку блатную за стеною.
За то благодарю, что скверный гость,
я всё-таки довольно сносно встречен.
И для плаща в прихожей вбили гвоздь.
И целый мир взвалили мне на плечи.
Благодарю за детские стихи.
Не за вниманье вовсе, за терпенье.
За осень. За ненастье. За грехи.
За неземное это сожаленье.
За бога и за ангелов его.
За то, что сердце верит, разум знает.
Благодарю за то, что ничего
подобного на свете не бывает.
За всё, за всё. За то, что не могу,
чужое горе помня, жить красиво.
Я перед жизнью в тягостном долгу.
И только смерть щедра и молчалива.
За всё, за всё. За мутную зарю.
За хлеб, за соль. Тепло родного крова.
За то, что я вас всех благодарю
за то, что вы не слышите ни слова.

(с) Борис Рыжий, 1974 - 2001`

export default class About extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          fontLoaded: false,
          counter: 0
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
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    secret = () => {
        this.setState((state) => {
            return {counter: state.counter + 1}
        })
        if (this.state.counter === 7) {
            this.setState({
               counter: 0
            })
            Alert.alert(
                'Внимание!',
                '<тут была пасхалка>'
            )
        }
    }

    render() {
        if (this.state.fontLoaded) {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.center}>
                        <AppHeader back='Account' title="О приложении" notify={false} />
                        <View style={styles.appInfoContainer}>
                            <TouchableOpacity onPress={() => this.secret()}>
                                <Image
                                source={require('../../../assets/logo_app.png')}
                                style={{ width: 150, height: 150, marginBottom: 10 }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                            </TouchableOpacity>
                            <Text style={styles.appInfoText}>Mobile ETiS</Text>
                            <Text style={styles.appInfoText}>Версия 0.1.4</Text>
                        </View>
                        <View style={styles.appInfoContainer}>
                        <ScrollView>
                            <Text style={{ textAlign: 'center', padding: 0, margin: 0 }}>
                                {aboutThis}
                            </Text>
                        </ScrollView>
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

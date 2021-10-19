import React from 'react';
import { StyleSheet, View, Text, StatusBar, SafeAreaView, AsyncStorage, Dimensions } from 'react-native';
import { Image, Header } from 'react-native-elements';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import Loading from './uikit/Loading'

const { width, height } = Dimensions.get('window');

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const styles = StyleSheet.create({
  mainContent: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: '20%'
  },
  image: {
    marginTop: '10%',
    width: 220,
    height: 220,
  },
  text: {
    fontFamily: 'Nunito-SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: (width / 360) * 15,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: (width / 360) * 20,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Встречай мобильную версию!',
    text:
      'Следи за своим расписанием, оценками и другой информацией из ЕТИСа через мобильное приложение.',
    colors: ['#63E2FF', '#B066FE'],
    source: 'http://vkclub.su/_data/stickers/lampovyy/sticker_vk_lampovyy_024.png'
  },
  {
    key: 'somethun1',
    title: 'Назначай дедлайны!',
    text:
      'Создавай дедлайны по учёбе для себя или своей группы, получай уведомления о сроках и оценках.',
    colors: ['#A3A1FF', '#3A3897'],
    source: 'http://vkclub.su/_data/stickers/diggy/sticker_vk_diggy_006.png'
  },
  {
    key: 'somethun2',
    title: 'Секретные фичи ЕТИСа!',
    text: 'Используй скрытые возможности ЕТИСа. Например, просмотр оценок своих одногруппников.',
    colors: ['#29ABE2', '#4F00BC'],
    source: 'http://vkclub.su/_data/stickers/zuck/sticker_vk_zuck_019.png'
  },
  {
    key: 'somethun3',
    title: 'Не пропускай ничего важного!',
    text: 'Получай уведомления от своих старост, а так же об оценках и изменении в расписании.',
    colors: ['#C33764', '#1D2671'],
    source: 'http://vkclub.su/_data/stickers/fil_i_ronni/sticker_vk_fil_i_ronni_003.png'
  },
  {
    key: 'somethun4',
    title: 'Начинай скорее!',
    text: 'Предупреждаем тебя, что это неофициальная версия ЕТИСа. Не весь возможный функционал присутствует в приложении.',
    colors: ['#ad5389', '#3c1053'],
    source: 'http://vkclub.su/_data/stickers/oleg_rabbit/sticker_vk_oleg_rabbit_000.png'
  },
];



export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          fontLoaded: false
        };
      }

      componentDidMount = async() => {
        await Font.loadAsync({
          'Nunito-SemiBold':require('./../assets/fonts/Nunito-SemiBold.ttf'),
          'Nunito-Bold':require('./../assets/fonts/Nunito-Bold.ttf'),
        })
        this.setState({ fontLoaded: true })
      }
    
  _renderItem = ({ item, dimensions }) => (
    <LinearGradient
      style={[
        styles.mainContent,
        dimensions,
      ]}
      colors={item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      
      <Image
        style={styles.image}
        source={{uri: item.source}} 
      />
      <View style={{flex: 1}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </LinearGradient>
  );


  render() {
    if (this.state.fontLoaded) {
      // SecureStore.setItemAsync('promo', 1) - просмотрено
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <AppIntroSlider nextLabel={'Дальше'}
        onDone={() => {
          SecureStore.setItemAsync('promo', 'true')
          this.props.navigation.navigate('Login')
        }}
        doneLabel={'Погнали!'}
        slides={slides}
        renderItem={this._renderItem}
        bottomButton />
      </View>
      );
    } else {
        return (
            <Loading />
        )
    }
  }
}

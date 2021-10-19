import  React from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LessonCardAccount from './LessonCardAccount';
import Carousel from 'react-native-snap-carousel';
import Loading from './Loading';
import { THEME } from '../../const';
import * as SecureStore from "expo-secure-store";

const { width, height } = Dimensions.get('window');


class AccountHeaderCard extends React.Component {

    _isMounted = false
    constructor(props) {
        super(props)
        this.state = {
            pairTime: {},
            timeLoaded: false,
            pair: false,
            pairNextData: {},
            bgImage: 'https://sun3-13.userapi.com/_Nex3BdMnSnmRnmvjvumootbGGIgEqf5wHLo7Q/G09VT7xuqDM.jpg',
            session: '',
            scheduleData: []
        }
    }

    getCurrentTime = () => {
        const d = new Date();
        const monthA = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
        return `${d.getDate()} ${monthA[d.getMonth()]}`
    }

    pairTimer = ()  => {
        let firstDate = `${new Date().getHours()}:${new Date().getMinutes()}`
        const pairTimes = [
            {
                start: '8:00',
                end: '9:35'
            },
            {
                start: '9:45',
                end: '11:20'
            },
            {
                start: '11:30',
                end: '13:05'
            },
            {
                start: '13:30',
                end: '15:05'
            },
            {
                start: '15:15',
                end: '16:50'
            },
            {
                start: '17:00',
                end: '18:30'
            },
            {
                start: '18:40',
                end: '20:15'
            },
            {
                start: '20:25',
                end: '22:00'
            },
        ]
        let finded = false
        let timeDates = []
        pairTimes.map((item, i) => {
            let secondDate = item.end
            let secondStartDate = item.start
            let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]); //получение даты из строки (подставляются часы и минуты
            let different = (getDate(secondDate) - getDate(firstDate));
            let differentStart = (getDate(secondStartDate) - getDate(firstDate));
            timeDates.push(differentStart)
            if (different >= 0 && differentStart <= 0) {
                let hours = Math.floor((different % 86400000) / 3600000);
                let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
                let result = hours * 60 + minutes;
                const pairTime = {
                    time: result,
                    num: i + 1
                }
                finded = true
                this.setState({
                    timeLoaded: true,
                    pairTime: pairTime,
                    pair: true,
                    pairNextData: {}
                })
            }
        })
        if (!finded) {
            let findedNext = false
            let indexNext = 0
            let pairNextData = {}
            let overZeroArray = []
            timeDates.map((item, i) => {
                if (item > 0) {
                    overZeroArray.push(item)
                }
            })

            if (overZeroArray.length === 0) {
                this.setState({
                    pair: false,
                    pairNextData:  {}
                })
            } else {
                const minNextPair = Math.min.apply(null, overZeroArray)
                findedNext = true
                pairNextData.time = minNextPair
                this.setState({
                    pair: false,
                    pairNextData: findedNext ? pairNextData : {}
                })
            }
        }
    }

    async componentDidMount() {
        this.pairTimer()
        this.interval = setInterval(() => this.pairTimer(), 60000)
        const mainImageBg = await SecureStore.getItemAsync('mainImageBg')
        mainImageBg ? this.setState({bgImage: mainImageBg}) : null
        this.setState({
            scheduleData: this.props.data
        })

    }

    async componentDidUpdate() {
        if (this.props.update) {
            const mainImageBg = await SecureStore.getItemAsync('mainImageBg')
            mainImageBg ? this.setState({bgImage: mainImageBg}) : null
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

      welcomeMessage = () => {
          const time = new Date().getHours()
          let welcomeMessage = ''
          switch(true) {
              case ((time >= 5) && (time < 12)): {
                  welcomeMessage = 'Доброе утро, '
                  break;
                }
                case ((time >= 12) && (time < 17)): {
                    welcomeMessage = 'Добрый день, '
                    break;
                }
                case ((time >= 17) && (time < 23)): {
                    welcomeMessage = 'Добрый вечер, '
                    break;
                }
                case ((time >= 23) || (time < 5)): {
                    welcomeMessage = 'Доброй ночи, '
                    break;
                }
                default:
                    welcomeMessage = 'Здравствуйте, '
                    break;
          }
          return welcomeMessage
      }

    getCurrenWeekDay = () => {
        const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
        return days[new Date().getDay()]
    }

    _renderItem = ({item, index}) => {
        return (
            <LessonCardAccount data={item} index={index} />
        );
    }

    getDaySchedule = () => {

        const schedule = this.props.data
        let dayIndex = new Date().getDay()

        dayIndex === 0 ? dayIndex = 0 : dayIndex--
        let daySchedule = schedule[dayIndex].pairs // fix

        return daySchedule
    }



    render() {
            return (
            <View style={styles.accountmenuContainer}>
                <ImageBackground style={styles.imgContainer} source={{uri: this.state.bgImage}}>
                    <View style={styles.cardContainer}>
                        <View style={styles.nameContainer}>
                            <View style={{marginRight: 'auto'}}>
                                <Text style={styles.welcomeText}>{this.welcomeMessage()}</Text>
                                <Text style={[styles.nameText, {fontSize: this.props.name ? (this.props.name.length > 10 ? (width / 360) * 30 : (width / 360) * 40) : null}]}>{this.props.name}</Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.dateText}>{`${this.getCurrentTime()},\n${this.getCurrenWeekDay()}`}</Text>
                            <View style={styles.pairTimeContainer}>
                                {this.state.pair ?
                                <View style={styles.leftCircleContainer}>
                                    <Text style={styles.pairNumberText}>{this.state.timeLoaded ? `${this.state.pairTime.num} пара` : '0 пара'}</Text>
                                    <Text style={styles.pairTimeText}>{`Осталось \n (мин.)`}</Text>
                                </View> : (this.state.pairNextData.time ?
                                <View style={styles.leftCircleContainer}>
                                    <Text style={styles.pairNumberText}>{`Следующая пара \nчерез ${this.state.pairNextData.time / (1000 * 60)} минут`}</Text>
                                </View> :
                                <View style={styles.leftCircleContainer}>
                                    <Text style={styles.pairNumberText}>Сейчас нет пары.</Text>
                                </View>
                                )
                                }
                                {this.state.pair ?
                                <ProgressCircle
                                    percent={this.state.pairTime.time ? (this.state.pairTime.time / 90 * 100) : 0}
                                    radius={(width / 360) * 35}
                                    borderWidth={(width / 360) * 4}
                                    color="#fff"
                                    bgColor="rgb(229, 111, 150)"
                                    shadowColor="#d4d4d4"
                                >
                                    <Text style={styles.circleText}>{this.state.timeLoaded ? this.state.pairTime.time : '0'}</Text>
                                </ProgressCircle>
                                : null}
                            </View>
                        </View>
                        <View style={styles.lessonsTodayContainer}>
                            {this.getDaySchedule().length === 0 ?
                                <View style={styles.emptyCard}>
                                    <Image
                                        source={{uri: 'http://vkclub.su/_data/stickers/study/sticker_vk_study_025.png'}}
                                        style={{width: 120, height: 120, marginBottom: 10}}
                                        PlaceholderContent={<ActivityIndicator color={THEME.PSU_MAIN_COLOR} />}
                                    />
                                    <Text style={styles.noPair}>Пар нет. Можно поспать ( ͡ᵔ ͜ʖ ͡ᵔ )</Text>
                                </View>
                            :
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.getDaySchedule()}
                                    renderItem={this._renderItem}
                                    sliderWidth={width * 0.82}
                                    itemWidth={width * 0.82}
                                />
                            }
                        </View>
                    </View>

                </ImageBackground>
            </View>
            )

    }
}

const styles = StyleSheet.create({
    emptyCard: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: (width / 360) * 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lessonsTodayContainer: {
        paddingTop: (width / 360) * 30,
        justifyContent: 'center'
    },
    cardContainer: {
        //height: (width / 360) * 360,
        paddingTop: (width / 360) * 30,
        paddingHorizontal: (width / 360) * 30
    },
    imgContainer: {
        height: '89%'
    },
    accountmenuContainer: {
        height: '60%'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    welcomeText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: (width / 360) * 20,
        color: '#fff'
    },
    nameText: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff'
    },
    nameContainer: {
        paddingVertical: (width / 360) * 30,
        flexDirection: 'row'
    },
    infoContainer: {
        paddingTop: (width / 360) * 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    dateText: {
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 16,
        color: '#fff',
        marginRight: 'auto'
    },
    circleText: {
        fontFamily: 'PTRoot-Bold',
        fontSize: (width / 360) * 25,
        color: '#fff'
    },
    pairTimeContainer: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftCircleContainer: {
        paddingRight: (width / 360) * 8
    },
    pairNumberText: {
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 18,
        color: '#fff',
        textAlign: 'right'
    },
    pairTimeText: {
        fontFamily: 'PTRoot-Medium',
        fontSize: (width / 360) * 10,
        color: '#fff',
        textAlign: 'right'
    }
})

export default AccountHeaderCard;

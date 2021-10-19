import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Text, Image, Header } from 'react-native-elements';
import AppHeader from '../nav/AppHeader';
import * as Font from 'expo-font';
import {THEME} from '../../const/index'
import Loading from '../uikit/Loading'
import Icon from 'react-native-vector-icons/Ionicons'
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars'
import DeadlinePageCard from '../uikit/DeadlinePageCard';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    calendarContainer: {
        borderRadius: 16
    },
    agendaContainer: {
        justifyContent: 'center',
        paddingHorizontal: width / 12,
        flex: 1,
        height: '100%',
        width: '100%',
        marginTop: height / 30,
        marginBottom: height / 60
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
      emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
      },
      card: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 25,
        alignItems: 'center'
    },
    cardEmpty: {
      fontFamily: 'Nunito-Bold',
      fontSize: (width / 360) * 12,
      color: THEME.TEXT_MEDIUM_DARK_COLOR,
      textAlign: 'center'
    }
  });




export default class Info extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          fontLoaded: false,
          active: false,
          items: {
            "2020-03-13": [
                {
                    text: 'Очень длинный текст не имеющий логического смысла, для того чтобы проверить как высота подстраивается сама под блок и потом это запушить и пойти попить чай',
                    time: '2020-03-13'
                }
            ],
            "2020-03-14": [],
            "2020-03-19": [
                {
                    text: 'Комиссия по дифурам',
                    time: '2020-03-19'
                }
            ],
            "2020-04-10": [
                {
                    text: 'Очень длинный текст не имеющий логического смысла, для того чтобы проверить как высота подстраивается сама под блок и потом это запушить и пойти попить чай',
                    time: '2020-04-10'
                },
                {
                    text: 'Релиз приложения',
                    time: '2020-04-10'
                }
            ],
            "2020-04-27": [
                {
                    text: 'Отчисление',
                    time: '2020-04-27'
                }
            ]
          }
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
            // to do
        })
        this.setState({ fontLoaded: true })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

      

    render() {
        LocaleConfig.locales['ru'] = {
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['янв.','февр.','март','апр.','май','июнь','июль.','авг.','сент.','окт.','нояб.','дек.'],
            dayNames: ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
            dayNamesShort: ['пн','вт','ср','чт','пт','сб','вс'],
            today: 'Сегодня'
          };
          LocaleConfig.defaultLocale = 'ru';
        
          const deadlines = {
            "2020-03-13": [
                {
                    text: 'Очень длинный текст не имеющий логического смысла, для того чтобы проверить как высота подстраивается сама под блок и потом это запушить и пойти попить чай',
                    time: '2020-03-13'
                }
            ],
            "2020-03-14": [],
            "2020-03-19": [
                {
                    text: 'Комиссия по дифурам',
                    time: '2020-03-19'
                }
            ],
            "2020-04-10": [
                {
                    text: 'Очень длинный текст не имеющий логического смысла, для того чтобы проверить как высота подстраивается сама под блок и потом это запушить и пойти попить чай',
                    time: '2020-04-10'
                },
                {
                    text: 'Релиз приложения',
                    time: '2020-04-10'
                }
            ],
            "2020-04-27": [
                {
                    text: 'Отчисление',
                    time: '2020-04-27'
                }
            ]
          }
        if (!this.state.active) {
          return (
            <View style={{flex: 1}}>
             <AppHeader title="Дедлайны" notify={true} />
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{height: 260, width: 240, backgroundColor: '#fff', borderRadius: 20}}>
                <Image 
                    source={{uri: 'http://vkclub.su/_data/stickers/zuck/sticker_vk_zuck_019.png'}}
                    style={{ width: 200, height: 200 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text style={styles.cardEmpty}>
                  {`Пока мы ещё работаем над этим разделом. \nЗаходите позже.`}
                </Text>
              </View>
              </View>
            </View>
          )
        }

        if (this.state.fontLoaded) {
            return (
                <View style={{flex: 1}}>
                    <AppHeader title="Дедлайны" notify={true} />
                    <View style={styles.agendaContainer}>
                        <Agenda
                            items={this.state.items}
                            selected={Date.now()}
                            renderItem={this.renderItem.bind(this)}
                            rowHasChanged={this.rowHasChanged.bind(this)}
                            style={styles.calendarContainer}
                            loadItemsForMonth={this.loadItems.bind(this)}
                            pastScrollRange={12}
                            onDayChange={(day)=>{console.log('day changed')}}
                            renderEmptyDate={() => {return (<Icon style={styles.card} onPress={() => console.log('123')} size={28} color="#849DB4" name="ios-add" />);}}
                            futureScrollRange={12}
                            renderEmptyData = {() => {return (<View />);}}
                            theme={{
                                backgroundColor: THEME.BACKGROUND_MAIN_COLOR,
                                calendarBackground: THEME.ADVANCED_GRAY_COLOR,
                                agendaKnobColor: THEME.DEFAULT_GRAY_BOLD_COLOR,
                                selectedDayBackgroundColor: THEME.ADVANCED_GRAY_COLOR,
                                selectedDayTextColor: '#000',
                                dotColor: THEME.PSU_MAIN_COLOR,
                                todayTextColor: THEME.CAROUSEL_DEFAULT_TEXT_COLOR,
                                dayTextColor: THEME.CAROUSEL_DEFAULT_TEXT_COLOR,
                                agendaTodayColor: '#849DB4',
                                agendaDayNumColor: '#849DB4',
                                textMonthFontFamily: 'TTCommons-Medium',
                                textDayFontFamily: 'TTCommons-Light',
                                textDayHeaderFontFamily: 'TTCommons-Medium',
                                textDayFontSize: (width / 360) * 15
                            }}
                        />
                    </View>
                </View>
            )
        }
        else {
            return (
                <Loading/>
            )
        }
    }

    loadItems(day) {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
            }
          }
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({
            items: newItems
          });
        }, 1000);
      }
    
      renderItem(item) {
        return (
            <DeadlinePageCard data={item} />
        );
      }
    
      renderEmptyDate() {
        return (
          <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
          </View>
        );
      }
    
      rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
      }
    
      timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      }
}
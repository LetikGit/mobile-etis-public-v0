import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Platform, Dimensions, FlatList, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { Text, Header } from 'react-native-elements'
import * as Font from 'expo-font';
import AppHeader from '../nav/AppHeader';
import Day from '../uikit/Day.js'
import {THEME} from '../../const/index'
import Loading from '../uikit/Loading'
import axios from 'axios'
import iconv from 'iconv-lite'
import { Buffer } from 'buffer';
import { CONFIG } from '../../const/request';
import * as SecureStore from "expo-secure-store";
import scheduleByWeek from "../functions/parsers/scheduleByWeek";
import schedule from "../functions/parsers/schedule";
global.Buffer = Buffer
const cheerio = require('react-native-cheerio')


const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
	timetable: {
      marginVertical: '2%',
    },
    footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 60,
		backgroundColor: '#fff'
    },
    formDroplist: {
        width: '100%',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    dayTitle: {
        fontFamily: 'TTCommons-DemiBold',
        fontSize: (width / 360) * 20,
        borderBottomWidth: 1,
        borderBottomColor: THEME.PSU_MAIN_COLOR,
        width: '80%',
        borderRadius: 1,
    },
    dayBlock: {
        // день блок
    },
    redline: {
        backgroundColor: THEME.PSU_MAIN_COLOR,
        width: 6,
        height: '100%',
        marginLeft: 20,
    },
    numLessonTitle: {
      fontFamily: 'TTCommons-DemiBold',
      fontSize: (width / 360) * 16,
    },
    audTitle: {
        fontFamily: 'TTCommons-DemiBold',
        fontSize: (width / 360) * 14,
        color: THEME.PSU_MAIN_COLOR,
        paddingLeft: 10,
    },
    teachTitle: {
        fontFamily: 'TTCommons-DemiBold',
        fontSize: (width / 360) * 14,
        paddingLeft: 10,
    },
    lessionTitle: {
        fontFamily: 'TTCommons-DemiBold',
        fontSize: (width / 360) * 18,
        width: '84%',
        paddingLeft: 10,
    },
    hr: {
        width: '72%',
        height: 1,
        marginHorizontal: '14%',
        backgroundColor: 'gray',
    },
    infoLesson: {
        width: '100%',
        borderLeftColor: THEME.PSU_MAIN_COLOR,
        borderLeftWidth: 6,
        minHeight: (width / 360) * 60,
        marginLeft: '7%'
    },
    lessionTitleOut: {
        fontFamily: 'TTCommons-DemiBold',
        fontSize: (width / 360) * 24,
        width: '84%',
        paddingLeft: 10,
    },
    headerContainer: {
            shadowRadius: 6,
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowColor: '#000',
            elevation: 6,
            backgroundColor: '#fff',
            marginTop: Platform.OS === 'ios' ? 10 : '-10%' // fix
    },
    slider: {
        marginTop: 5,
        overflow: 'visible', // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10, // for custom animation
    },
      carouselBlock: {
          marginTop: (width / 360) * 12,
          marginHorizontal: (width / 360) * 30,
          borderRadius: 16,
          paddingVertical: 10,
          paddingHorizontal: 14,
          backgroundColor: THEME.ADVANCED_GRAY_COLOR
      },
      carouselBlockMonth: {
        marginHorizontal: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.ADVANCED_GRAY_COLOR
      },
      carouselBlockWeek: {
        marginTop: 0,
        marginBottom: (width / 360) * 10,
        marginHorizontal: (width / 360) * 60,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.ADVANCED_GRAY_COLOR
      },
      itemDates: {
          marginHorizontal: 8,
          justifyContent: 'center',
          alignItems: 'center'
      },
      itemDatesDay: {
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
      },
      itemTextWeek: {
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'PTRoot-Regular',
          width: '100%',
          fontSize: (width / 360) * 18,
      },
      monthText: {
        fontFamily: 'PTRoot-Regular',
        fontSize: (width / 360) * 16,
        color: THEME.CAROUSEL_DEFAULT_TEXT_COLOR,
        textAlign: 'center'
      },
      itemTextDay: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'PTRoot-Regular',
        width: '100%',
        fontSize: (width / 360) * 14,
      },
      itemTextDates: {
          textAlign: 'center',
          color: '#fff',
          fontFamily: 'Nunito-Bold',
          fontSize: (width / 360) * 12
      }
  });




  class Carousel extends React.PureComponent {


    render() {
      return (
        <TouchableWithoutFeedback
            key={this.props.data.week}
            onPress={() => {
                this.props.onSelect(this.props.data.week)
            }}
        >
            <View style={[styles.itemDates]}>
                <Text style={[styles.itemTextWeek, {color: this.props.data.week === this.props.selected ? '#000' : THEME.CAROUSEL_DEFAULT_TEXT_COLOR}]}>{this.props.data.week}</Text>
            </View>
        </TouchableWithoutFeedback>
      )
    }
  }

  class CarouselDate extends React.PureComponent {

    render() {
      return (
        <TouchableWithoutFeedback
            key={this.props.data}
            onPress={() => {
                this.props.onSelect()
            }}
        >
            <View style={[styles.itemDatesDay]}>
                <Text style={[styles.itemTextDay, {color: this.props.index === this.props.selected ? '#000' : THEME.CAROUSEL_DEFAULT_TEXT_COLOR}]}>{this.props.data.split(' ')[0]}</Text>
                <Text style={[styles.itemTextWeek, {color: this.props.index === this.props.selected ? '#000' : THEME.CAROUSEL_DEFAULT_TEXT_COLOR}]}>{this.props.data.split(' ')[1]}</Text>
            </View>
        </TouchableWithoutFeedback>
      )
    }
  }


export default class Timetable extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
          selected: "1",
          fontLoaded: false,
          scheduleData: [],
          dataLoaded: false,
          bgColor: '#194693',
          dataUpdating: false,
          week_periods: {},
          selectedItem: {},
          selectedItemDay: new Date().getDay() === 0 ? 0 : new Date().getDay() - 1,
          session: ''
        }
      }
      onValueChange(value) {
        this.setState({
            selectedItem: value
        })
      }

    parseData = async (weekIndex) => {
        this.state.dataUpdating = true

        let session = this.state.session
        let surname = await SecureStore.getItemAsync('user')
        let pass = await SecureStore.getItemAsync('password')

        
        const { scheduleData, week_periods, selectedItem } = await scheduleByWeek(session, weekIndex);

        this.setState({
                    scheduleData: scheduleData,
                    week_periods: week_periods,
                    selectedItem: selectedItem,
                    dataUpdating: false
        })
    }

    componentDidMount = async() => {
        this._isMounted = true;
        await Font.loadAsync({
            'Nunito-Bold':require('../../assets/fonts/Nunito-Bold.ttf'),
            'Nunito-SemiBold':require('../../assets/fonts/Nunito-SemiBold.ttf'),
            'PTRoot-Regular':require('../../assets/fonts/PT-Root-UI_Regular.otf'),
            'StyreneAWeb-Medium':require('../../assets/fonts/Exo2-SemiBold.ttf'),
            'StyreneAWeb-Regular':require('../../assets/fonts/Exo-Medium.ttf'),
        })
        this.setState({ fontLoaded: true })

        let session = await SecureStore.getItemAsync('session')
        let surname = await SecureStore.getItemAsync('user')
        let pass = await SecureStore.getItemAsync('password')


        
        this.setState({
            session: session
        })

        const { scheduleData, week_periods, selectedItem } = await schedule(session);

        this.setState({
                    scheduleData: scheduleData,
                    week_periods: week_periods,
                    selectedItem: selectedItem,
                    dataLoaded: true
                })

    }

    componentWillUnmount() {
        this._isMounted = false;
      }

      _keyExtractor = (item) => {
        return item.week.toString()
      }

      _keyExtractorWeek = (item) => {
          return item.toString()
      }



    getMonthString = (start) => {
        const newStart = start.split('.')
        let monthString = ''
        switch(newStart[1]) {
            case '01':
                monthString = 'январь'
                break;
            case '02':
                monthString = 'февраль'
                break;
            case '03':
                monthString = 'март'
                break;
            case '04':
                monthString = 'апрель'
                break;
            case '05':
                monthString = 'май'
                break;
            case '06':
                monthString = 'июнь'
                break;
            case '07':
                monthString = 'июль'
                break;
            case '08':
                monthString = 'август'
                break;
            case '09':
                monthString = 'сентябрь'
                break;
            case '10':
                monthString = 'октябрь'
                break;
            case '11':
                monthString = 'ноябрь'
                break;
            case '12':
                monthString = 'декабрь'
                break;
        }
        return monthString
    }

    stringWeek = (start) => {
        let data = []
        const newStart = start.split('.')
        let startTime = new Date(`${new Date().getFullYear()}-${newStart[1]}-${newStart[0]}`)
        for (let i = 0; i < 6; i++) {
            let day = new Date()
            let newDay = startTime.getDate()
            day.setDate(newDay + i)
            let dayStr = ''
            switch(i) {
                case 0:
                    dayStr = 'пн'
                    break;
                case 1:
                    dayStr = 'вт'
                    break;
                case 2:
                    dayStr = 'ср'
                    break;
                case 3:
                    dayStr = 'чт'
                    break;
                case 4:
                    dayStr = 'пт'
                    break;
                case 5:
                    dayStr = 'сб'
                    break;
                case 6:
                    dayStr = 'вс'
                    break;
            }
            data.push(dayStr + ' ' + day.getDate())
        }
        return data
    }

      _renderItem = ({ item }) => (
          <Carousel
            data={item}
            selected={this.state.selectedItem.week}
            onSelect={() => {
                this.parseData(item.week)
            }}
          />
    )

    _renderItemWeek = ({ item, index }) => (
        <CarouselDate
          data={this.stringWeek(this.state.selectedItem.start)[index]}
          selected={this.state.selectedItemDay}
          index={index}
          onSelect={() => {
              this.setState({
                selectedItemDay: index
              })
          }}
        />
  )

    render() {


        const datesInfo = this.state.week_periods
        if ((this.state.fontLoaded) && (this.state.dataLoaded)) {
            return (
                <View>
                    <AppHeader title="Расписание" notify={true} />
                    <ScrollView
                        contentContainerStyle={{
                            paddingBottom: '20%'
                        }}
                    >
                        <View style={styles.carouselBlock}>
                            <ScrollView
                                horizontal //scrolling left to right instead of top to bottom
                                showsHorizontalScrollIndicator={false} //hides native scrollbar
                                scrollEventThrottle={8} //how often we update the position of the indicator bar
                            >

                                <FlatList
                                    horizontal={true}
                                    data={datesInfo}
                                    extraData={this.state.selectedItem}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this._renderItem}
                                />
                            </ScrollView>
                        </View>
                        <View style={styles.carouselBlockMonth}>
                            <Text style={styles.monthText}>{this.getMonthString(this.state.selectedItem.start)}</Text>
                        </View>
                        <View style={styles.carouselBlockWeek}>
                            <ScrollView
                                horizontal //scrolling left to right instead of top to bottom
                                showsHorizontalScrollIndicator={false} //hides native scrollbar
                                scrollEventThrottle={8} //how often we update the position of the indicator bar
                            >

                                <FlatList
                                    horizontal={true}
                                    data={this.stringWeek(this.state.selectedItem.start)}
                                    extraData={this.state.selectedItem}
                                    keyExtractor={this._keyExtractorWeek}
                                    renderItem={this._renderItemWeek}
                                />
                            </ScrollView>
                        </View>
                        <View style={styles.timetable}>
                            {
                                this.state.dataUpdating ? <ActivityIndicator size="large" color={THEME.PSU_MAIN_COLOR} />
                                : <Day dayInfo={this.state.scheduleData[this.state.selectedItemDay]} />
                            }
                        </View>
                    </ScrollView>
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

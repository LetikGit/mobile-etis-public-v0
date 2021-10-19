import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, ActivityIndicator, ScrollView, AsyncStorage, FlatList, Linking, Dimensions, ImageBackground, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import iconv from 'iconv-lite'
import axios from 'axios'
import { Buffer } from 'buffer';
import * as Font from 'expo-font';
import { THEME } from '../../const/index'
import Loading from '../uikit/Loading'
import AccountHeaderCard from '../uikit/AccountHeaderCard'
import DeadlineCard from '../uikit/DeadlineCard'
import AccountMenu from '../uikit/AccountMenu'
import { CONFIG } from '../../const/request';
import LessonCardAccount from '../uikit/LessonCardAccount';
import account from "../functions/parsers/account";
global.Buffer = Buffer
const cheerio = require('react-native-cheerio')
import * as SecureStorage from "expo-secure-store";
import * as SecureStore from "expo-secure-store";
import schedule from "../functions/parsers/schedule";


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    lessonsToday: {
        backgroundColor: '#fff',
        paddingHorizontal: (width / 360) * 30
    },
    dedlinesMsg: {
        fontFamily: 'Nunito-Bold',
        color: THEME.DEFAULT_GRAY_COLOR
    },
    adver: {
        color: '#fff',
        fontFamily: 'Days',
        fontSize: (width / 360) * 14,
        textAlign: 'center'
    },
	center: {
      flex: 1,
      backgroundColor: THEME.BACKGROUND_MAIN_COLOR
    },
    accountHeader: {
        marginTop: '10%',
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 24,
        textAlign: 'center',
    },
    accountInfoName: {
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 20,
    },
    accountInfoRow: {
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 18,
        marginHorizontal: '8%'
    },
    deadlineContainer: {
        paddingHorizontal: (width / 360) * 30
    },
    myDeadlines: {
        marginVertical: (width / 360) * 16,
        color: '#808080',
        fontFamily: 'Days',
        fontSize: (width / 360) * 16,
    },
    buttonList: {
        paddingHorizontal: (width / 360) * 30,

    }
  });


export default class Account extends React.Component {

    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
          fontLoaded: false,
          pushMarks: false,
          pushKT: false,
          dataLoaded: false,
          studentData: {},
          session: '',
          isRefreshing: false,
          scheduleData: []
        };
      }




    async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            let valueUser = await SecureStore.getItemAsync('user')
            let valuePassword = await SecureStore.getItemAsync('password')
            if (valueUser === null || valuePassword === null) {
                this.props.navigation.navigate('Login')

            }
            await Font.loadAsync({
                'PTRoot-Bold':require('../../assets/fonts/PT-Root-UI_Bold.otf'),
                'PTRoot-Medium':require('../../assets/fonts/PT-Root-UI_Medium.otf'),
                'Nunito-Bold':require('../../assets/fonts/Nunito-Bold.ttf'),
                'Exo-Regular':require('../../assets/fonts/Exo-Regular.ttf'),
                'Exo-Bold':require('../../assets/fonts/Exo-Bold.ttf'),
                'Exo-SemiBold':require('../../assets/fonts/Exo-SemiBold.ttf'),
                'Exo2-SemiBold':require('../../assets/fonts/Exo2-SemiBold.ttf'),
                'Exo2-Bold':require('../../assets/fonts/Exo2-Bold.ttf'),
                'Exo2-Medium':require('../../assets/fonts/Exo2-Medium.ttf'),
                'Nunito-Light':require('../../assets/fonts/Nunito-Light.ttf'),
                'Nunito-SemiBold':require('../../assets/fonts/Nunito-SemiBold.ttf'),
                'Days':require('../../assets/fonts/Days.otf'),
                'Montserrat-Medium':require('../../assets/fonts/Montserrat-Medium.ttf'),
                'Montserrat-Bold':require('../../assets/fonts/Montserrat-Bold.ttf'),
            })
            this.setState({ fontLoaded: true })

            let session = await SecureStorage.getItemAsync('session')
            let surname = await SecureStorage.getItemAsync('user')
            let pass = await SecureStorage.getItemAsync('password')

            this.setState({
                session: session
            })

            
            const studentData = await account(session);
            const { scheduleData } = await schedule(session);

            this.setState({
                studentData: studentData,
                scheduleData: scheduleData,
                dataLoaded: true
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

      _keyExtractor = (item) => {
        return item.id.toString()
      }

      checkTime = (time) => {
        const now = Date.now()
        const timeFromData = new Date(time).getTime()
        if ((now + 5 * (1000 * 3600 * 24)) < timeFromData)
            return THEME.BG_GOOD_COLOR
        else
            return THEME.BG_BAD_COLOR
    }


      _renderItem = ({ item }) => (
        <DeadlineCard data={item} />
    )

    onRefresh = () => {
        this.setState({ isRefreshing: true }, () => {
            this.setState({ isRefreshing: false })
        })
    }


    render() {

    if (this.state.fontLoaded && this.state.dataLoaded) {
        return (
            <View style={styles.center}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                >
                    <AccountHeaderCard
                        update={this.state.isRefreshing}
                        data={this.state.scheduleData}
                        name={this.state.studentData.fullname.split(" ")[1]}
                    />
                    <AccountMenu
                        studentData={this.state.studentData}
                    />
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

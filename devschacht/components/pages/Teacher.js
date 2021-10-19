import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {THEME} from '../../const/index'
import AppHeader from '../nav/AppHeader';
import Loading from '../uikit/Loading';
import TeacherItem from '../uikit/TeacherItem'
import axios from 'axios'
import iconv from 'iconv-lite'
import { Buffer } from 'buffer';
import { CONFIG } from '../../const/request';
import * as SecureStore from "expo-secure-store";
import teachers from "../functions/parsers/teachers";
global.Buffer = Buffer
const cheerio = require('react-native-cheerio')

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	center: {
      flex: 1,
    }
  });


export default class Info extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          fontLoaded: false,
          dataLoaded: false,
          teachers: [],
          session: ''
        };
      }


    async componentDidMount() {
        this._isMounted = true;
        await Font.loadAsync({
            'Nunito-Bold':require('../../assets/fonts/Nunito-Bold.ttf'),
            'Nunito-Light':require('../../assets/fonts/Nunito-Light.ttf'),
            'Nunito-SemiBold':require('../../assets/fonts/Nunito-SemiBold.ttf'),
        })
        this.setState({ fontLoaded: true })

        let session = await SecureStore.getItemAsync('session')
        let surname = await SecureStore.getItemAsync('user')
        let pass = await SecureStore.getItemAsync('password')

        this.setState({
            session: session
        })

        
        const teachersList = await teachers(session);
        this.setState({
            teachers: teachersList,
            dataLoaded: true
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    render() {
        if (this.state.fontLoaded && this.state.dataLoaded) {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.center}>
                        <AppHeader title="Преподаватели" notify={false} />
                        <ScrollView>
                        {
                            this.state.teachers.map((l, i) => (
                                <TeacherItem
                                    key={i}
                                    name={l.name}
                                    discipline={l.discipline}
                                    cafedra={l.cafedra}
                                    avatar={l.avatar_url}
                                />
                            ))
                        }
                        </ScrollView>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.center}>
                        <AppHeader title="Преподаватели" notify={false} />
                        <Loading />
                    </View>
                </View>
            )
        }
    }
}

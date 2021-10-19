import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Dimensions, AsyncStorage, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Text, Header } from 'react-native-elements';
import * as Font from 'expo-font';
import AppHeader from '../nav/AppHeader'
import MarkBlock from '../uikit/MarkBlock.js'
import {THEME} from '../../const/index'
import Loading from '../uikit/Loading';
import axios from 'axios'
import iconv from 'iconv-lite'
import { Buffer } from 'buffer';
import { CONFIG } from '../../const/request';
import * as SecureStore from "expo-secure-store";
import marksByTrim from "../functions/parsers/marksByTrim";
import sessionMarks from "../functions/parsers/sessionMarks";
global.Buffer = Buffer
const cheerio = require('react-native-cheerio')

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    markstable: {
      marginHorizontal: '4%',
      marginVertical: '4%',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    carouselBlock: {
        marginTop: (width / 360) * 20,
        marginBottom: (width / 360) * 10,
        marginHorizontal: (width / 360) * 45,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 14,
        backgroundColor: THEME.ADVANCED_GRAY_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDates: {
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
    }
  });

  class Carousel extends React.PureComponent {


    render() {
      return (
        <TouchableWithoutFeedback
            key={this.props.data}
            onPress={() => {
                this.props.onSelect(this.props.data)
            }}
        >
            <View style={[styles.itemDates]}>
                <Text style={[styles.itemTextWeek, {color: this.props.data === this.props.selected ? '#000' : THEME.CAROUSEL_DEFAULT_TEXT_COLOR}]}>{this.props.data}</Text>
            </View>
        </TouchableWithoutFeedback>
      )
    }
  }

export default class Marks extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
          selected: 1,
          fontLoaded: false,
          data: [],
          dataLoaded: false,
          selectedItem: 1,
          trimCount: [],
          sessionMarks: [],
          dataUpdating: false,
          session: ''
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
            'Nunito-Bold':require('../../assets/fonts/Nunito-Bold.ttf'),
            'Nunito-SemiBold':require('../../assets/fonts/Nunito-SemiBold.ttf'),
            'PTRoot-Regular':require('../../assets/fonts/PT-Root-UI_Regular.otf'),
        })
        this.setState({ fontLoaded: true })

        let session = await SecureStore.getItemAsync('session')
        let surname = await SecureStore.getItemAsync('user')
        let pass = await SecureStore.getItemAsync('password')

        this.setState({
            session: session
        })

          
        const { trimCount, sessionMarksList } = await sessionMarks(session);

          const marksBySelectedTrim = await marksByTrim(session, 1);

          const cp = sessionMarksList[0].data.map((item) => {
              const control = marksBySelectedTrim.filter(x => x.name === item.name)[0].marks
              return {
                  ...item,
                  control: control
              }
          })

          const newData = [...sessionMarksList]
          newData[0].data = cp;

        this.setState({
            data: newData,
            trimCount: trimCount,
            dataLoaded: true
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
      }


      _keyExtractor = (item, index) => {
        return (index + 1).toString()
      }

      updateData = async () => {
        // оценки за КТ
        this.setState({
            dataUpdating: true
        })

        let session = this.state.session
        let surname = await SecureStore.getItemAsync('user')
        let pass = await SecureStore.getItemAsync('password')

        
        const marksBySelectedTrim = await marksByTrim(session, this.state.selectedItem);

        const cp = this.state.data[this.state.selectedItem - 1].data.map((item) => {
            const control = marksBySelectedTrim.filter(x => x.name === item.name)[0].marks
            return {
                ...item,
                control: control
            }
        })

        const newData = [...this.state.data]
        newData[this.state.selectedItem - 1].data = cp;

        this.setState({
            data: newData,
            dataUpdating: false
        })
      }




      _renderItem = ({ item, index }) => (
          <Carousel
            data={index + 1}
            selected={this.state.selectedItem}
            onSelect={() => {
                this.setState({selectedItem: index + 1}, () => this.updateData())
            }}
          />
    )

    render() {


    if ((this.state.fontLoaded) && (this.state.dataLoaded)) {
        return (
		<View style={{flex: 1}}>
            <AppHeader title="Оценки" notify={true} />

                    <View style={styles.carouselBlock}>
                            <ScrollView
                                horizontal //scrolling left to right instead of top to bottom
                                showsHorizontalScrollIndicator={false} //hides native scrollbar
                                scrollEventThrottle={8} //how often we update the position of the indicator bar
                            >
                                <FlatList
                                    horizontal={true}
                                    data={new Array(this.state.trimCount)}
                                    extraData={this.state.selectedItem}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this._renderItem}
                                />
                            </ScrollView>
                    </View>
                    <ScrollView>
                    {this.state.dataUpdating ?  <ActivityIndicator size="large" color={THEME.PSU_MAIN_COLOR} /> : (
                        <View style={styles.markstable}>
                        {
                            this.state.data[this.state.selectedItem - 1].data.map(item => (
                                <MarkBlock data={item} key={item.name} />
                            ))
                        }
                        </View>
                    )
                    }
                </ScrollView>
		</View>
        )
    }
    else {
        return(
            <Loading />
        )
    }
    }
}

import React, {useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Linking, Dimensions, BackHandler } from 'react-native';
import { Image, Text } from 'react-native-elements';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    card: {
        width: '100%',
        marginBottom: width * 0.04,
        borderRadius: 20,
        padding: (width / 360) * 17,
        flexDirection: 'row',
    },
    marksTable: {
        marginHorizontal: '4%',
        marginVertical: '4%',
    },
    deadlineText: {
        color: THEME.TEXT_MEDIUM_DARK_COLOR,
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 12
    },
    deadlineTextContainer: {
        paddingTop: (width / 360) * 12,
    },
    deadlineTime: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: (width / 360) * 10,
        color: THEME.TEXT_LIGHT_DARK_COLOR,
    },
    deadlineTimeContaienr: {
        flexDirection: 'column'
    },
    reddot: {
        borderRadius: 20,
        width: (width / 360) * 5,
        height: (width / 360) * 5,
        marginRight: (width / 360) * 5
    },
    bluedot: {
        borderRadius: 20,
        width: (width / 360) * 5,
        height: (width / 360) * 5,
        marginRight: (width / 360) * 5,
        backgroundColor: THEME.LIGHTBLUE_DOT
    },
    dataContainer: {
        width: '90%'
    },
    iconContainer: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    markItem: {
        flexDirection: 'row',
        alignItems: 'center'
    }
  });

const parseMarkColor = (mark) => {
    if (mark.now === '') {
        return '#fff'
    }
    else if (Number(mark.now) >= Number(mark.min)) {
        return THEME.BG_GOOD_COLOR
    }
    else {
        return THEME.BG_BAD_COLOR
    }
}

const parseDotColor = (mark) => {
    if (mark.now === '') {
        return '#c4c4c4'
    }
    else if (Number(mark.now) >= Number(mark.min)) {
        return THEME.GREEN_DOT
    }
    else {
        return THEME.RED_DOT
    }
}

function ControlMarks({ route, navigation }) {

    const { data } = route.params




    return (
                <View style={{flex: 1}}>
                    <View style={styles.center}>
                        <AppHeader back='Marks' title="Контрольные" notify={false} />
                        <ScrollView>
                        <View style={styles.marksTable}>
                        {
                            data.map(item => (
                                <View key={item.name} style={[styles.card, {backgroundColor: parseMarkColor(item)}]}>
                                    <View style={styles.dataContainer}>
                                        <View style={styles.deadlineTimeContaienr}>
                                            <View style={styles.markItem}>
                                                <View style={[styles.reddot, {backgroundColor: parseDotColor(item)}]} />
                                                <Text style={styles.deadlineTime}>{`${item.now === '' ? '-' : item.now} / ${item.max} баллов`}</Text>
                                            </View>
                                            <View style={styles.markItem}>
                                                <View style={styles.bluedot} />
                                                <Text style={styles.deadlineTime}>{`${item.min} баллов (проходной)`}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.deadlineTextContainer}>
                                            <Text style={styles.deadlineText}>{item.name}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                        </View>
                        </ScrollView>
                    </View>
                </View>
    )
}

export default ControlMarks

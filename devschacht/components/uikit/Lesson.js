import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {THEME} from '../../const/index'
import Icon from 'react-native-vector-icons/MaterialIcons'



function pairType(pair) {
    let type = pair.split(/[\(s+)]/)
    const shortData = type[type.length - 2] ? type[type.length - 2].toLowerCase() : ''
    return shortData
}

function timeToDate(time) {
    var chunks = time.split(':');
    var date = new Date();
    date.setHours(Number(chunks[0]));
    date.setMinutes(Number(chunks[1]));

    return date;
}

function getColor(type) {
    let color = ''
    switch(type) {
        case 'лек':
            color = '#95CCFF'
            break;
        case 'лаб':
            color = '#A788FF'
            break;
        case 'практ':
            color = '#5ec463'
            break;
        default:
            color = THEME.PSU_MAIN_COLOR
            break;
    }
    return color
}

const Lesson = ({ pairInfo }) => (
        <View style={styles.container}>
                <View style={styles.timeContainer}>
                    <View style={[styles.leftAttachment, {backgroundColor: getColor(pairType(pairInfo.pair_dis))}]}></View>
                    <View style={{width: '100%'}}>
                        <Text style={styles.pairTime}>{pairInfo.pair_time}</Text>
                        <Text style={styles.pairType}>{pairType(pairInfo.pair_dis)}</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.lessionTitle}>{pairInfo.pair_dis}</Text>
                    <View style={styles.iconContainer}>
                        <Icon name="place" size={(width / 360) * 16} color={THEME.DEFAULT_GRAY_COLOR} />
                        <Text style={styles.audTitle}>{pairInfo.pair_aud}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="school" size={(width / 360) * 16} color={THEME.DEFAULT_GRAY_COLOR} />
                        <Text style={styles.audTitle}>{pairInfo.pair_teacher}</Text>
                    </View>
                </View>
        </View>
)

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    dataContainer: {
        backgroundColor: '#fff',
        padding: (width / 360) * 14,
        marginHorizontal: (width / 360) * 30,
        paddingHorizontal: (width / 360) * 14,
        borderRadius: 16,
        marginBottom: (width / 360) * 16,
        width: '68%'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginRight: 10
    },
    pairType: {
        color: '#656570',
        paddingHorizontal: 4,
        fontSize: (width / 360) * 14,
        fontFamily: 'StyreneAWeb-Regular',
        width: '100%'
    },
    pairTime: {
        color: THEME.TEXT_BOLD_BLACK_COLOR,
        fontFamily: 'StyreneAWeb-Medium',
        fontSize: (width / 360) * 14,
        paddingHorizontal: 6,
        
    },
    timeContainer: {
        width: '22%',
        flexDirection: 'row',
        marginRight: 'auto',
        flex: 1
    },
    container: {
        flexDirection: 'row'
    },
    numLessonTitle: {
        fontFamily: 'TTCommons-DemiBold',
        fontSize: (width / 360) * 16,
      },
    infoLesson: {
        width: '100%',
        borderLeftColor: THEME.PSU_MAIN_COLOR,
        borderLeftWidth: 2,
        minHeight: (width / 360) * 60,
        marginLeft: '7%'
    },
    lessionTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 13,
        color: THEME.TEXT_BOLD_BLACK_COLOR
    },
    audTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: (width / 360) * 12,
        color: THEME.DEFAULT_GRAY_COLOR,
        paddingLeft: 8,
        flexWrap: 'wrap'
    },
    teachTitle: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: (width / 360) * 12,
        paddingLeft: 8,
        color: THEME.DEFAULT_GRAY_COLOR
    },
    hrContainer: {
        marginVertical: 4,
        alignItems: 'center',
    },
    leftAttachment: {
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        width: width * 0.05,
        height: (width / 360) * 12,
        marginRight: '2%',
        marginTop: '10%'
    }
})

export default Lesson


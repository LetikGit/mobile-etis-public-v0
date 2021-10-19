import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {THEME} from '../../const/index'
import Icon from 'react-native-vector-icons/MaterialIcons'



const { width, height } = Dimensions.get('window');

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

function pairType(pair) {
    let type = pair.split(/[\(s+)]/)
    const shortData = type[type.length - 2] ? type[type.length - 2].toLowerCase() : ''
    return shortData
}

function calculatePairEndTime(start) {
    let CurrentTime = new Date();
    CurrentTime.setHours(start.split(":")[0], start.split(":")[1])
    CurrentTime.setMinutes(CurrentTime.getMinutes() + 90)
    const str = `${CurrentTime.getHours()}:${CurrentTime.getMinutes() === 0 ? '00' : CurrentTime.getMinutes()}`
    return str
}

const LessonCardAccount = ({ data }) => {


    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.timeText}>{`${data.pair_time} — ${calculatePairEndTime(data.pair_time)}`}</Text>
                <Text style={[styles.lecBadge, {backgroundColor: getColor(pairType(data.pair_dis))}]}>{pairType(data.pair_dis).toUpperCase()}</Text>
            </View>
            <View style={styles.dataContainer}>
                    <Text style={styles.lessionTitle}>{data.pair_dis}</Text>
                    <View style={styles.iconContainer}>
                        <Icon name="place" size={(width / 360) * 16} color={THEME.DEFAULT_GRAY_COLOR} />
                        <Text style={styles.audTitle}>{data.pair_aud}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="school" size={(width / 360) * 16} color={THEME.DEFAULT_GRAY_COLOR} />
                        <Text style={styles.audTitle}>{data.pair_teacher}</Text>
                    </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.pairNumber}>{data.pair_title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pairNumber: {
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        fontSize: (width / 360) * 12
    },
    footer: {
        marginTop: (width / 360) * 20
    },
    timeText: {
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        fontSize: (width / 360) * 16
    },
    dataContainer: {
        flexDirection: 'column',
        marginTop: (width / 360) * 10
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: (width / 360) * 16,
        flexDirection: 'column',
    },
    lecBadge: {
        fontFamily: 'Montserrat-Medium',
        letterSpacing: 0.05,
        borderRadius: 14,
        paddingVertical: (width / 360) * 8,
        paddingHorizontal: (width / 360) * 16,
        color: '#fff',
        fontSize: (width / 360) * 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
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

export default LessonCardAccount
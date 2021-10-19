import  React from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { Image } from 'react-native-elements'
import {THEME} from '../../const/index'

const { width, height } = Dimensions.get('window');

checkTime = (time) => {
    const now = Date.now()
    const timeFromData = new Date(time).getTime()
    if ((now + 5 * (1000 * 3600 * 24)) > timeFromData)
        return true
    else
        return false
}

lastDigitToWord = (digit) => {
    const lastFigure = parseInt(digit.toString().substr(digit.toString().length - 1, 1));
    if (digit >= 11 && digit < 15) {
      return 'дней';
    }
    else {
      if (lastFigure == 1) return 'день';
      if (lastFigure > 1 && lastFigure < 5) return 'дня';
      if (lastFigure == 0 || lastFigure >= 5) return 'дней';
    }
}

daysText = (time) => {
    const now = Date.now()
    const timeFromData = new Date(time).getTime()
    const daysLag = Math.ceil(Math.abs(now - timeFromData) / (1000 * 3600 * 24));
    return `${daysLag} ${lastDigitToWord(daysLag)}`
}

const DeadlineCard = ({ data }) => {
    return (
            <View style={[styles.card, {backgroundColor: checkTime(data.time) ? THEME.BG_BAD_COLOR : THEME.BG_GOOD_COLOR}]}>
                <View style={styles.deadlineTimeContaienr}>
                    <View style={[styles.reddot, {backgroundColor: checkTime(data.time) ? THEME.RED_DOT : THEME.GREEN_DOT}]} />
                    <Text style={styles.deadlineTime}>{daysText(data.time)}</Text>
                </View>
                <View style={styles.deadlineTextContainer}>
                    <Text style={styles.deadlineText}>{data.text.length > 40 ? data.text.slice(0, 50) + '...' : data.text}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: (width / 360) * 130,
        height: (width / 360) * 130,
        marginRight: (width / 360) * 28,
        borderRadius: 20,
        padding: (width / 360) * 10
    },
    deadlineText: {
        color: THEME.TEXT_MEDIUM_DARK_COLOR,
        fontFamily: 'TT-Wellingtons-DemiBold',
        fontSize: (width / 360) * 12
    },
    deadlineTextContainer: {
        paddingTop: (width / 360) * 12,
    },
    deadlineTime: {
        fontFamily: 'TTCommons-Medium',
        fontSize: (width / 360) * 12,
        color: THEME.TEXT_LIGHT_DARK_COLOR,
    },
    deadlineTimeContaienr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reddot: {
        borderRadius: 20,
        width: (width / 360) * 6,
        height: (width / 360) * 6,
        marginRight: (width / 360) * 6
    }
})

export default DeadlineCard
import React from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { THEME } from '../../const/index'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

    const parseMark = (mark) => {
        let markString = ''
        switch(mark) {
            case '5':
                markString = 'отлично'
                break;
            case '4':
                markString = 'хорошо'
                break;
            case '3':
                markString = 'удовлетворительно'
                break;
            case '2':
                markString = 'неудовлетворительно'
                break;
            default:
                markString = mark
        }
        return markString
    }

    const parseColorMark = (mark) => {
        let markColor = ''
        switch(mark) {
            case '5':
                markColor = THEME.BG_GOOD_COLOR
                break;
            case '4':
                markColor = THEME.BG_GOOD_COLOR
                break;
            case '3':
                markColor = THEME.LIGHTBLUE_COLOR
                break;
            case 'зачет':
                markColor = THEME.BG_GOOD_COLOR
                break;
            case '-':
                markColor = '#fff'
                break;
            default:
                markColor = THEME.BG_BAD_COLOR
        }
        return markColor
    }

    const parseDotMark = (mark) => {
        let dotColor = ''
        switch(mark) {
            case '5':
                dotColor = THEME.GREEN_DOT
                break;
            case '4':
                dotColor = THEME.GREEN_DOT
                break;
            case '3':
                dotColor = THEME.LIGHTBLUE_DOT
                break;
            case 'зачет':
                dotColor = THEME.GREEN_DOT
                break;
            case '-':
                dotColor = '#c4c4c4'
                break;
            default:
                dotColor = THEME.RED_DOT
        }
        return dotColor
    }

  function MarkBlock({ data }) {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('ControlMarks', {
                    data: data.control
                })
            }}
        >
            <View style={[styles.card, {backgroundColor: parseColorMark(data.mark)}]}>
                <View style={styles.dataContainer}>
                    <View style={styles.deadlineTimeContaienr}>
                        <View style={[styles.reddot, {backgroundColor: parseDotMark(data.mark)}]} />
                        <Text style={styles.deadlineTime}>{parseMark(data.mark)}</Text>
                    </View>
                    <View style={styles.disciplineTextContainer}>
                        <Text style={styles.disciplineText}>{data.name}</Text>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <Icon
                        name="chevron-right"
                        size={24}
                        color={THEME.LIGHT_GRAY_COLOR}
                        onPress={() => {
                            navigation.navigate('ControlMarks', {
                                data: data.control
                            })
                        }
                        }
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        marginBottom: width * 0.04,
        borderRadius: 20,
        padding: (width / 360) * 16,
        flexDirection: 'row',
    },
    disciplineText: {
        color: THEME.TEXT_MEDIUM_DARK_COLOR,
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 12
    },
    disciplineTextContainer: {
        paddingTop: (width / 360) * 12,
    },
    deadlineTime: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: (width / 360) * 11,
        color: THEME.TEXT_LIGHT_DARK_COLOR,
        lineHeight: (width / 360) * 14
    },
    deadlineTimeContaienr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reddot: {
        borderRadius: 20,
        width: (width / 360) * 5,
        height: (width / 360) * 5,
        marginRight: (width / 360) * 5
    },
    dataContainer: {
        width: '90%'
    },
    iconContainer: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default MarkBlock

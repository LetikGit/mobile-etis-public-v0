import  React from 'react'
import { View, StyleSheet, Dimensions, Linking, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import {THEME} from '../../const/index'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window');

const LinkCard = ({ title, subtitle, url, icon }) => {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(url)}>
                <View style={styles.cardContent}>
                    <Icon style={{paddingRight: 20}} name={icon} size={(width / 360) * 43} color='#4d7198' />
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: '10%',
        paddingVertical: 10
    },
    cardContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginRight: 'auto',
        padding: 10,
        flexDirection: 'row'
    },
    textTitle: {
        color: THEME.TEXT_BOLD_BLACK_COLOR,
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 16,
    },
    textSubtitle: {
        color: THEME.DEFAULT_GRAY_COLOR,
        fontFamily: 'Nunito-SemiBold',
        fontSize: (width / 360) * 14,
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 'auto',
        paddingRight: 20
    },
    subtitle: {
        color: THEME.DEFAULT_GRAY_COLOR,
        fontFamily: 'Nunito-SemiBold',
        fontSize: (width / 360) * 13,
    }
})

export default LinkCard
import React from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'

const { width, height } = Dimensions.get('window');

const HeaderText = ({ title, src }) => (
    <Text style={styles.default}>
        {title}
    </Text>
)

const styles = StyleSheet.create({
    default: {
        fontSize: (width / 360) * 20,
        color: '#fff'
    }
})

export default HeaderText

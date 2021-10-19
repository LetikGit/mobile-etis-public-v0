import React from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import {THEME} from '../../const/index'

const Loading = () => (
    <View style={{flex: 1}}>
        <View style={styles.center}>
            <ActivityIndicator size="large" color={THEME.PSU_MAIN_COLOR} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND_MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Tooltip, Image } from 'react-native-elements';
import { THEME } from '../../const/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Lesson from './Lesson'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    noPair: {
        fontFamily: 'Nunito-Bold',
        fontSize: (width / 360) * 14,
    },
    dayTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    noPairContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

const Day = ({ dayInfo }) => {
        return (
            <View style={styles.dayBlock}>
                {
                    dayInfo.pairCount == 0 ?
                        <View style={styles.noPairContainer}>
                            <Image
                                source={{uri: 'http://vkclub.su/_data/stickers/study/sticker_vk_study_025.png'}}
                                style={{width: 120, height: 120, marginBottom: 10}}
                                PlaceholderContent={<ActivityIndicator color={THEME.PSU_MAIN_COLOR} />}
                            />
                            <Text style={styles.noPair}>Пар нет. Можно поспать ( ͡ᵔ ͜ʖ ͡ᵔ )</Text>
                        </View>
                        : dayInfo.pairs.map((pairInfo, index) => {
                        return <Lesson key={dayInfo.title+pairInfo+pairInfo.pair_teacher+index} pairInfo={pairInfo} />
                    })
                }
            </View>
        )
}

export default Day

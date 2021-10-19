import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Easing, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import { THEME } from '../../const/index'

const colors = {
	active: THEME.PSU_MAIN_COLOR,
	default: '#595959'
}

const styles = StyleSheet.create({
    footer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: THEME.BACKGROUND_MAIN_COLOR,
	},
	pageContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
})

class IconToggle extends PureComponent {
    constructor(props, context) {
        super(props, context);

        const maxOpacity = 0.12;

        this.state = {
            maxOpacity,
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(maxOpacity),
        };

        this.renderRippleView = this.renderRippleView.bind(this);
        this.onPressedIn = this.onPressedIn.bind(this);
        this.onPressedOut = this.onPressedOut.bind(this);
    }
    onPressedIn() {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
		}).start();
		
    }
    onPressedOut() {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.state.scaleValue.setValue(0.01);
            this.state.opacityValue.setValue(this.state.maxOpacity);
        });
    }
    renderRippleView() {
        const { size, color } = this.props;
        const { scaleValue, opacityValue } = this.state;

		const rippleSize = size * 2;
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: rippleSize,
                    height: rippleSize,
                    borderRadius: rippleSize / 2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: color || 'black',
                }}
            />
        );
    }
    render() {
        const { name, size, color, type, route } = this.props;
        const containerSize = size * 2;
        const iconContainer = { width: containerSize, height: containerSize };
        return (
            <TouchableWithoutFeedback onPressIn={this.onPressedIn} onPress={route} onPressOut={this.onPressedOut}>
                <View style={[styles.iconContainer, iconContainer]}>
                    {this.renderRippleView()}
                    <View>
                        <Icon type={type} name={name} size={size} color={color} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
const AppFooter = ({ options }) => {

		exit = () => {
			SecureStore.setItemAsync('user', '')
			navigate('Login')
		}

		const { navigate } = useNavigation()

		color = function(options, icon) {
			if (options == icon) {
				return colors.active
			} else {
				return colors.default
			}
		}

		return (
			<View>
					<IconToggle
						type='material-icons'
						name='today'
						size={24}
						color={this.color(options, 'Timetable')}
						route={() => { navigate('Timetable') }}
						text={'Расписание'}
					/>
					<IconToggle
						type='material-icons'
						name='content-paste'
						size={24}
						color={this.color(options, 'Marks')}
						route={() => { navigate('Marks') }}
						text={'Оценки'}
					/>
					<IconToggle
						type='material-icons'
						name='schedule'
						size={24}
						color={this.color(options, 'Main')}
						route={() => { navigate('Main') }}
						text={'Главная'}
					/>
					<IconToggle
						type='material-icons'
						name='group'
						size={24}
						color={this.color(options, 'Teacher')}
						route={() => { navigate('Teacher') }}
						text={'Инфо'}
					/>
					<IconToggle
						type='material-icons'
						name='account-circle'
						size={24}
						color={this.color(options, 'Account')}
						route={() => { navigate('Account') }}
						text={'Аккаунт'}
					/>
				</View>
		)
}

export default AppFooter

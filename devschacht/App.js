import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AsyncStorage, Text, Dimensions, LogBox} from 'react-native'
import Login from './components/Login';
import Timetable from './components/pages/Timetable'
import Marks from './components/pages/Marks'
import Teacher from './components/pages/Teacher'
import Account from './components/pages/Account'
import Main from './components/pages/Main'
import Intro_v2 from './components/Intro_v2'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { THEME } from './const';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import store from './store'
import About from './components/pages/optional/About'
import Settings from './components/pages/optional/Settings'
import ControlMarks from './components/pages/optional/ControlMarks'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const getPropsByRoute = ({ name }, type ) => {
	let iconName, text;
	switch (name) {
		case 'Account':
			iconName = 'person-circle-outline'
			text = 'Профиль'
			break;
		case 'Marks':
			iconName = 'book-outline'
			text = 'Оценки'
			break;
		case 'Timetable':
			iconName = 'calendar-outline'
			text = 'Расписание'
			break;
		case 'Teacher':
			iconName = 'people-outline'
			text = 'Преподаватели'
			break;
	}

	if (type === 'icon') {
		return iconName
	}

	return text
}

function TabBar() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, size }) => {
					return <Ionicons
						name={getPropsByRoute(route, 'icon')}
						size={size}
						color={focused ? THEME.PSU_MAIN_COLOR : THEME.DEFAULT_GRAY_COLOR}
					/>;
				},
				tabBarLabel: getPropsByRoute(route, 'text'),
				tabBarActiveTintColor: THEME.PSU_MAIN_COLOR,
				tabBarInactiveTintColor: THEME.DEFAULT_GRAY_COLOR,
				headerShown: false
			})}
		>
			<Tab.Screen name="Timetable" component={Timetable} />
			<Tab.Screen name="Marks" component={Marks} />
			<Tab.Screen name="Teacher" component={Teacher} />
			<Tab.Screen name="Account" component={Account} />
		</Tab.Navigator>
	)
}

class App extends React.Component {

	_isMounted = false
	constructor(props) {
        super(props);
        this.state = {
		  isSeenPromo: false,
		  loaded: false
        };
      }

	  _loadInitialState = async () => {
			SecureStore.getItemAsync('promo').then((value) => {
				if (this._isMounted) {
					this.setState({
						isSeenPromo: value,
						loaded: true
					})
				}
			})
		}

	componentDidMount() {
		this._isMounted = true
		this._loadInitialState().done()
	}

	componentWillUnmount() {
		this._isMounted = false
	}



	render() {
	if (this._isMounted) {
		return (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false
					}}
				>
					<Stack.Screen name="TabBar" component={TabBar} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Settings" component={Settings} />
					<Stack.Screen name="Intro_v2" component={Intro_v2} />
					<Stack.Screen name="About" component={About} />
					<Stack.Screen name="ControlMarks" component={ControlMarks} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	} else {
		return (
			<Provider store={store}>
				<Text>

				</Text>
			</Provider>
		)
	}
	}
}

export default App

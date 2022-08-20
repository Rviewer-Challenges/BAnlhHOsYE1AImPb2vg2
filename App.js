import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './components/navigation-bar/navigation-bar';
import HomeScreen from './components/home-screen/home-screen';
import BookmarksScreen from './components/bookmarks-screen/bookmarks-screen';
import SettingsScreen from './components/settings-screen/settings-screen';

const horizontalAnimation = {
	cardStyleInterpolator: ({ current, layouts }) => {
		return {
			cardStyle: {
				transform: [
					{
						translateX: current.progress.interpolate({
							inputRange: [0, 1],
							outputRange: [layouts.screen.width, 0],
						}),
					},
				],
			},
		};
	},
};

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="Bookmarks"
					component={BookmarksScreen}
					options={horizontalAnimation}
				/>
				<Stack.Screen
					name="Settings"
					component={SettingsScreen}
					options={horizontalAnimation}
				/>
			</Stack.Navigator>
			<NavigationBar />
		</NavigationContainer>
	);
}

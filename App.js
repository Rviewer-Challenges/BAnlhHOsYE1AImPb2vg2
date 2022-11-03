import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/home-screen/home-screen';
import BookmarksScreen from './components/bookmarks-screen/bookmarks-screen';
import SettingsScreen from './components/settings-screen/settings-screen';
import { Text, View, useColorScheme } from 'react-native';
import NewsData from './utils/news-data';
import ItemScreen from './components/item-screen/item-screen';
import Settings from './utils/settings';
import DB_LOADED from './utils/db-sqlite-loaded';
import Themes from './utils/themes';
import CustomNavigationBar from './components/custom-navigation-bar/custom-navigation-bar';

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

// LOAD SETTINGS
const settings = new Settings();
settings.get().then((options) => {
	Themes.theme = options.theme;
});

//LOAD NEWS
DB_LOADED.init();
NewsData.init();

export default function App() {
	const systemTheme = useColorScheme();
	let [newsWasLoaded, setNewsWasLoaded] = useState(false);

	if (Themes.theme == 'automatic') {
		Themes.theme = systemTheme;
	}

	useEffect(() => {
		NewsData.newsItems
			.getAllItems()
			.then((news) => setNewsWasLoaded(true))
			.catch((error) => console.log(error));
	}, []);

	return newsWasLoaded ? (
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
				<Stack.Screen name="Item" component={ItemScreen} options={horizontalAnimation} />
			</Stack.Navigator>
			<CustomNavigationBar />
		</NavigationContainer>
	) : (
		<View>
			<Text>Cargando...</Text>
		</View>
	);
}

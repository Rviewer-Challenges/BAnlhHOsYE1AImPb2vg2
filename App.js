import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './components/navigation-bar/navigation-bar';
import HomeScreen from './components/home-screen/home-screen';
import BookmarksScreen from './components/bookmarks-screen/bookmarks-screen';
import SettingsScreen from './components/settings-screen/settings-screen';
import { Text, View } from 'react-native';
import DB_SQLite from './utils/db-sqlite';
import NewsItems from './utils/news-items';
import NewsData from './utils/news-data';
import ItemScreen from './components/item-screen/item-screen';
import downloaderRSS from './utils/downloader-rss';

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

const db = new DB_SQLite('data103.db');
const newsItems = new NewsItems(db);
newsItems.downloadRSS();

NewsData.newsItems = newsItems;

export default function App() {
	let [newsWasLoaded, setNewsWasLoaded] = useState(false);

	useEffect(() => {
		newsItems
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
			<NavigationBar />
		</NavigationContainer>
	) : (
		<View>
			<Text>Cargando...</Text>
		</View>
	);
}

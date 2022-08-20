import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import DB_SQLite from '../../utils/db-sqlite';
import NewsItems from '../../utils/news-items';
import FlatListSwipe from '../flatlist-swipe/flatlist-swipe';
import ListItem from '../list-item/list-item';

const db = new DB_SQLite('data22.db');
const newsItems = new NewsItems(db);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Constants.statusBarHeight,
	},
});

const HomeScreen = ({ navigation }) => {
	let [listItems, setListItems] = useState([]);

	useEffect(() => {
		newsItems
			.getAllItems()
			.then((news) => setListItems(news))
			.catch((error) => console.log(error));
	}, []);

	return (
		<View style={styles.container}>
			<FlatListSwipe
				data={listItems}
				renderItem={({ item }) => <ListItem {...item} newsItems={newsItems} />}
			/>
		</View>
	);
};

export default HomeScreen;

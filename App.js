import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './components/list-item/list-item';
import Constants from 'expo-constants';
import DB_SQLite from './utils/db-sqlite';
import downloaderRSS from './utils/downloader-rss';

const db = new DB_SQLite('data18.db');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Constants.statusBarHeight,
	},
});

export default function App() {
	let [listItems, setListItems] = useState([]);

	useEffect(() => {
		downloaderRSS(db)
			.then((news) => {
				console.log('TODAS LAS NOTICIAS');
				setListItems(news);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<View style={styles.container}>
			<FlatList data={listItems} renderItem={({ item }) => <ListItem {...item} />} />
		</View>
	);
}

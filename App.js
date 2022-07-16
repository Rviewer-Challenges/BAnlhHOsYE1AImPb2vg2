import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './components/list-item/list-item';
import { rsstojsonConvert } from './utils/rss-to-json';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import DB_SQLite from './utils/db-sqlite';

const db = new DB_SQLite('data07.db');

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
		db.execute(
			`CREATE TABLE IF NOT EXISTS news(
				id INTEGER PRIMARY KEY NOT NULL, 
				guid TEXT,
				title TEXT,
				pubDate TEXT,
				link TEXT,
				author TEXT,
				thumbnail TEXT,
				read BOOL,
				bookmark BOOL
			);`
		);

		fetch('http://feeds.weblogssl.com/xatakamx')
			.then((response) => response.text())
			.then((data) => {
				data = rsstojsonConvert(data);
				data.items.forEach((item) => {
					console.log(item);
					db.execute(
						'INSERT INTO news (guid, title, pubDate, link, author, thumbnail, read, bookmark) values (?, ?, ?, ?, ?, ?, 0, 0)',
						[
							item.guid,
							item.title,
							item.pubDate,
							item.link,
							item.author,
							item.thumbnail,
						]
					);
				});
				setListItems(data.items);
			});
	}, []);

	db.select(
		'SELECT * FROM news',
		[],
		(rows) => console.log('DEVUELTO 8', JSON.stringify(rows)),
		(error) => console.log(error)
	);

	return (
		<View style={styles.container}>
			<FlatList data={listItems} renderItem={({ item }) => <ListItem {...item} />} />
		</View>
	);
}

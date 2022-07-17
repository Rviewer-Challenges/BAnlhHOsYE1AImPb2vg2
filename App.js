import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './components/list-item/list-item';
import { rsstojsonConvert } from './utils/rss-to-json';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import DB_SQLite from './utils/db-sqlite';
import ProvidersController from './controllers/providers-controller';
import NewsController from './controllers/news-controller';

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
		const providersController = new ProvidersController(db);
		const newsController = new NewsController(db);

		fetch('http://feeds.weblogssl.com/xatakamx')
			.then((response) => response.text())
			.then((data) => {
				data = rsstojsonConvert(data);

				data.url = 'http://feeds.weblogssl.com/xatakamx';
				providersController
					.register(data)
					.then((providerId) => {
						console.log({ providerId });

						data.items.map((item) => {
							item.providerId = providerId;
							return item;
						});

						return newsController.register(data.items);
					})
					.then(() => newsController.getAll())
					.then((news) => {
						//console.log(news);
						setListItems(news);
					})
					.catch((error) => console.log(error));
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList data={listItems} renderItem={({ item }) => <ListItem {...item} />} />
		</View>
	);
}

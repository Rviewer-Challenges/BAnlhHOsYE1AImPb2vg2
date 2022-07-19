import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './components/list-item/list-item';
import Constants from 'expo-constants';
import DB_SQLite from './utils/db-sqlite';
import downloaderRSS from './utils/downloader-rss';
import { getTimeFromDate } from './utils/custom-date';
import NewsController from './controllers/news-controller';

const db = new DB_SQLite('data19.db');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Constants.statusBarHeight,
	},
});

export default function App() {
	const downloadRSS = () => {
		clearTimeout(timerDownloadRSS);

		downloaderRSS(db)
			.then((news) => {
			  console.log('Obteniendo automaticamente')
			  
				setListItems(news);
				
				timerDownloadRSS = setTimeout(() => {
					downloadRSS();
				}, 60000);
				
			})
			.catch((error) => console.log(error));
	};
	let timerDownloadRSS;

	let [listItems, setListItems] = useState([]);

	useEffect(() => {
	  const newsController = new NewsController(db);

		newsController
			.getAll()
			.then((news) => {
			  console.log('Obteniendo al inicio');
			  setListItems(news);
			  downloadRSS();
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<View style={styles.container}>
			<FlatList data={listItems} renderItem={({ item }) => <ListItem {...item} />} />
		</View>
	);
}

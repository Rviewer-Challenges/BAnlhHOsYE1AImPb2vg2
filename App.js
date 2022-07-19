import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './components/list-item/list-item';
import Constants from 'expo-constants';
import DB_SQLite from './utils/db-sqlite';
import downloaderRSS from './utils/downloader-rss';
import { getTimeFromDate } from './utils/custom-date';

const db = new DB_SQLite('data18.db');

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
				news.sort((a, b) => getTimeFromDate(b.pubDate) - getTimeFromDate(a.pubDate));
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
		downloadRSS();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList data={listItems} renderItem={({ item }) => <ListItem {...item} />} />
		</View>
	);
}

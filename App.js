import { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, PanResponder } from 'react-native';
import ListItem from './components/list-item/list-item';
import Constants from 'expo-constants';
import DB_SQLite from './utils/db-sqlite';
import downloaderRSS from './utils/downloader-rss';
import { getTimeFromDate } from './utils/custom-date';
import NewsController from './controllers/news-controller';

const db = new DB_SQLite('data22.db');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Constants.statusBarHeight,
	},
});

export default function App() {
	const newsController = new NewsController(db);
	const downloadRSS = () => {
		clearTimeout(timerDownloadRSS);

		downloaderRSS(db)
			.then((news) => {
				console.log('Obteniendo automaticamente');

				setListItems(news);

				timerDownloadRSS = setTimeout(() => {
					downloadRSS();
				}, 60000);
			})
			.catch((error) => console.log(error));
	};

	let y = 0;
	let x = 0;
	let isScrolling = false;
	let timerDownloadRSS;

	let [listItems, setListItems] = useState([]);
	let list = useRef(null);

	useEffect(() => {
		newsController
			.getAll()
			.then((news) => {
				console.log('Obteniendo al inicio');
				setListItems(news);
				//downloadRSS();
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				ref={list}
				data={listItems}
				renderItem={({ item }) => <ListItem {...item} newsController={newsController} />}
				onTouchStart={(evt) => {
					x = evt.nativeEvent.pageX;
					y = evt.nativeEvent.pageY;
				}}
				onTouchMove={(evt) => {
					let _x = Math.abs(x - evt.nativeEvent.pageX);
					let _y = Math.abs(y - evt.nativeEvent.pageY);
					if (_x > 5 && _y < 5 && !isScrolling) {
						list.current.setNativeProps({
							scrollEnabled: false,
						});
					}
					y = evt.nativeEvent.pageY;
				}}
				onTouchEnd={() =>
					list.current.setNativeProps({
						scrollEnabled: true,
					})
				}
				onTouchEndCapture={() =>
					list.current.setNativeProps({
						scrollEnabled: true,
					})
				}
				onScroll={() => {
					isScrolling = true;
				}}
				onScrollEndDrag={() => {
					isScrolling = false;
				}}
			/>
		</View>
	);
}

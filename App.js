import { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ListItem from './components/list-item/list-item';
import Constants from 'expo-constants';
import DB_SQLite from './utils/db-sqlite';
import NavigationBar from './components/navigation-bar/navigation-bar';
import NewsItems from './utils/news-items';

const db = new DB_SQLite('data22.db');
const newsItems = new NewsItems(db);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Constants.statusBarHeight,
	},
});

export default function App() {
	let y = 0;
	let x = 0;
	let isScrolling = false;

	let [listItems, setListItems] = useState([]);
	let list = useRef(null);

	useEffect(() => {
		newsItems
			.getAllItems()
			.then((news) => setListItems(news))
			.catch((error) => console.log(error));
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				ref={list}
				data={listItems}
				renderItem={({ item }) => <ListItem {...item} newsItems={newsItems} />}
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
			<NavigationBar
				homeBtnFn={() => {
					setListItems(newsItems.getAll());
				}}
				bookmarkBtnFn={() => {
					setListItems(newsItems.getBookmarks());
				}}
			/>
		</View>
	);
}

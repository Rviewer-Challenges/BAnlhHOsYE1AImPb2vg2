import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './components/list-item/list-item';
import { rsstojsonConvert } from './utils/rss-to-json';
import Constants from 'expo-constants';

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
		fetch('http://feeds.weblogssl.com/xatakamx')
			.then((response) => response.text())
			.then((data) => {
				data = rsstojsonConvert(data);
				setListItems(data.items);
			});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList data={listItems} renderItem={({ item }) => <ListItem {...item} />} />
		</View>
	);
}

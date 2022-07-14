import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListItem from './components/list-item/list-item';
import { rsstojsonConvert } from './utils/rss-to-json';

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

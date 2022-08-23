import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import DB_SQLite from '../../utils/db-sqlite';
import NewsItems from '../../utils/news-items';
import FlatListSwipe from '../flatlist-swipe/flatlist-swipe';
import ListItem from '../list-item/list-item';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
});

const CustomFlatListSwipe = (props) => {
	return (
		<View style={styles.container}>
			<FlatListSwipe {...props} />
		</View>
	);
};

export default CustomFlatListSwipe;

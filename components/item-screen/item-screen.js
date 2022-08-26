import { Text, View, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import NewsData from '../../utils/news-data';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//paddingTop: Constants.statusBarHeight,
	},
	content: {
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#03071e',
	},
	subtitleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
	},
	subtitle: {
		fontSize: 14,
		color: '#03071e',
	},
});

StyleSheet;

const ItemScreen = ({ route, navigation }) => {
	const { id, title, thumbnail, pubDate, provider, bookmark, read } = route.params;

	return (
		<View
			style={styles.container}
			onLayout={() => {
				console.log('EN LAYOUT');
				NewsData.newsItems.updateRead(id, true);
			}}
		>
			<Image style={{ width: '100%', height: '40%' }} source={{ uri: thumbnail }} />
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.subtitle}>{pubDate}</Text>
					<Text style={styles.subtitle}>{provider.title}</Text>
				</View>
			</View>
		</View>
	);
};

export default ItemScreen;

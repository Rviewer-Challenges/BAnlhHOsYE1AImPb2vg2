import { Text, View, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//paddingTop: Constants.statusBarHeight,
	},
});

StyleSheet;

const ItemScreen = ({ route, navigation }) => {
	const { id, title, thumbnail, pubDate, provider, bookmark, read } = route.params;

	return (
		<View style={styles.container}>
			<Image style={{ width: '100%', height: '40%' }} source={{ uri: thumbnail }} />
			<Text>{title}</Text>
			<Text>{pubDate}</Text>
			<Text>{provider.title}</Text>
		</View>
	);
};

export default ItemScreen;

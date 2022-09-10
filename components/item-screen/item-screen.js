import { useState, useEffect, useRef } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Easing, Animated } from 'react-native';
import NewsData from '../../utils/news-data';
import NewsContent from '../../utils/news-content';
import ItemContentWebView from '../item-content-webview/item-content-webview';
import ItemContentGoBtn from '../item-content-go-btn/item-content-go-btn';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//paddingTop: Constants.statusBarHeight,
		height: '100%',
	},
	content: {
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		height: '100%',
	},
	title: {
		fontSize: 22,
		lineHeight: 24,
		fontWeight: 'bold',
		color: '#03071e',
		width: '100%',
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

const ItemScreen = ({ route, navigation }) => {
	const { id, title, thumbnail, pubDate, provider, bookmark, read, link } = route.params;

	const [contentHTML, setContentHTML] = useState('');

	const opacity = useRef(new Animated.Value(0)).current;
	const opacityIn = () => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 250,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		const newsContent = new NewsContent();
		newsContent
			.getFileContent(id)
			.then((data) => setContentHTML(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<View
			style={styles.container}
			onLayout={(event) => NewsData.newsItems.updateRead(id, true)}
		>
			<ScrollView>
				<Animated.View style={{ opacity: opacity }}>
					<View
						style={{
							paddingBottom: 30,
						}}
					>
						<Image style={{ width: '100%', height: 275 }} source={{ uri: thumbnail }} />
						<View style={styles.content}>
							<Text style={styles.title}>{title}</Text>
							<View style={styles.subtitleContainer}>
								<Text style={styles.subtitle}>{pubDate}</Text>
								<Text style={styles.subtitle}>{provider.title}</Text>
							</View>
							<ItemContentWebView source={contentHTML} onReady={() => opacityIn()} />
						</View>
					</View>
				</Animated.View>
			</ScrollView>
			<Animated.View style={{ opacity: opacity }}>
				<ItemContentGoBtn link={link} />
			</Animated.View>
		</View>
	);
};

export default ItemScreen;

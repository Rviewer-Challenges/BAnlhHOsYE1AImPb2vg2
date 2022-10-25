import { useState, useEffect, useRef } from 'react';
import { View, Easing, Animated } from 'react-native';
import NewsData from '../../utils/news-data';
import NewsContent from '../../utils/news-content';
import ItemContentWebView from '../item-content-webview/item-content-webview';

const ItemScreen = ({ route, navigation }) => {
	const { id, title, thumbnail, pubDate, providerTitle, bookmark, read, link } = route.params;

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
			style={{
				height: '100%',
			}}
			onLayout={(event) => NewsData.newsItems.updateRead(id, true)}
		>
			<Animated.View style={{ opacity: opacity, height: '100%' }}>
				<ItemContentWebView
					id={id}
					title={title}
					thumbnail={thumbnail}
					pubDate={pubDate}
					providerTitle={providerTitle}
					link={link}
					source={contentHTML}
					bookmark={bookmark}
					onReady={() => opacityIn()}
				/>
			</Animated.View>
		</View>
	);
};

export default ItemScreen;

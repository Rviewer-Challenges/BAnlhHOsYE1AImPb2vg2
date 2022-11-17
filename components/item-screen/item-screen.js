import { useState, useEffect, useRef } from 'react';
import { View, Easing, Animated, DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import NewsData from '../../utils/news-data';
import NewsContent from '../../utils/news-content';
import ItemContentWebView from '../item-content-webview/item-content-webview';
import Themes from '../../utils/themes';
import { StatusBar } from 'expo-status-bar';

const ItemScreen = ({ route, navigation }) => {
	const { id, title, thumbnail, pubDate, providerTitle, bookmark, read, link } = route.params;

	const [contentHTML, setContentHTML] = useState('');
	const [theme, changeTheme] = useState({});

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
		const eventEmitter = new NativeEventEmitter();
		const newsContent = new NewsContent();

		eventEmitter.listener = DeviceEventEmitter.addListener('CHANGE_THEME', () =>
			changeTheme(Themes.theme)
		);

		newsContent
			.getFileContent(id)
			.then((data) => setContentHTML(data))
			.catch((error) => console.log(error));

		return () => {
			try {
				eventEmitter.remove();
			} catch (error) {
				console.log(error);
			}
		};
	}, []);

	return (
		<View
			style={{
				height: '100%',
				backgroundColor: Themes.theme == 'dark' ? '#2c2c2c' : '#f2f2f2',
			}}
			onLayout={(event) => NewsData.updateRead(id, true)}
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
			<StatusBar
				style={Themes.theme == 'dark' ? 'light' : 'dark'}
				animated={false}
				backgroundColor={
					Themes.theme == 'dark' ? 'rgba(44, 44, 44, 0.5)' : 'rgba(242, 242, 242, 0.5)'
				}
			/>
		</View>
	);
};

export default ItemScreen;

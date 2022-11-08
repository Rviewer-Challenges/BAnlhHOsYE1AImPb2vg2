import ListItem from '../list-item/list-item';
import CustomFlatListSwipe from '../custom-flatlist-swipe/custom-flatlist-swipe';
import NewsData from '../../utils/news-data';
import { useEffect, useState } from 'react';
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import Themes from '../../utils/themes';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import downloaderRSS from '../../utils/downloader-rss';
import DB_LOADED from '../../utils/db-sqlite-loaded';

let isFocused = true;

const HomeScreen = ({ navigation }) => {
	const [theme, changeTheme] = useState({});
	const callTimer = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (isFocused) {
				downloaderRSS(DB_LOADED.get())
					.then((data) => {
						const eventEmitter = new NativeEventEmitter();
						const newsDataItems = NewsData.getAll();

						if (newsDataItems[0] != undefined && data[0] != undefined) {
							if (newsDataItems[0].id == data[0].id) {
								eventEmitter.emit('HIDE_REFRESH_BUTTON');
							} else {
								eventEmitter.emit('SHOW_REFRESH_BUTTON');
							}
						}

						callTimer();
					})
					.catch((error) => console.log(error));
			}
		}, 10000);
	};
	let [news, setNews] = useState(NewsData.getAll());
	let timer;

	isFocused = useIsFocused();

	useEffect(() => {
		const willFocus = navigation.addListener('focus', () => {
			if (NewsData.needReload) {
				NewsData.reload()
					.then(() => {
						setNews(NewsData.getAll());
					})
					.catch((error) => console.log(error));
			} else {
				setNews(NewsData.getAll());
			}
		});
		return willFocus;
	}, [navigation]);

	useEffect(() => {
		const eventEmitter = new NativeEventEmitter();

		eventEmitter.listener = DeviceEventEmitter.addListener('CHANGE_THEME', () =>
			setTimeout(() => {
				changeTheme(Themes.theme);
			}, 501)
		);

		eventEmitter.listener = DeviceEventEmitter.addListener('RELOAD_NEWS', () =>
			NewsData.reload()
				.then(() => {
					setNews(NewsData.getAll());
					eventEmitter.emit('HIDE_REFRESH_BUTTON');
				})
				.catch((error) => console.log(error))
		);
	}, []);

	useEffect(() => {
		if (isFocused) {
			callTimer();
		} else {
			const eventEmitter = new NativeEventEmitter();
			eventEmitter.emit('HIDE_REFRESH_BUTTON');
		}
	}, [isFocused]);

	return (
		<>
			<CustomFlatListSwipe
				data={news}
				renderItem={({ item }) => <ListItem {...item} />}
				keyExtractor={(item) => item.id}
			/>
			<StatusBar style={Themes.theme == 'dark' ? 'light' : 'dark'} animated={false} />
		</>
	);
};

export default HomeScreen;

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
import HomeNewsEmpty from './home-news-empty';

let isFocused = true;

const HomeScreen = ({ navigation }) => {
	const eventEmitter = new NativeEventEmitter();
	const [theme, changeTheme] = useState({});
	const callTimer = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (isFocused) {
				downloaderRSS(DB_LOADED.get())
					.then((data) => {
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
		}, 60000);
	};
	let [news, setNews] = useState(NewsData.getAll());
	let timer;

	isFocused = useIsFocused();

	useEffect(() => {
		const willFocus = navigation.addListener('focus', () => {
			if (NewsData.needReloadAll()) {
				eventEmitter.emit('NAV_SHOW_LOADING');
				NewsData.reloadAll()
					.then(() => {
						setNews(NewsData.getAll());
						eventEmitter.emit('NAV_HIDE_LOADING');
					})
					.catch((error) => console.log(error));
			} else {
				setNews(NewsData.getAll());
			}
		});
		return willFocus;
	}, [navigation]);

	useEffect(() => {
		eventEmitter.listener = DeviceEventEmitter.addListener('CHANGE_THEME', () =>
			setTimeout(() => {
				changeTheme(Themes.theme);
			}, 501)
		);

		eventEmitter.listener = DeviceEventEmitter.addListener('RELOAD_NEWS', () =>
			NewsData.reloadAll()
				.then(() => {
					setNews(NewsData.getAll());
					eventEmitter.emit('HIDE_REFRESH_BUTTON');
				})
				.catch((error) => console.log(error))
		);

		return () => {
			try {
				eventEmitter.remove();
			} catch (error) {
				console.log(error);
			}
		};
	}, []);

	useEffect(() => {
		if (isFocused) {
			callTimer();
		} else {
			eventEmitter.emit('HIDE_REFRESH_BUTTON');
		}
	}, [isFocused]);

	return (
		<>
			{news.length == 0 ? (
				<HomeNewsEmpty />
			) : (
				<CustomFlatListSwipe
					data={news}
					renderItem={({ item }) => <ListItem {...item} />}
					keyExtractor={(item) => item.id}
				/>
			)}
			<StatusBar style={Themes.theme == 'dark' ? 'light' : 'dark'} animated={false} />
		</>
	);
};

export default HomeScreen;

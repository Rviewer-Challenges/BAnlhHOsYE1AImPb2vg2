import ListItem from '../list-item/list-item';
import CustomFlatListSwipe from '../custom-flatlist-swipe/custom-flatlist-swipe';
import NewsData from '../../utils/news-data';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Themes from '../../utils/themes';
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import BookmarksNewsEmpty from './bookmarks-news-empty';

const BookmarksScreen = ({ navigation }) => {
	const [theme, changeTheme] = useState({});
	let [news, setNews] = useState(NewsData.getBookmarks());
	useEffect(() => {
		const eventEmitter = new NativeEventEmitter();
		eventEmitter.listener = DeviceEventEmitter.addListener('CHANGE_THEME', () =>
			setTimeout(() => {
				changeTheme(Themes.theme);
			}, 501)
		);

		const willFocus = navigation.addListener('focus', () => {
			if (NewsData.needReloadBookmarks()) {
				const eventEmitter = new NativeEventEmitter();
				eventEmitter.emit('NAV_SHOW_LOADING');
				NewsData.reloadBookmarks()
					.then((news) => {
						setNews(news);
						eventEmitter.emit('NAV_HIDE_LOADING');
					})
					.catch((error) => console.log(error));
			} else {
				setNews(NewsData.getBookmarks());
			}
		});

		return willFocus;
	}, [navigation]);

	return (
		<>
			{news.length == 0 ? (
				<BookmarksNewsEmpty />
			) : (
				<CustomFlatListSwipe
					data={news}
					renderItem={({ item }) => <ListItem {...item} />}
				/>
			)}
			<StatusBar style={Themes.theme == 'dark' ? 'light' : 'dark'} animated={false} />
		</>
	);
};

export default BookmarksScreen;

import ListItem from '../list-item/list-item';
import CustomFlatListSwipe from '../custom-flatlist-swipe/custom-flatlist-swipe';
import NewsData from '../../utils/news-data';
import { useEffect, useState } from 'react';
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import Themes from '../../utils/themes';

const HomeScreen = ({ navigation }) => {
	const [theme, changeTheme] = useState({});
	let [news, setNews] = useState(NewsData.getAll());
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

		return () => {
			eventEmitter.remove();
		};
	}, []);

	return (
		<CustomFlatListSwipe
			data={news}
			renderItem={({ item }) => <ListItem {...item} />}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default HomeScreen;

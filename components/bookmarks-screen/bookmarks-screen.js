import ListItem from '../list-item/list-item';
import CustomFlatListSwipe from '../custom-flatlist-swipe/custom-flatlist-swipe';
import NewsData from '../../utils/news-data';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Themes from '../../utils/themes';

const BookmarksScreen = ({ navigation }) => {
	let [news, setNews] = useState(NewsData.getBookmarks());
	useEffect(() => {
		const willFocus = navigation.addListener('focus', () => {
			if (NewsData.needReload) {
				NewsData.reload()
					.then(() => {
						setNews(NewsData.getBookmarks());
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
			<CustomFlatListSwipe data={news} renderItem={({ item }) => <ListItem {...item} />} />
			<StatusBar style={Themes.theme == 'dark' ? 'light' : 'dark'} animated={false} />
		</>
	);
};

export default BookmarksScreen;

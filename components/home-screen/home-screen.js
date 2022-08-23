import ListItem from '../list-item/list-item';
import CustomFlatListSwipe from '../custom-flatlist-swipe/custom-flatlist-swipe';
import NewsData from '../../utils/news-data';
import { useEffect, useState } from 'react';

const HomeScreen = ({ navigation }) => {
	let [news, setNews] = useState(NewsData.getAll());
	useEffect(() => {
		const willFocus = navigation.addListener('focus', () => {
			setNews(NewsData.getAll());
		});
		return willFocus;
	}, [navigation]);

	return (
		<CustomFlatListSwipe
			data={news}
			renderItem={({ item }) => <ListItem {...item} />}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default HomeScreen;

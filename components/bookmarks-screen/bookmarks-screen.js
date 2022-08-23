import ListItem from '../list-item/list-item';
import CustomFlatListSwipe from '../custom-flatlist-swipe/custom-flatlist-swipe';
import NewsData from '../../utils/news-data';

const BookmarksScreen = ({ navigation }) => {
	return (
		<CustomFlatListSwipe
			data={NewsData.getBookmarks()}
			renderItem={({ item }) => <ListItem {...item} />}
		/>
	);
};

export default BookmarksScreen;

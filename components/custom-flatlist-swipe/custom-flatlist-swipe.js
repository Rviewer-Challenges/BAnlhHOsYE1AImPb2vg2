import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import FlatListSwipe from '../flatlist-swipe/flatlist-swipe';
import Themes from '../../utils/themes';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ebebeb',
	},
});

const stylesDark = StyleSheet.create({
	container: {
		backgroundColor: '#2c2c2c',
	},
});

const themes = new Themes();
themes.styles(styles, stylesDark);

const CustomFlatListSwipe = (props) => {
	return (
		<View style={themes.get('container')}>
			<FlatListSwipe {...props} />
		</View>
	);
};

export default CustomFlatListSwipe;

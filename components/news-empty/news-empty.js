import { View, Text, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import Themes from '../../utils/themes';

const styles = StyleSheet.create({
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	icon: { color: '#000', marginBottom: 20 },
	text: {
		fontSize: 18,
		paddingRight: 20,
		paddingLeft: 20,
		textAlign: 'center',
		color: '#000',
	},
});

const stylesDark = StyleSheet.create({
	content: { backgroundColor: '#2c2c2c' },
	icon: { color: '#727272' },
	text: { color: '#727272' },
});

const themes = new Themes();
themes.styles(styles, stylesDark);

const NewsEmpty = ({ icon, texts }) => {
	return (
		<View style={themes.get('content')}>
			<Svg style={themes.get('icon')} width="80" height="80" viewBox="0 0 20 20">
				{icon}
			</Svg>
			{texts.map((text, key) => (
				<Text key={key} style={themes.get('text')}>
					{text}
				</Text>
			))}
		</View>
	);
};

export default NewsEmpty;

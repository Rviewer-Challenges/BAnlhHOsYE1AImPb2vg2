import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import Themes from '../../utils/themes';
import LoadingIcon from './loading-icon';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#f2f2f2',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainer: { marginTop: 'auto' },
	icon: { color: '#000' },
	text: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	footer: {
		fontSize: 14,
		marginTop: 'auto',
		marginBottom: 5,
	},
});

const stylesDark = StyleSheet.create({
	container: {
		backgroundColor: '#2c2c2c',
	},
	icon: { color: '#727272' },
	text: { color: '#727272' },
	footer: { color: '#727272' },
});

const themes = new Themes();
themes.styles(styles, stylesDark);

const Loading = () => {
	return (
		<>
			<View style={themes.get('container')}>
				<View style={styles.iconContainer}>
					<LoadingIcon theme={themes} />
				</View>
				<Text style={themes.get('text')}>RSS READER</Text>
				<Text style={themes.get('footer')}>@sgb004</Text>
			</View>
			<StatusBar style={Themes.theme == 'dark' ? 'light' : 'dark'} animated={false} />
		</>
	);
};

export default Loading;

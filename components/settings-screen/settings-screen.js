import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import SettingsThemeOptions from './settings-theme-options';
import SettingsSourcesOptions from './settings-sources-options';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	content: { paddingRight: 10, paddingLeft: 10 },
	header: {
		fontSize: 22,
		textAlign: 'center',
		paddingTop: Constants.statusBarHeight + 15,
		backgroundColor: '#588157',
		color: '#fff',
		paddingBottom: 15,
	},
	sectionTitle: {
		fontSize: 20,
		textAlign: 'center',
		marginTop: 20,
	},
	controlTitle: {
		fontSize: 18,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	controlThemeOptions: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
	},
	controlThemeIconBtn: {
		width: '30%',
		marginLeft: 5,
		marginRIght: 5,
	},
});

const SettingsScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Configuración</Text>
			<ScrollView style={styles.content}>
				<SettingsThemeOptions
					styles={styles}
					onChange={(theme) => {
						console.log('CHANGE THEME', theme);
					}}
				/>
				<SettingsSourcesOptions
					styles={styles}
					sources={[
						{ name: 'Xataka México', url: 'http://feeds.weblogssl.com/xatakamx', isActivated: false },
						{ name: 'Arduino', url: 'https://blog.arduino.cc/feed', isActivated: true },
					]}
					onChange={(sources) => {
						console.log({ sources });
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default SettingsScreen;

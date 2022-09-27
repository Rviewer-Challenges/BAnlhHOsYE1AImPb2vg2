import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import SettingsThemeOptions from './settings-theme-options';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	content: { paddingTop: Constants.statusBarHeight + 20, paddingRight: 10, paddingLeft: 10 },
	sectionTitle: {
		fontSize: 20,
		textAlign: 'center',
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
			<ScrollView style={styles.content}>
				<SettingsThemeOptions
					styles={styles}
					onChange={(theme) => {
						console.log('CHANGE THEME', theme);
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default SettingsScreen;

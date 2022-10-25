import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import SettingsThemeOptions from './settings-theme-options';
import SettingsSourcesOptions from './settings-sources-options';
import { useState } from 'react';
import Settings from '../../utils/settings';
import ProvidersController from '../../controllers/providers-controller';
import DB_LOADED from '../../utils/db-sqlite-loaded';
import NewsData from '../../utils/news-data';

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
	const settings = new Settings();
	const providersController = new ProvidersController(DB_LOADED.get());
	let [options, setOptions] = useState({});

	settings
		.get()
		.then((options) => setOptions(options))
		.catch((error) => console.log(error));

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Configuración</Text>
			{options.theme != undefined ? (
				<ScrollView style={styles.content}>
					<SettingsThemeOptions
						styles={styles}
						onChange={(theme) => {
							console.log('CHANGE THEME', theme);
						}}
					/>
					<SettingsSourcesOptions
						styles={styles}
						sources={options.sources}
						onChange={(value, isActivated) => {
							options.sources = options.sources.map((source) => {
								if (source.url == value) source.isActivated = isActivated;
								return source;
							});

							settings
								.set('sources', options.sources)
								.then(() => providersController.updateActivate(value, isActivated))
								.catch((error) => console.log(error));

							NewsData.needReload = true;
						}}
					/>
				</ScrollView>
			) : (
				<Text>Cargando...</Text>
			)}
		</View>
	);
};

export default SettingsScreen;

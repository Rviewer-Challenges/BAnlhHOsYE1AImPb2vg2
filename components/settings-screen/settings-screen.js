import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	useColorScheme,
	NativeEventEmitter,
} from 'react-native';
import Constants from 'expo-constants';
import SettingsThemeOptions from './settings-theme-options';
import SettingsSourcesOptions from './settings-sources-options';
import { useState } from 'react';
import Settings from '../../utils/settings';
import ProvidersController from '../../controllers/providers-controller';
import DB_LOADED from '../../utils/db-sqlite-loaded';
import NewsData from '../../utils/news-data';
import Themes from '../../utils/themes';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#f2f2f2',
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

const stylesDark = StyleSheet.create({
	container: {
		backgroundColor: '#2c2c2c',
	},
	sectionTitle: {
		color: '#fff',
	},
	controlTitle: {
		color: '#fff',
	},
});

let themes = new Themes();
themes.styles(styles, stylesDark);

const SettingsScreen = ({ navigation }) => {
	const settings = new Settings();
	const providersController = new ProvidersController(DB_LOADED.get());
	const systemTheme = useColorScheme();
	let [options, setOptions] = useState({});
	let [theme, setTheme] = useState({});

	settings
		.get()
		.then((options) => setOptions(options))
		.catch((error) => console.log(error));

	return (
		<View style={themes.get('container')}>
			<Text style={styles.header}>Configuración</Text>
			{options.theme != undefined ? (
				<ScrollView style={styles.content}>
					<SettingsThemeOptions
						styles={themes}
						theme={options.theme}
						onChange={(theme) => {
							const eventEmitter = new NativeEventEmitter();

							settings.set('theme', theme);
							if (theme == 'automatic') theme = systemTheme;
							Themes.theme = theme;
							setTheme(theme);

							eventEmitter.emit('CHANGE_THEME');
						}}
					/>
					<SettingsSourcesOptions
						styles={themes}
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

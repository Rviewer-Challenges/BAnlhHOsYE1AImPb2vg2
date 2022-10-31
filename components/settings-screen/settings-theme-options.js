import { useState } from 'react';
import { View, Text } from 'react-native';
import SettingsIconBtn from './settings-icon-btn';
import { Path } from 'react-native-svg';

const SettingsThemeOptions = ({ styles, theme, onChange }) => {
	let [options, setData] = useState({
		dark: theme == 'dark',
		automatic: theme == 'automatic',
		light: theme == 'light',
	});
	const selected = (id) => {
		if (!options[id]) {
			options = { ...options };
			for (const key in options) options[key] = false;
			options[id] = true;
			onChange(id);
			setData(options);
		}
	};

	return (
		<View>
			<Text style={styles.get('sectionTitle')}>Apariencia</Text>
			<Text style={styles.get('controlTitle')}>Tema</Text>
			<View style={styles.get('controlThemeOptions')}>
				<SettingsIconBtn
					id="dark"
					style={styles.get('controlThemeIconBtn')}
					icon={
						<Path
							d="M18.722 11.22a8.219 8.216 0 01-2.11.275 8.06 8.06 0 01-5.738-2.373 8.155 8.152 0 01-2.097-7.845A1.016 1.016 0 007.532.035a10.176 10.172 0 00-4.561 2.622c-3.961 3.96-3.961 10.405 0 14.367A10.098 10.094 0 0010.157 20a10.09 10.087 0 007.184-2.975 10.169 10.165 0 002.625-4.562 1.017 1.017 0 00-1.244-1.244zm-2.817 4.368a8.075 8.073 0 01-5.747 2.38 8.082 8.079 0 01-5.75-2.38c-3.168-3.169-3.168-8.325 0-11.493a8.051 8.048 0 012.094-1.507 10.19 10.185 0 002.937 7.972 10.133 10.13 0 007.974 2.937 8.166 8.163 0 01-1.508 2.091z"
							fill="currentColor"
						/>
					}
					text="Oscuro"
					activated={options.dark}
					onPress={(id) => selected(id)}
				/>
				<SettingsIconBtn
					id="automatic"
					style={styles.get('controlThemeIconBtn')}
					icon={
						<>
							<Path
								d="M10 20c5.514 0 10-4.486 10-10S15.514 0 10 0 0 4.486 0 10s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"
								fill={'currentColor'}
							/>
							<Path d="M17 10a7 7 0 00-7-7v14a7 7 0 007-7z" fill={'currentColor'} />
						</>
					}
					text="Sistema"
					activated={options.automatic}
					onPress={(id) => selected(id)}
				/>
				<SettingsIconBtn
					id="light"
					style={styles.get('controlThemeIconBtn')}
					icon={
						<Path
							d="M4.995 10a5.013 5.013 0 005.007 5.007A5.013 5.013 0 0015.009 10a5.013 5.013 0 00-5.007-5.007A5.013 5.013 0 004.995 10zm5.007-3.007A3.01 3.01 0 0113.009 10a3.01 3.01 0 01-3.007 3.007A3.01 3.01 0 016.995 10a3.01 3.01 0 013.007-3.007zM9 17h2v3H9zM9 0h2v3H9zM0 9h3v2H0zm17 0h3v2h-3zM2.221 16.363l2.12-2.122 1.415 1.414-2.12 2.122zM14.242 4.344l2.122-2.122 1.414 1.414-2.122 2.122zM4.344 5.759L2.222 3.637l1.415-1.414 2.12 2.122zm13.434 10.605l-1.414 1.414-2.122-2.122 1.414-1.414z"
							fill={'currentColor'}
						/>
					}
					text="Claro"
					activated={options.light}
					onPress={(id) => selected(id)}
				/>
			</View>
		</View>
	);
};

export default SettingsThemeOptions;

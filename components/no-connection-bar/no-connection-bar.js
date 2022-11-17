import { useEffect, useState } from 'react';
import { Text, NativeEventEmitter, DeviceEventEmitter } from 'react-native';
import Themes from '../../utils/themes';

const NoConnectionBar = () => {
	const [theme, changeTheme] = useState(Themes.theme);

	useEffect(() => {
		const eventEmitter = new NativeEventEmitter();
		eventEmitter.listener = DeviceEventEmitter.addListener('CHANGE_THEME', () =>
			changeTheme(Themes.theme)
		);

		return () => {
			try {
				eventEmitter.remove();
			} catch (error) {
				console.log(error);
			}
		};
	}, []);

	return (
		<Text
			style={{
				textAlign: 'center',
				backgroundColor: Themes.theme == 'dark' ? '#e63946' : '#ef233c',
				color: '#fff',
				paddingTop: 2,
				paddingBottom: 2,
			}}
		>
			Sin conexión
		</Text>
	);
};

export default NoConnectionBar;

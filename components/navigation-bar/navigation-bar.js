import { View, StyleSheet, DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import { useState, useEffect } from 'react';
import NavigationBarBtn from './navigation-bar-btn';
import { useNavigation } from '@react-navigation/native';
import NavigationBottomBar from './navigation-bottom-bar';
import Themes from '../../utils/themes';

const styles = StyleSheet.create({
	content: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#fff',
	},
	bottomBar: {
		position: 'absolute',
		height: 3,
		width: 50,
		bottom: 0,
		left: 0,
		borderRadius: 3,
	},
	buttonColors: {
		//disabled: 'rgba(3, 7, 30, 0)',
		deactivated: 'rgba(3, 7, 30, 1)',
		activated: 'rgba(3, 7, 30, 1)',
	},
});

const stylesDark = StyleSheet.create({
	content: {
		backgroundColor: '#171717',
	},
	buttonColors: {
		deactivated: '#727272',
		activated: '#727272',
	},
});

const themes = new Themes();
themes.styles(styles, stylesDark);

const NavigationBar = ({ buttons }) => {
	const navigation = useNavigation();
	const [theme, changeTheme] = useState({});
	const buttonColors =
		Themes.theme == 'dark'
			? { ...styles.buttonColors, ...stylesDark.buttonColors }
			: styles.buttonColors;
	const mainButton = buttons.find((button) => button.isMain);
	const [state, setState] = useState({
		activated: mainButton.name,
		bottomBarColor: 'transparent',
		buttonsPositions: buttons.map((button) => {
			return { name: button.name, position: -100 };
		}),
		lastRouteName: mainButton.navigate,
	});

	const bottomBarPosition = state.buttonsPositions.find(
		(position) => position.name == state.activated
	).position;

	const navigationState = (event) => {
		const routes = event?.data?.state?.routes;
		if (routes) {
			const lastRouteName = routes[routes.length - 1].name;
			let button = buttons.find(
				(button) => button.navigate == lastRouteName || button.enabledIn == lastRouteName
			);

			if (button) {
				setState({
					...state,
					activated: button.name,
					bottomBarColor: button.color,
					lastRouteName,
				});
			}
		}
	};

	useEffect(() => {
		const eventEmitter = new NativeEventEmitter();

		navigation.addListener('state', (event) => {
			navigationState(event);
		});

		eventEmitter.listener = DeviceEventEmitter.addListener('CHANGE_THEME', () =>
			changeTheme(Themes.theme)
		);

		return () => {
			navigation.removeListener('state');
		};
	}, []);

	return (
		<View style={themes.get('content')}>
			{buttons.map((button, index) => {
				const _buttonColors = button.color
					? { ...buttonColors, activated: button.color }
					: buttonColors;

				return (
					<NavigationBarBtn
						index={button.name}
						key={button.name}
						colors={_buttonColors}
						onLayout={(event, left) => {
							if (button.isMain) {
								let _state = {
									...state,
									activated: button.name,
									bottomBarColor: button.color,
								};
								_state.buttonsPositions[index].position = left;
								setState(_state);
							}
						}}
						onPress={(event, left) => {
							if (button.changeState !== false) {
								let _state = {
									...state,
									activated: button.name,
								};

								if (button.hideBottomBar) {
									_state.bottomBarColor = 'transparent';
								} else {
									_state.bottomBarColor = button.color;
									_state.buttonsPositions[index].position = left;
								}

								setState(_state);
							}

							if (button.navigate) {
								if (button.navigate == 'goBack') {
									navigation.goBack();
								} else {
									navigation.navigate(button.navigate);
								}
							}

							if (typeof button.onPress == 'function') {
								button.onPress(button);
							}
						}}
						activated={state.activated}
						enabled={
							button.enabledIn == 'all'
								? true
								: button.enabledIn == state.lastRouteName
						}
						style={button.style ?? {}}
					>
						{button.icon}
					</NavigationBarBtn>
				);
			})}
			<NavigationBottomBar position={bottomBarPosition} finishColor={state.bottomBarColor} />
		</View>
	);
};

export default NavigationBar;

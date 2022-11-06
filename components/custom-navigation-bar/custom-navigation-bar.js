import NavigationBar from '../navigation-bar/navigation-bar';
import { Path } from 'react-native-svg';
import Themes from '../../utils/themes';
import { useState, useEffect } from 'react';
import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';

const CustomNavigationBar = () => {
	const buttonsInit = [
		{
			name: 'go-back',
			navigate: 'goBack',
			icon: (
				<>
					<Path
						fill="currentColor"
						d="M20 40c11.027 0 20-8.973 20-20C40 8.971 31.027 0 20 0 8.971 0 0 8.971 0 20c0 11.027 8.971 20 20 20zm0-36c8.822 0 16 7.178 16 16s-7.178 16-16 16S4 28.822 4 20 11.178 4 20 4z"
					/>
					<Path
						fill="currentColor"
						d="M22.586 31.414l2.828-2.828L16.827 20l8.587-8.586-2.828-2.828L11.173 20z"
					/>
				</>
			),
			enabledIn: 'Item',
			hideBottomBar: true,
		},
		{
			name: 'home',
			navigate: 'Home',
			icon: (
				<Path
					fill="currentColor"
					d="M6 40h28a4 4 0 004-4V18a2 2 0 00-.58-1.42L21.42.583a2 2 0 00-2.82 0L2.6 16.58A2 2 0 002 18v18A4 4 0 006 40zm10-4V26h8v10zM6 18.82L20 4.822l14 14V36h-6V26a4 4 0 00-4-4h-8a4 4 0 00-4 4v10H6z"
				/>
			),
			enabledIn: 'all',
			color: Themes.theme == 'dark' ? '#005BAF' : 'rgb(0, 53, 102)',
			isMain: true,
		},
		{
			name: 'bookmarks',
			navigate: 'Bookmarks',
			icon: (
				<>
					<Path
						fill="currentColor"
						d="M23.636 7.273H9.091a3.64 3.64 0 00-3.636 3.636V40l10.909-6.547L27.273 40V10.91a3.64 3.64 0 00-3.637-3.637zm0 26.303l-7.272-4.361-7.273 4.361V10.91h14.545z"
					/>
					<Path
						fill="currentColor"
						d="M30.91 0H16.363a3.64 3.64 0 00-3.637 3.636h14.546a3.64 3.64 0 013.636 3.637V26.26l3.636 4.525V3.636A3.64 3.64 0 0030.91 0z"
					/>
				</>
			),
			enabledIn: 'all',
			color: 'rgb(255, 214, 10)',
		},
		{
			name: 'settings',
			navigate: 'Settings',
			icon: (
				<>
					<Path
						fill="currentColor"
						d="M20 28c4.412 0 8-3.588 8-8s-3.588-8-8-8-8 3.588-8 8 3.588 8 8 8zm0-12c2.168 0 4 1.832 4 4s-1.832 4-4 4-4-1.832-4-4 1.832-4 4-4z"
					/>
					<Path
						fill="currentColor"
						d="M1.69 28.272l2 3.46c1.062 1.834 3.618 2.522 5.46 1.46l1.058-.612A16.2 16.2 0 0014 34.804V36c0 2.206 1.794 4 4 4h4c2.206 0 4-1.794 4-4v-1.196a16.264 16.264 0 003.792-2.222l1.058.612c1.846 1.06 4.396.376 5.462-1.462l1.998-3.458a4.002 4.002 0 00-1.462-5.464l-1.01-.584a15.436 15.436 0 000-4.448l1.01-.584a4.004 4.004 0 001.462-5.464l-1.998-3.458c-1.062-1.84-3.616-2.53-5.462-1.464l-1.058.612A16.2 16.2 0 0026 5.196V4c0-2.206-1.794-4-4-4h-4c-2.206 0-4 1.794-4 4v1.196a16.264 16.264 0 00-3.792 2.222L9.15 6.806c-1.848-1.062-4.4-.374-5.462 1.464L1.69 11.728a4.002 4.002 0 001.462 5.464l1.01.584a15.366 15.366 0 000 4.446l-1.01.584a4.006 4.006 0 00-1.462 5.466zm6.652-5.516A11.406 11.406 0 018 20c0-.924.116-1.852.34-2.756a1.998 1.998 0 00-.94-2.216l-2.246-1.3L7.15 10.27l2.29 1.324a1.994 1.994 0 002.376-.284 12.142 12.142 0 014.768-2.798A2 2 0 0018 6.6V4h4v2.6a2 2 0 001.416 1.912 12.166 12.166 0 014.768 2.798 1.998 1.998 0 002.376.284l2.288-1.322 2 3.458-2.248 1.298a2 2 0 00-.94 2.216c.224.904.34 1.832.34 2.756 0 .922-.116 1.85-.342 2.756a2 2 0 00.942 2.216l2.246 1.298-1.996 3.458-2.29-1.322a1.992 1.992 0 00-2.376.284 12.142 12.142 0 01-4.768 2.798A2 2 0 0022 33.4l.004 2.6H18v-2.6a2 2 0 00-1.416-1.912 12.166 12.166 0 01-4.768-2.798 1.984 1.984 0 00-2.376-.282l-2.288 1.324-2-3.458L7.4 24.972a2 2 0 00.942-2.216z"
					/>
				</>
			),
			enabledIn: 'all',
			color: 'rgb(88, 129, 87)',
		},
		{
			name: 'refresh',
			icon: (
				<>
					<Path
						fill="currentColor"
						d="M16 18h-5.798l.002-.018a9.912 9.912 0 011.504-3.574 10.108 10.108 0 014.4-3.622 9.797 9.797 0 011.876-.582 10.156 10.156 0 014.036 0 9.956 9.956 0 015.05 2.722l2.832-2.824A14.072 14.072 0 0025.454 7.1a13.842 13.842 0 00-2.63-.816 14.158 14.158 0 00-5.638 0 13.88 13.88 0 00-2.632.818 14.08 14.08 0 00-6.16 5.068 13.956 13.956 0 00-2.108 5.01c-.056.27-.086.546-.126.82H0l8 8zm8 4h5.798l-.002.016a9.952 9.952 0 01-4.206 6.276 9.886 9.886 0 01-3.574 1.504 10.146 10.146 0 01-4.034 0 9.912 9.912 0 01-3.574-1.504 10.144 10.144 0 01-1.48-1.22L10.1 29.9a14.064 14.064 0 004.45 3c.848.36 1.734.634 2.63.816a14.14 14.14 0 005.636 0 14.062 14.062 0 008.79-5.89 13.948 13.948 0 002.106-5.006c.054-.27.086-.546.126-.82H40l-8-8z"
					/>
				</>
			),
			enabledIn: enableRefreshBtn ? 'Home' : 'none',
			hideBottomBar: true,
			onPress: (button) => {
				eventEmitter.emit('RELOAD_NEWS');
			},
		},
	];

	const [buttons, setButtons] = useState(buttonsInit);
	const [theme, changeTheme] = useState({});
	const [enableRefreshBtn, setEnableRefreshBtn] = useState(false);
	const eventEmitter = new NativeEventEmitter();

	useEffect(() => {
		eventEmitter.listener = DeviceEventEmitter.addListener('CHANGE_THEME', () =>
			changeTheme(Themes.theme)
		);

		eventEmitter.listener = DeviceEventEmitter.addListener('SHOW_REFRESH_BUTTON', () =>
			setEnableRefreshBtn(true)
		);

		eventEmitter.listener = DeviceEventEmitter.addListener('HIDE_REFRESH_BUTTON', () =>
			setEnableRefreshBtn(false)
		);

		return () => {};
	}, []);

	useEffect(() => {
		let _buttons = [...buttons];
		_buttons = _buttons.map((button) => {
			if (button.name == 'refresh') {
				button.enabledIn = enableRefreshBtn ? 'Home' : 'none';
			}
			return button;
		});
		setButtons(_buttons);
	}, [enableRefreshBtn]);

	return <NavigationBar buttons={buttons} />;
};

export default CustomNavigationBar;

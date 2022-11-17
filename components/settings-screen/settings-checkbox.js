import { useRef, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Themes from '../../utils/themes';

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 2,
		paddingBottom: 2,
	},
	box: {
		height: 20,
		width: 20,
		borderRadius: 2,
		borderWidth: 1,
		borderColor: '#000',
	},
	icon: {
		position: 'absolute',
		color: '#4361ee',
	},
	text: {
		marginLeft: 5,
		fontSize: 16,
		color: '#000',
	},
});

const stylesDark = StyleSheet.create({
	box: {
		borderColor: '#ececec',
	},
	icon: {
		color: '#94A5F1',
	},
	text: {
		color: '#ececec',
	},
});

const themes = new Themes();
themes.styles(styles, stylesDark);

const SettingsCheckbox = ({ value, text, activated, onChange }) => {
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);
	let [isActivated, setIsActivated] = useState(activated);

	const opacityValue = isActivated ? 1 : 0;
	const opacityChange = (to) => {
		Animated.timing(opacityAnim, {
			toValue: to,
			duration: 150,
			useNativeDriver: true,
		}).start();
	};
	let opacityAnim = useRef(new Animated.Value(opacityValue)).current;
	opacityChange(opacityValue);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				isActivated = !isActivated;
				setIsActivated(isActivated);
				onChange(value, isActivated);
			}}
		>
			<View style={styles.content}>
				<View>
					<View style={themes.get('box')}></View>
					<AnimatedSvg
						height="20"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 18 18"
						style={[themes.get('icon'), { opacity: opacityAnim }]}
					>
						<Path
							d="M7.933 10.519L5.707 8.293 4.293 9.707l3.774 3.774 5.702-6.84-1.538-1.282z"
							fill="currentColor"
						/>
					</AnimatedSvg>
				</View>
				<Text style={themes.get('text')}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SettingsCheckbox;

import { useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native';
import Svg from 'react-native-svg';
import Themes from '../../utils/themes';

const styles = StyleSheet.create({
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 7,
		borderColor: '#fff',
		padding: 7,
	},
	icon: {
		color: '#000',
		marginTop: 1,
		marginBottom: 7,
	},
	text: {
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 14,
	},
});

const stylesDark = StyleSheet.create({
	content: {
		borderColor: '#000',
	},
	icon: {
		color: '#fff',
	},
	text: {
		color: '#fff',
	},
});

const themes = new Themes();
themes.styles(styles, stylesDark);

const SettingsIconBtn = ({ id = '', icon, text, style, activated = false, onPress }) => {
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);
	const transformScaleAnim = useRef(new Animated.Value(0)).current;
	const iconAnim = () => {
		let animatedTiming = Animated.timing(transformScaleAnim, {
			toValue: 2,
			duration: 500,
			useNativeDriver: true,
		});

		animatedTiming.reset();
		animatedTiming.start();
	};

	let transformScale = transformScaleAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [1, 0.5, 1],
	});

	const opacityValue = activated ? 1 : 0;
	const opacityChange = (to) => {
		Animated.timing(opacityAnim, {
			toValue: to,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};
	let opacityAnim = useRef(new Animated.Value(opacityValue)).current;

	useEffect(() => {
		opacityChange(opacityValue);
	}, [activated]);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				iconAnim();
				onPress(id);
			}}
		>
			<View style={[themes.get('content'), style]}>
				<Animated.View
					style={{
						position: 'absolute',
						backgroundColor: Themes.theme == 'light' ? '#fff' : '#000',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						opacity: opacityAnim,
					}}
				></Animated.View>
				<AnimatedSvg
					style={[themes.get('icon'), { transform: [{ scale: transformScale }] }]}
					height="30"
					width="30"
					viewBox="0 0 20 20"
				>
					{icon}
				</AnimatedSvg>
				<Text style={themes.get('text')}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SettingsIconBtn;

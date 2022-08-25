import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { useRef } from 'react';
import Svg from 'react-native-svg';

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignContent: 'center',
		width: 50,
		height: 50,
		marginRight: 5,
		marginLeft: 5,
	},
});

const NavigationBarBtn = ({
	onPress,
	onLayout = () => {},
	index = 0,
	activated = 0,
	enabled = true,
	colors = {},
	children,
}) => {
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);
	const colorAnim = useRef(new Animated.Value(0)).current;
	const transformScaleAnim = useRef(new Animated.Value(0)).current;

	const changeColor = (to) => {
		Animated.timing(colorAnim, {
			toValue: to,
			duration: 250,
			useNativeDriver: false,
		}).start();
	};

	const pressAnimStart = (duration = 0) => {
		let animatedTiming = Animated.timing(transformScaleAnim, {
			toValue: 2,
			duration: 500,
			useNativeDriver: false,
		});
		animatedTiming.reset();
		animatedTiming.start();
	};

	const isActivated = activated == index;

	let thisBtn = useRef(null);
	let color = colorAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [colors.disabled, colors.deactivated, colors.activated],
	});
	let transformScale = transformScaleAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [1, 0.5, 1],
	});

	if (!enabled) {
		changeColor(0);
	}

	if (enabled) {
		isActivated ? changeColor(2) : changeColor(1);
	}

	return (
		<TouchableWithoutFeedback
			onPress={(event) => {
				if (!enabled) return false;
				thisBtn.current.measureInWindow((left) => {
					onPress(event, left);
				});
				if (!isActivated) {
					pressAnimStart();
				}
			}}
		>
			<View
				ref={thisBtn}
				style={[styles.button, styles.buttonActive]}
				onLayout={(event) => onLayout(event, event.nativeEvent.layout.x)}
			>
				<AnimatedSvg
					style={{
						color: color,
						marginRight: 'auto',
						marginLeft: 'auto',
						transform: [{ scale: transformScale }],
					}}
					width="25"
					height="25"
					viewBox="0 0 40 40"
				>
					{children}
				</AnimatedSvg>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default NavigationBarBtn;

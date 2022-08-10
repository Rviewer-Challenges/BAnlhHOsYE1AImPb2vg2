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

	const changeColor = (to, duration = 250) => {
		Animated.timing(colorAnim, {
			toValue: to,
			duration,
			useNativeDriver: false,
		}).start();
	};

	let thisBtn = useRef(null);
	let color = colorAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [colors.disabled, colors.deactivated, colors.activated],
	});

	if (!enabled) {
		changeColor(0);
	}

	if (enabled) {
		activated == index ? changeColor(2) : changeColor(1);
	}

	return (
		<TouchableWithoutFeedback
			onPress={(event) => {
				if (!enabled) return false;
				thisBtn.current.measureInWindow((left) => {
					onPress(event, left);
				});
				changeColor(1);
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
						//transform: [{ scale: 0.75 }],
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

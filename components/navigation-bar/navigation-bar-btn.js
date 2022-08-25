import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Svg from 'react-native-svg';

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		marginRight: 5,
		marginLeft: 5,
	},
	button: {
		justifyContent: 'center',
		alignContent: 'center',
		width: 50,
		height: 50,
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
	const transformScaleAnim = useRef(new Animated.Value(0)).current;

	const opacityBtnAnim = useRef(new Animated.Value(0)).current;
	const opacityInAnim = useRef(new Animated.Value(0)).current;
	const opacityOutAnim = useRef(new Animated.Value(1)).current;

	const changeVisibility = () => {
		Animated.timing(opacityBtnAnim, {
			toValue: enabled ? 1 : 0,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};

	const changeColor = () => {
		Animated.timing(opacityInAnim, {
			toValue: isActivated ? 1 : 0,
			duration: 250,
			useNativeDriver: true,
		}).start();

		Animated.timing(opacityOutAnim, {
			toValue: isActivated ? 0 : 1,
			duration: 250,
			useNativeDriver: true,
		}).start();
	};

	const pressAnimStart = () => {
		let animatedTiming = Animated.timing(transformScaleAnim, {
			toValue: 2,
			duration: 500,
			useNativeDriver: true,
		});

		animatedTiming.reset();
		animatedTiming.start();
	};

	const isActivated = activated == index;

	let thisBtn = useRef(null);
	let transformScale = transformScaleAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [1, 0.5, 1],
	});

	useEffect(() => {
		changeVisibility();
	}, [enabled]);

	useEffect(() => {
		changeColor();
	}, [activated]);

	return (
		<TouchableWithoutFeedback
			onPress={(event) => {
				if (!enabled || isActivated) return false;
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
				onLayout={(event) => onLayout(event, event.nativeEvent.layout.x)}
				style={styles.container}
			>
				<Animated.View
					style={{
						opacity: opacityBtnAnim,
					}}
				>
					<View>
						<View style={styles.button}>
							<AnimatedSvg
								style={{
									color: colors.deactivated,
									marginRight: 'auto',
									marginLeft: 'auto',
									transform: [{ scale: transformScale }],
									opacity: opacityOutAnim,
								}}
								width="25"
								height="25"
								viewBox="0 0 40 40"
							>
								{children}
							</AnimatedSvg>
						</View>
						<View style={[styles.button, { position: 'absolute' }]}>
							<AnimatedSvg
								style={{
									color: colors.activated,
									marginRight: 'auto',
									marginLeft: 'auto',
									transform: [{ scale: transformScale }],
									opacity: opacityInAnim,
								}}
								width="25"
								height="25"
								viewBox="0 0 40 40"
							>
								{children}
							</AnimatedSvg>
						</View>
					</View>
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default NavigationBarBtn;

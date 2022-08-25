import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	bar: {
		position: 'absolute',
		height: 3,
		width: 50,
		bottom: 0,
		left: 0,
		backgroundColor: 'transparent',
		borderRadius: 3,
	},
});

const NavigationBottomBar = ({ position, finishColor }) => {
	const translateXAnim = useRef(new Animated.Value(-100)).current;

	const opacityInAnim = useRef(new Animated.Value(0)).current;
	const opacityOutAnim = useRef(new Animated.Value(1)).current;

	const moveBottomBar = (to) => {
		if (prevPosition.current < 0) {
			translateXAnim.setValue(position);
		} else {
			Animated.timing(translateXAnim, {
				toValue: to,
				duration: 250,
				easing: Easing.linear,
				useNativeDriver: true,
			}).start();
		}

		let opacityInTiming = Animated.timing(opacityInAnim, {
			toValue: 1,
			duration: 250,
			easing: Easing.linear,
			useNativeDriver: true,
		});

		let opacityOutTiming = Animated.timing(opacityOutAnim, {
			toValue: 0,
			duration: 250,
			easing: Easing.linear,
			useNativeDriver: true,
		});

		opacityInTiming.reset();
		opacityInTiming.start();

		opacityOutTiming.reset();
		opacityOutTiming.start(({ finished }) => {
			if (finished) {
				viewRef.current.setNativeProps({
					style: {
						backgroundColor: finishColor,
					},
				});
			}
		});
	};

	let viewRef = useRef(null);
	let prevPosition = useRef(-100);

	useEffect(() => {
		moveBottomBar(position);
		prevPosition.current = position;
	}, [position]);

	return (
		<Animated.View
			style={[
				styles.bar,
				{
					transform: [{ translateX: translateXAnim }],
				},
			]}
		>
			<View>
				<Animated.View
					ref={viewRef}
					style={[styles.bar, { backgroundColor: finishColor, opacity: opacityInAnim }]}
				></Animated.View>
				<Animated.View
					style={[
						styles.bar,
						{ backgroundColor: 'transparent', opacity: opacityOutAnim },
					]}
				></Animated.View>
			</View>
		</Animated.View>
	);
};

export default NavigationBottomBar;

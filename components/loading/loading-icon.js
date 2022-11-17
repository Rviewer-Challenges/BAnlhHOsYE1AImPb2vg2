import Svg, { Path, Circle } from 'react-native-svg';
import { Animated, StyleSheet, View } from 'react-native';
import { useRef } from 'react';

const styles = StyleSheet.create({
	container: { width: 40, height: 40, position: 'relative' },
	icon: { width: 40, height: 40, position: 'absolute' },
});

let isAnimating = false;

const LoadingIcon = ({ theme }) => {
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);
	const outputRanges = [
		[1, 1, 1, 0.75, 0.15, 0.75, 1, 1, 1],
		[1, 1, 0, 0.0, 0.0, 0.0, 0, 1, 1],
		[1, 0, 0, 0.0, 0.0, 0.0, 0, 0, 1],
	];
	const inputRange = outputRanges[0].map((v, i) => i);
	const opacities = [0, 1, 2].map(() => useRef(new Animated.Value(0)).current);
	const opacitiesAnim = opacities.map((opacity, i) =>
		opacity.interpolate({ inputRange, outputRange: outputRanges[i] })
	);

	const animation = () => {
		if (!isAnimating) {
			isAnimating = true;

			const ops = {
				toValue: inputRange.length - 1,
				duration: 2000,
				useNativeDriver: true,
			};
			const animations = opacities.map((opacity) => Animated.timing(opacity, ops));

			for (let i = 0; i < 2; i++) {
				animations[i].reset();
				animations[i].start();
			}

			animations[2].reset();
			animations[2].start(() => {
				isAnimating = false;
				animation();
			});
		}
	};

	animation();

	return (
		<View style={styles.container}>
			<AnimatedSvg
				height="40"
				width="40"
				viewBox="0 0 20 20"
				style={[styles.icon, theme.get('icon'), { opacity: opacitiesAnim[0] }]}
			>
				<Circle cx="2.727" cy="17.271" r="2.727" fill="currentColor" />
			</AnimatedSvg>
			<AnimatedSvg
				height="40"
				width="40"
				viewBox="0 0 20 20"
				style={[styles.icon, theme.get('icon'), { opacity: opacitiesAnim[1] }]}
			>
				<Path
					d="M9.09 20h3.637C12.727 12.982 7.018 7.272 0 7.272v3.636c5.013 0 9.09 4.078 9.09 9.092z"
					fill="currentColor"
				/>
			</AnimatedSvg>
			<AnimatedSvg
				height="40"
				width="40"
				viewBox="0 0 20 20"
				style={[styles.icon, theme.get('icon'), { opacity: opacitiesAnim[2] }]}
			>
				<Path
					d="M16.364 20H20C20 8.972 11.027 0 0 0v3.636c9.022 0 16.364 7.341 16.364 16.364z"
					fill="currentColor"
				/>
			</AnimatedSvg>
		</View>
	);
};

export default LoadingIcon;

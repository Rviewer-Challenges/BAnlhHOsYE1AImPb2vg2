import { useRef } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ItemContentGoBtn = ({ link }) => {
	const AnimatedSvg = Animated.createAnimatedComponent(Svg);
	const transformScaleAnim = useRef(new Animated.Value(0)).current;

	const pressAnimStart = () => {
		let animatedTiming = Animated.timing(transformScaleAnim, {
			toValue: 2,
			duration: 250,
			useNativeDriver: true,
		});

		animatedTiming.reset();
		animatedTiming.start();
	};

	let transformScale = transformScaleAnim.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [1, 0.5, 1],
	});

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				pressAnimStart();
				setTimeout(() => {
					Linking.openURL(link);
				}, 200);
			}}
		>
			<Animated.View
				style={{
					position: 'absolute',
					bottom: 10,
					right: 10,
					width: 50,
					height: 50,
					backgroundColor: '#dde5b6',
					borderRadius: 50,
					justifyContent: 'center',
					alignContent: 'center',
					flexDirection: 'row',
				}}
			>
				<AnimatedSvg
					style={{
						color: '#354f52',
						marginTop: 'auto',
						marginRight: 'auto',
						marginBottom: 'auto',
						marginLeft: 'auto',
						transform: [{ scale: transformScale }],
					}}
					width="25"
					height="25"
					viewBox="0 0 18 18"
				>
					<Path d="M10 0l3.293 3.293-7 7 1.414 1.414 7-7L18 8V0z" fill="currentColor" />
					<Path
						d="M16 16H2V2h7L7 0H2C.897 0 0 .897 0 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2z"
						fill="currentColor"
					/>
				</AnimatedSvg>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default ItemContentGoBtn;

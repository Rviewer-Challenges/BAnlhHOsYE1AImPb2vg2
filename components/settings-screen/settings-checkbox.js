import { useRef, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingTop: 2,
					paddingBottom: 2,
				}}
			>
				<View>
					<Svg
						height="20"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 18 18"
						style={{ color: '#000' }}
					>
						<Path
							d="M16 0H2C.897 0 0 .897 0 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2zM2 16V2h14l.002 14z"
							fill="currentColor"
						/>
					</Svg>
					<AnimatedSvg
						height="20"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 18 18"
						style={{ position: 'absolute', opacity: opacityAnim, color: '#4361ee' }}
					>
						<Path
							d="M7.933 10.519L5.707 8.293 4.293 9.707l3.774 3.774 5.702-6.84-1.538-1.282z"
							fill="currentColor"
						/>
					</AnimatedSvg>
				</View>
				<Text style={{ marginLeft: 5, fontSize: 16 }}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SettingsCheckbox;

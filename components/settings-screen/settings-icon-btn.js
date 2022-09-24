import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';

const styles = StyleSheet.create({
	content: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 7,
		padding: 7,
		elevation: 2,
		shadowColor: '#52006A',
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

const SettingsIconBtn = ({ icon, text, style }) => {
	return (
		<TouchableWithoutFeedback>
			<View style={[styles.content, style]}>
				<Svg style={styles.icon} height="30" width="30" viewBox="0 0 20 20">
					{icon}
				</Svg>
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SettingsIconBtn;

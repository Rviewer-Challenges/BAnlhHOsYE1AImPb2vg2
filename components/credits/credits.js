import { Text, View } from 'react-native';

const Credits = ({ styles }) => {
	return (
		<View style={{ marginBottom: 25 }}>
			<Text style={[styles.get('sectionTitle')]}>Lector RSS por:</Text>
			<Text style={styles.get('controlText')}>Salvador Gonzalez Blanco</Text>
			<Text style={styles.get('controlText')}>@sgb004</Text>
		</View>
	);
};

export default Credits;

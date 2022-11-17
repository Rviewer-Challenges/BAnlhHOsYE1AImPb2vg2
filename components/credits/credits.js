import { Text, View } from 'react-native';

const Credits = ({ styles }) => {
	return (
		<View style={{ marginBottom: 25 }}>
			<Text style={[styles.get('sectionTitle'), { fontSize: 16 }]}>Lector RSS por:</Text>
			<Text style={[styles.get('controlText'), { fontSize: 14 }]}>
				Salvador Gonzalez Blanco
			</Text>
			<Text style={[styles.get('controlText'), { fontSize: 14 }]}>@sgb004</Text>
		</View>
	);
};

export default Credits;

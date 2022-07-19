import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import formatDate from '../../utils/custom-date';

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
	},
	content: {
		flex: 1,
		flexDirection: 'row',
	},
	img: {
		width: 100,
		height: 100,
		borderRadius: 5,
		marginTop: 7,
	},
	text: {
		width: Dimensions.get('window').width - 130,
		marginLeft: 10,
	},
	title: { fontSize: 19 },
	date: {
		width: 100,
		textAlign: 'center',
		fontSize: 13,
		marginTop: 2,
	},
	footer: {
		fontSize: 13,
	},
});

const ListItem = ({ title, thumbnail, pubDate, provider }) => {
	pubDate = formatDate(pubDate);
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View>
					{thumbnail != '' && <Image style={styles.img} source={{ uri: thumbnail }} />}
					<Text style={styles.date}>{pubDate}</Text>
				</View>
				<View style={styles.text}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.footer}>{provider.title}</Text>
				</View>
			</View>
		</View>
	);
};

export default ListItem;

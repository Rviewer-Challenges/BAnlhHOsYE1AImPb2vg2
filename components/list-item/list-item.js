import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder } from 'react-native';
import formatDate from '../../utils/custom-date';
import BookmarkIcon from '../../assets/icon-bookmark.svg';
import ReadIcon from '../../assets/icon-read.svg';
import UnReadIcon from '../../assets/icon-unread.svg';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	content: {
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
	},
	row: {
		flexDirection: 'row',
	},
	img: {
		width: 100,
		height: 100,
		borderRadius: 5,
		marginTop: 7,
	},
	text: {
		width: windowWidth - 130,
		marginLeft: 10,
	},
	title: {
		fontSize: 19,
		fontWeight: 'bold',
		color: '#03071e',
	},
	titleRead: {
		fontWeight: 'normal',
		color: '#2f3e46',
	},
	date: {
		width: 100,
		textAlign: 'center',
		fontSize: 13,
		marginTop: 2,
		color: '#03071e',
	},
	footer: {
		fontSize: 13,
		color: '#03071e',
	},
	footerRight: {
		width: windowWidth - 140,
		marginTop: 2,
		marginLeft: 10,
	},
	icons: {
		flexDirection: 'row',
		position: 'absolute',
		top: 0,
		left: 0,
		//backgroundColor: '#f0f',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	icon: {
		width: '50%',
		height: '100%',
		justifyContent: 'center',
		opacity: 0,
	},
	bookmark: {
		backgroundColor: '#ffcb77',
	},
	swipeLeft: { backgroundColor: '#17c3b2' },
});

const ListItem = ({ id, title, thumbnail, pubDate, provider, bookmark, newsController }) => {
	console.log({ id, bookmark });

	const pan = useRef(new Animated.ValueXY()).current;

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, { dx: pan.x }], {
				useNativeDriver: false,
			}),
		})
	).current;

	const restorePosition = () => {
		if (pan.x !== 0) {
			Animated.spring(pan, {
				toValue: { x: 0, y: 0 },
				useNativeDriver: false,
			}).start();
		}
	};

	const getPosition = () => {
		let panX = parseFloat(JSON.stringify(pan.x));
		return (panX * 100) / windowWidth;
	};

	const onTouchEnd = () => {
		const position = getPosition();

		if (position > 25) {
			console.log('AGREGANDO A FAVORITOS');
			status.isBookmark = !status.isBookmark;
			newsController
				.updateBookmark(id, status.isBookmark)
				.then((result) => {
					console.log(result);
				})
				.catch((error) => console.log(error));
		} else if (position < -25) {
			console.log('MARCAR COMO LEIDO');
			status.isRead = !status.isRead;
		}

		setStatus({ isBookmark: status.isBookmark, isRead: status.isRead });
	};

	let [swipeDirection, setSwipeDirection] = useState('');
	let [status, setStatus] = useState({ isBookmark: bookmark, isRead: false });

	let backgroundColor = 'transparent';
	if (swipeDirection === 'right') {
		backgroundColor = styles.bookmark.backgroundColor;
	} else if (swipeDirection === 'left') {
		backgroundColor = styles.swipeLeft.backgroundColor;
	}

	thumbnail = thumbnail === '' ? provider.image : thumbnail;
	pubDate = formatDate(pubDate);

	return (
		<View style={{ backgroundColor: backgroundColor }}>
			<View style={styles.icons}>
				<View
					style={[
						styles.icon,
						{ opacity: swipeDirection === 'right' ? 100 : 0 },
						{ paddingLeft: 30, alignItems: 'flex-start' },
					]}
				>
					<BookmarkIcon />
				</View>
				<View
					style={[
						styles.icon,
						{ opacity: swipeDirection === 'left' ? 100 : 0 },
						{ paddingRight: 30, alignItems: 'flex-end' },
					]}
				>
					{status.isRead ? <ReadIcon /> : <UnReadIcon />}
				</View>
			</View>
			<Animated.View
				style={{
					transform: [{ translateX: pan.x }, { translateY: 0 }],
					backgroundColor: status.isBookmark
						? styles.bookmark.backgroundColor
						: '#EBEBEB',
				}}
				{...panResponder.panHandlers}
				onTouchStart={() => restorePosition()}
				onTouchMove={() => {
					const position = getPosition();
					if (position > 0) {
						setSwipeDirection('right');
					} else if (position < 0) {
						setSwipeDirection('left');
					}
				}}
				onTouchEnd={() => {
					onTouchEnd();
					restorePosition();
				}}
				onTouchCancel={() => {
					onTouchEnd();
					restorePosition();
				}}
			>
				{thumbnail === '' ? (
					<View style={[styles.content]}>
						<Text style={styles.title}>{title}</Text>
						<View style={styles.row}>
							<Text style={styles.date}>{pubDate}</Text>
							<Text style={[styles.footer, styles.footerRight]}>
								{provider.title}
							</Text>
						</View>
					</View>
				) : (
					<View style={[styles.content, styles.row]}>
						<View>
							<Image style={styles.img} source={{ uri: thumbnail }} />
							<Text style={styles.date}>{pubDate}</Text>
						</View>
						<View style={styles.text}>
							<Text style={[styles.title, status.isRead ? styles.titleRead : {}]}>
								{title}
							</Text>
							<Text style={styles.footer}>{provider.title}</Text>
						</View>
					</View>
				)}
			</Animated.View>
		</View>
	);
};

export default ListItem;

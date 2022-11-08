import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, PanResponder } from 'react-native';
import formatDate from '../../utils/custom-date';
import NewsData from '../../utils/news-data';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Themes from '../../utils/themes';
import Svg, { Path } from 'react-native-svg';

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
	iconBookmark: {
		color: '#3D2D00',
	},
	swipeLeft: { backgroundColor: '#17c3b2' },
	iconSwipeLeft: { color: '#063732' },
});

const stylesDark = StyleSheet.create({
	title: {
		color: '#ececec',
	},
	titleRead: {
		color: '#cbcbcb',
	},
	date: {
		color: '#ececec',
	},
	footer: {
		color: '#ececec',
	},
	bookmark: {
		backgroundColor: '#3D2D00',
	},
	iconBookmark: {
		color: '#BA9458',
	},
	swipeLeft: { backgroundColor: '#0B5851' },
	iconSwipeLeft: { color: '#119A8D' },
});

const themes = new Themes();
themes.styles(styles, stylesDark);

const ListItem = ({
	id,
	title,
	thumbnail,
	pubDate,
	providerTitle,
	providerImage,
	bookmark,
	read,
	link,
}) => {
	const navigation = useNavigation();

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
			status.isBookmark = !status.isBookmark;
			NewsData.updateBookmark(id, status.isBookmark);
		} else if (position < -25) {
			status.isRead = !status.isRead;
			NewsData.updateRead(id, status.isRead);
		}

		setStatus({ isBookmark: status.isBookmark, isRead: status.isRead });
	};

	let [swipeDirection, setSwipeDirection] = useState('');
	let [status, setStatus] = useState({ isBookmark: bookmark, isRead: read });

	let backgroundColor = 'transparent';
	if (swipeDirection === 'right') {
		backgroundColor =
			Themes.theme == 'dark'
				? stylesDark.bookmark.backgroundColor
				: styles.bookmark.backgroundColor;
	} else if (swipeDirection === 'left') {
		backgroundColor =
			Themes.theme == 'dark'
				? stylesDark.swipeLeft.backgroundColor
				: styles.swipeLeft.backgroundColor;
	}

	thumbnail = thumbnail === '' ? providerImage : thumbnail;
	pubDate = formatDate(pubDate);

	useEffect(() => {
		setStatus({ isBookmark: bookmark, isRead: read });
	}, [bookmark, read]);

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
					<Svg
						width="26"
						height="32"
						viewBox="0 0 26 32"
						style={themes.get('iconBookmark')}
					>
						<Path
							d="M22.75 0H3.25C1.458 0 0 1.435 0 3.2V32l13-7.315L26 32V3.2C26 1.435 24.542 0 22.75 0zm0 26.485L13 21l-9.75 5.485V3.2h19.5z"
							fill="currentColor"
						/>
					</Svg>
				</View>
				<View
					style={[
						styles.icon,
						{ opacity: swipeDirection === 'left' ? 100 : 0 },
						{ paddingRight: 30, alignItems: 'flex-end' },
					]}
				>
					{status.isRead ? (
						<Svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							style={themes.get('iconSwipeLeft')}
						>
							<Path
								d="M4.655 32h22.69C29.912 32 32 29.929 32 27.383V13.487c0-1.253-.52-2.462-1.425-3.319-.077-.038-11.69-9.17-11.69-9.17a4.673 4.673 0 00-5.77 0l-11.5 9.004C.634 10.896-.01 12.133 0 13.487v13.896C0 29.929 2.088 32 4.655 32zM15.05 3.428a1.537 1.537 0 011.902 0l9.949 7.788-9.949 7.789c-.559.44-1.343.44-1.902 0L5.1 11.217zM3.121 13.612l9.994 7.824a4.674 4.674 0 005.77 0l9.994-7.824v13.77a1.53 1.53 0 01-1.534 1.522H4.655a1.53 1.53 0 01-1.534-1.521z"
								fill="currentColor"
							/>
						</Svg>
					) : (
						<Svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							style={themes.get('iconSwipeLeft')}
						>
							<Path
								d="M27.355 8.692H4.645C2.084 8.692 0 10.789 0 13.366v14.109c0 2.577 2.084 4.675 4.645 4.675h22.71c2.561 0 4.645-2.098 4.645-4.675V13.366c0-2.577-2.084-4.674-4.645-4.674zm-1.372 3.116l-1.426 1.133-7.597 6.035a1.543 1.543 0 01-1.92 0l-7.33-5.828-1.688-1.34zm1.372 17.225H4.645a1.555 1.555 0 01-1.548-1.558v-14.01l10.023 7.963a4.613 4.613 0 005.76 0l10.023-7.96v14.007c0 .859-.694 1.558-1.548 1.558z"
								fill="currentColor"
							/>
						</Svg>
					)}
				</View>
			</View>
			<Animated.View
				style={{
					transform: [{ translateX: pan.x }, { translateY: 0 }],
					backgroundColor: status.isBookmark
						? Themes.theme == 'dark'
							? stylesDark.bookmark.backgroundColor
							: styles.bookmark.backgroundColor
						: Themes.theme == 'dark'
						? '#2c2c2c'
						: '#ebebeb',
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
				<TouchableWithoutFeedback
					onPress={() => {
						console.log('ABRIENDO NOTICIA');
						navigation.navigate('Item', {
							id,
							title,
							thumbnail,
							pubDate,
							providerTitle,
							bookmark,
							read,
							link,
						});
					}}
				>
					{thumbnail === '' ? (
						<View style={[styles.content]}>
							<Text
								style={[
									themes.get('title'),
									status.isRead ? themes.get('titleRead') : {},
								]}
							>
								{title}
							</Text>
							<View style={styles.row}>
								<Text style={themes.get('date')}>{pubDate}</Text>
								<Text style={[themes.get('footer'), styles.footerRight]}>
									{providerTitle}
								</Text>
							</View>
						</View>
					) : (
						<View style={[styles.content, styles.row]}>
							<View>
								<Image style={styles.img} source={{ uri: thumbnail }} />
								<Text style={themes.get('date')}>{pubDate}</Text>
							</View>
							<View style={styles.text}>
								<Text
									style={[
										themes.get('title'),
										status.isRead ? themes.get('titleRead') : {},
									]}
								>
									{title}
								</Text>
								<Text style={themes.get('footer')}>{providerTitle}</Text>
							</View>
						</View>
					)}
				</TouchableWithoutFeedback>
			</Animated.View>
		</View>
	);
};

export default ListItem;

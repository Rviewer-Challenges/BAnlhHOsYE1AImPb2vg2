import { useRef } from 'react';
import { FlatList } from 'react-native';

const FlatListSwipe = (props) => {
	let y = 0;
	let x = 0;
	let isScrolling = false;

	let list = useRef(null);

	return (
		<FlatList
			{...props}
			ref={list}
			onTouchStart={(evt) => {
				x = evt.nativeEvent.pageX;
				y = evt.nativeEvent.pageY;
			}}
			onTouchMove={(evt) => {
				let _x = Math.abs(x - evt.nativeEvent.pageX);
				let _y = Math.abs(y - evt.nativeEvent.pageY);
				if (_x > 5 && _y < 5 && !isScrolling) {
					list.current.setNativeProps({
						scrollEnabled: false,
					});
				}
				y = evt.nativeEvent.pageY;
			}}
			onTouchEnd={() =>
				list.current.setNativeProps({
					scrollEnabled: true,
				})
			}
			onTouchEndCapture={() =>
				list.current.setNativeProps({
					scrollEnabled: true,
				})
			}
			onScroll={() => {
				isScrolling = true;
			}}
			onScrollEndDrag={() => {
				isScrolling = false;
			}}
		/>
	);
};

export default FlatListSwipe;

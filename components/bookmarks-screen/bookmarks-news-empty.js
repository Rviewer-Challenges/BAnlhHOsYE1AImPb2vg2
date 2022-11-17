import NewsEmpty from '../news-empty/news-empty';
import { Path } from 'react-native-svg';

const BookmarksNewsEmpty = () => {
	return (
		<NewsEmpty
			texts={[
				'No has agregado favoritos.',
				'Marca una noticia como favorita deslizándola hacia la derecha en la ventana de home o en el botón de favorito dentro de una noticia.',
			]}
			icon={
				<>
					<Path
						d="M12.683 12.828a4.055 4.055 0 01-1.272.858 4.002 4.002 0 01-4.875-1.45l-1.658 1.119a6.063 6.063 0 001.621 1.62 5.963 5.963 0 002.148.903 6.035 6.035 0 003.542-.35 6.048 6.048 0 001.907-1.284c.272-.271.52-.571.734-.889l-1.658-1.119a4.147 4.147 0 01-.489.592z"
						fill="currentColor"
					/>
					<Path
						d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 2c2.953 0 5.531 1.613 6.918 4H3.082C4.469 3.613 7.047 2 10 2zm0 16c-4.411 0-8-3.589-8-8 0-.691.098-1.359.264-2H3v1a2 2 0 002 2h2a2 2 0 002-2h2a2 2 0 002 2h2a2 2 0 002-2V8h.736c.166.641.264 1.309.264 2 0 4.411-3.589 8-8 8z"
						fill="currentColor"
					/>
				</>
			}
		/>
	);
};

export default BookmarksNewsEmpty;

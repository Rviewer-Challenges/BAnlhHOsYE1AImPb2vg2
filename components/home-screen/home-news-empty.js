import NewsEmpty from '../news-empty/news-empty';
import { Path, Circle, Ellipse } from 'react-native-svg';

const HomeNewsEmpty = () => {
	return (
		<NewsEmpty
			texts={[
				'No se encontraron noticias.',
				'Revisa si tu dispositivo está conectado a internet, o asegúrate de tener algún proveedor de noticias seleccionado en las configuraciones.',
			]}
			icon={
				<>
					<Path
						d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
						fill="currentColor"
					/>
					<Circle cx="6.5" cy="8.5" r="1.5" fill="currentColor" />
					<Circle cx="13.493" cy="8.493" r="1.493" fill="currentColor" />
					<Ellipse cx="10" cy="13.5" rx="3" ry="2.5" fill="currentColor" />
				</>
			}
		/>
	);
};

export default HomeNewsEmpty;

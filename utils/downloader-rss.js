import NewsController from '../controllers/news-controller';
import ProvidersController from '../controllers/providers-controller';
import NewsContent from './news-content';
import { rsstojsonConvert } from './rss-to-json';
import Settings from './settings';
import NetInfo from '@react-native-community/netinfo';

const downloaderRSS = (db) => {
	return new Promise((res, rej) => {
		const settings = new Settings();
		const providersController = new ProvidersController(db);
		const newsController = new NewsController(db);
		let channels;
		let items = [];

		settings
			.get()
			.then(({ sources }) => {
				channels = sources
					.filter((source) => source.isActivated)
					.map((source) => source.url);
				return NetInfo.fetch();
			})
			.then((state) => {
				if (state.isConnected) {
					let getChannels = channels.map((channel) => fetch(channel));
					return Promise.all(getChannels);
				} else {
					return Promise.reject('No internet connection');
				}
			})
			.then((response) => {
				response = response.map((response) => response.text());
				return Promise.all(response);
			})
			.then((data) => {
				data = data.map((d, i) => {
					d = rsstojsonConvert(d);
					items.push(d.items);
					d['url'] = channels[i];
					d.items = null;
					return providersController.register(d);
				});
				return Promise.all(data);
			})
			.then((providersIds) => {
				let news = [];
				items.forEach((item, j) => {
					item = item.map((i) => {
						i.providerId = providersIds[j];
						return i;
					});
					news = [...news, ...item];
				});
				return newsController.register(news);
			})
			.then(() => newsController.getAll())
			.then((news) => {
				if (news.length > 0) {
					let newsContent;

					items.forEach((item, j) => {
						item = item.map((i) => {
							const n = news.find((element) => element.guid == i.guid);
							i.id = n.id;
							i.contentSaved = n.contentSaved;
							return i;
						});
					});

					newsContent = new NewsContent(newsController);
					newsContent.save(items).catch((error) => console.log('ERROR', error));
				}
				res(news);
			})
			.catch((error) => rej(error));
	});
};

export default downloaderRSS;

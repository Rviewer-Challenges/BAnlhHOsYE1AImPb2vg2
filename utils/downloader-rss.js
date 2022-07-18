import NewsController from '../controllers/news-controller';
import ProvidersController from '../controllers/providers-controller';
import { rsstojsonConvert } from './rss-to-json';

const downloaderRSS = (db) => {
	return new Promise((res, rej) => {
		const channels = ['http://feeds.weblogssl.com/xatakamx', 'https://blog.arduino.cc/feed/'];
		const getChannels = channels.map((channel) => fetch(channel));
		const providersController = new ProvidersController(db);
		const newsController = new NewsController(db);
		let items = [];

		Promise.all(getChannels)
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
			.then(() => res(newsController.getAll()))
			.catch((error) => rej(error));
	});
};

export default downloaderRSS;

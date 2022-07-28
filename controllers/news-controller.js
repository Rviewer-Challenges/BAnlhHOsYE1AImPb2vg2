import News from '../models/news';
import Providers from '../models/providers';
import { getTimeFromDate } from '../utils/custom-date';

/**
 * @name NewsController
 * @version 1.0.0
 * @author sgb004
 */

class NewsController {
	#db;
	#news;

	constructor(db) {
		this.#db = db;
		this.#news = new News(db);
	}

	register(data) {
		let result = [];
		data.forEach((item) => {
			result.push(this.registerOne(item));
		});
		return Promise.all(result);
	}

	registerOne(data) {
		return new Promise((res, rej) => {
			this.#news
				.findByGuid(data.guid)
				.then((id) => {
					if (id) {
						res(id);
					} else {
						return this.#news.add(data);
					}
				})
				.then((id) => res(id))
				.catch((error) => rej(error));
		});
	}

	getAll() {
		return new Promise((res, rej) => {
			const providers = new Providers(this.#db);
			let providersData = {};
			let ns = [];

			this.#news
				.get()
				.then((news) => {
					let getProviders = [];
					news.forEach((n) => {
						if (!providers[n.providerId]) {
							providers[n.providerId] = {};
							getProviders.push(providers.getById(n.providerId));
						}
					});

					ns = news;
					return Promise.all(getProviders);
				})
				.then((data) => {
					data.forEach((n) => {
						providersData[n.id] = n;
					});

					ns.map((n) => {
						n.provider = providersData[n.providerId];
						delete n.providerId;
						return n;
					});

					ns.sort((a, b) => getTimeFromDate(b.pubDate) - getTimeFromDate(a.pubDate));

					res(ns);
				})
				.catch((error) => rej(error));
		});
	}

	updateBookmark(id, status) {
		return this.#news.setBookmark(id, status);
	}

	updateRead(id, status) {
		return this.#news.setRead(id, status);
	}
}

export default NewsController;

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

	get(fn = 'get') {
		return new Promise((res, rej) => {
			this.#news
				[fn]()
				.then((news) => {
					news.sort((a, b) => getTimeFromDate(b.pubDate) - getTimeFromDate(a.pubDate));
					res(news);
				})
				.catch((error) => rej(error));
		});
	}

	getAll() {
		return this.get();
	}

	getBookmarks() {
		return this.get('getBookmarks');
	}

	updateBookmark(id, status) {
		return this.#news.setBookmark(id, status);
	}

	updateRead(id, status) {
		return this.#news.setRead(id, status);
	}

	updateContentSaved(id, status) {
		return this.#news.setContentSaved(id, status);
	}
}

export default NewsController;

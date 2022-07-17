import News from '../models/news';

/**
 * @name NewsController
 * @version 1.0.0
 * @author sgb004
 */

class NewsController {
	#news;

	constructor(db) {
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
		return this.#news.get();
	}
}

export default NewsController;

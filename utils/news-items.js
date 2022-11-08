import NewsController from '../controllers/news-controller';
import downloaderRSS from './downloader-rss';

class NewsItems {
	#db;
	#newsController;

	constructor(db) {
		this.#db = db;
		this.#newsController = new NewsController(this.#db);
	}

	downloadRSS() {
		return new Promise((res, rej) => {
			downloaderRSS(this.#db)
				.then((news) => {
					res(news);
				})
				.catch((error) => rej(error));
		});
	}

	getAllItems() {
		return new Promise((res, rej) => {
			this.#newsController
				.getAll()
				.then((news) => {
					res(news);
				})
				.catch((error) => rej(error));
		});
	}

	updateBookmark(id, status) {
		this.#newsController.updateBookmark(id, status);
	}

	updateRead(id, isRead) {
		this.#newsController.updateRead(id, isRead);
	}
}

export default NewsItems;

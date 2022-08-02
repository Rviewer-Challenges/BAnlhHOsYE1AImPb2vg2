import NewsController from '../controllers/news-controller';
import downloaderRSS from './downloader-rss';

class NewsItems {
	#db;
	#newsController;
	#timerDownloadRSS;
	#items = [];

	constructor(db) {
		this.#db = db;
		this.#newsController = new NewsController(this.#db);
	}

	downloadRSS() {
		clearTimeout(this.#timerDownloadRSS);

		downloaderRSS(this.#db)
			.then((news) => {
				console.log('Obteniendo automaticamente');

				this.#items = news;

				this.#timerDownloadRSS = setTimeout(() => {
					this.downloadRSS();
				}, 60000);
			})
			.catch((error) => console.log(error));
	}

	getAllItems() {
		return new Promise((res, rej) => {
			this.#newsController
				.getAll()
				.then((news) => {
					this.#items = news;
					res(news);
				})
				.catch((error) => rej(error));
		});
	}

	getAll() {
		return this.#items;
	}

	getBookmarks() {
		return this.#items.filter((item) => item.bookmark == 1);
	}

	updateBookmark(id, status) {
		this.#items = this.#items.map((item) => {
			if (item.id == id) {
				item.bookmark = status;
			}
			return item;
		});
		this.#newsController.updateBookmark(id, status);
	}

	updateRead(id, isRead) {
		this.#newsController.updateRead(id, isRead);
	}
}

export default NewsItems;

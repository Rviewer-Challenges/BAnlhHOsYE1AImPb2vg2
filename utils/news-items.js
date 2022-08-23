import NewsController from '../controllers/news-controller';
import downloaderRSS from './downloader-rss';
import NewsData from './news-data';

class NewsItems {
	#db;
	#newsController;
	#timerDownloadRSS;

	constructor(db) {
		this.#db = db;
		this.#newsController = new NewsController(this.#db);
	}

	downloadRSS() {
		clearTimeout(this.#timerDownloadRSS);

		downloaderRSS(this.#db)
			.then((news) => {
				console.log('Obteniendo automaticamente');

				NewsData.items = news;

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
					NewsData.items = news;
					res(news);
				})
				.catch((error) => rej(error));
		});
	}

	updateBookmark(id, status) {
		NewsData.updateBookmark(id, status);
		this.#newsController.updateBookmark(id, status);
	}

	updateRead(id, isRead) {
		NewsData.updateRead(id, isRead);
		this.#newsController.updateRead(id, isRead);
	}
}

export default NewsItems;

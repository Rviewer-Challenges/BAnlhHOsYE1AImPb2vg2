import DB_LOADED from './db-sqlite-loaded';
import NewsItems from './news-items';

class NewsData {
	static #items = [];
	static #newsItems;
	static needReload = false;

	static init() {
		NewsData.#newsItems = new NewsItems(DB_LOADED.get());
	}

	static getAll() {
		return NewsData.#items;
	}

	static getBookmarks() {
		return NewsData.#items.filter((item) => item.bookmark == 1);
	}

	static updateBookmark(id, status) {
		NewsData.#items = NewsData.#items.map((item) => {
			if (item.id == id) {
				item.bookmark = status;
			}
			return item;
		});
		NewsData.#newsItems.updateBookmark(id, status);
	}

	static updateRead(id, isRead) {
		NewsData.#items = NewsData.#items.map((item) => {
			if (item.id == id) {
				item.read = isRead;
			}
			return item;
		});
		NewsData.#newsItems.updateRead(id, isRead);
	}

	static reload() {
		return new Promise((res, rej) => {
			NewsData.#newsItems
				.downloadRSS()
				.then((news) => {
					NewsData.#items = news;
					res(news);
				})
				.catch((error) => rej(error));
		});
	}
}

export default NewsData;

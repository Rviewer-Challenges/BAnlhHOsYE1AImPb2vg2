import DB_LOADED from './db-sqlite-loaded';
import NewsItems from './news-items';

class NewsData {
	static items;
	static newsItems;
	static needReload = false;

	static init() {
		const newsItems = new NewsItems(DB_LOADED.get());
		newsItems.downloadRSS();

		NewsData.newsItems = newsItems;
	}

	static getAll() {
		return NewsData.items;
	}

	static getBookmarks() {
		return NewsData.items.filter((item) => item.bookmark == 1);
	}

	static updateBookmark(id, status) {
		NewsData.items = NewsData.items.map((item) => {
			if (item.id == id) {
				item.bookmark = status;
			}
			return item;
		});
	}

	static updateRead(id, isRead) {
		NewsData.items = NewsData.items.map((item) => {
			if (item.id == id) {
				item.read = isRead;
			}
			return item;
		});
	}

	static reload() {
		return new Promise((res, rej) => {
			NewsData.newsItems
				.downloadRSS()
				.then(() => res())
				.catch((error) => rej(error));
		});
	}
}

export default NewsData;

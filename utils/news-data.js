class NewsData {
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
}

export default NewsData;

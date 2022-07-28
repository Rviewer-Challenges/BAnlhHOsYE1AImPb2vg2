/**
 * @name News
 * @version 1.0.0
 * @author sgb004
 */

class News {
	#db;

	constructor(db) {
		this.#db = db;
		this.#db.execute(
			`CREATE TABLE IF NOT EXISTS news(
				id INTEGER PRIMARY KEY NOT NULL, 
				providerId INTEGER, 
				guid TEXT,
				title TEXT,
				pubDate TEXT,
				link TEXT,
				author TEXT,
				thumbnail TEXT,
				read BOOL,
				bookmark BOOL
			);`
		);
	}

	add(data) {
		return new Promise((res, rej) =>
			this.#db
				.execute(
					'INSERT INTO news (providerId, guid, title, pubDate, link, author, thumbnail, read, bookmark) values (?, ?, ?, ?, ?, ?, ?, 0, 0)',
					[
						data.providerId,
						data.guid,
						data.title,
						data.pubDate,
						data.link,
						data.author,
						data.thumbnail,
					]
				)
				.then((result) => res(result.insertId))
				.catch((error) => rej(error))
		);
	}

	get() {
		return new Promise((res, rej) => {
			this.#db
				.select('SELECT * FROM news')
				.then((rows) => res(rows))
				.catch((error) => rej(error));
		});
	}

	findByGuid(guid) {
		return new Promise((res, rej) => {
			this.#db
				.select('SELECT id FROM news WHERE guid=?', [guid])
				.then((rows) => res(rows.length == 0 ? undefined : rows[0].id))
				.catch((error) => rej(error));
		});
	}

	setBookmark(id, bookmark) {
		return new Promise((res, rej) => {
			this.#db
				.execute('UPDATE news SET bookmark = ? WHERE id = ?', [bookmark, id])
				.then((result) => res(result))
				.catch((error) => rej(error));
		});
	}
}

export default News;

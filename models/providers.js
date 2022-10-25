/**
 * @name Providers
 * @version 1.0.0
 * @author sgb004
 */

class Providers {
	#db;

	constructor(db) {
		this.#db = db;
		this.#db.execute(
			`CREATE TABLE IF NOT EXISTS providers(
			        id INTEGER PRIMARY KEY NOT NULL,
					url TEXT,
					title TEXT,
					link TEXT,
					author TEXT,
					description TEXT,
					image TEXT,
					activated BOOL
			 );`
		);
	}

	add(data) {
		return new Promise((res, rej) =>
			this.#db
				.execute(
					'INSERT INTO providers(url, title, link, author, description, image, activated) VALUES(?, ?, ?, ?, ?, ?, 1);',
					[data.url, data.title, data.link, data.author, data.description, data.image]
				)
				.then((result) => res(result.insertId))
				.catch((error) => rej(error))
		);
	}

	findByUrl(url) {
		return new Promise((res, rej) => {
			this.#db
				.select('SELECT id FROM providers WHERE url=?', [url])
				.then((rows) => res(rows.length == 0 ? undefined : rows[0].id))
				.catch((error) => rej(error));
		});
	}

	getById(id) {
		return new Promise((res, rej) => {
			this.#db
				.select('SELECT * FROM providers WHERE id=?', [id])
				.then((rows) => res(rows.length == 0 ? undefined : rows[0]))
				.catch((error) => rej(error));
		});
	}

	setActivate(url, status) {
		return new Promise((res, rej) => {
			this.#db
				.execute('UPDATE providers SET activated = ? WHERE url = ?', [status, url])
				.then((result) => res(result))
				.catch((error) => rej(error));
		});
	}
}

export default Providers;

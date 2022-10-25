import DB_SQLite from './db-sqlite';

class DB_LOADED {
	static #db;

	static init() {
		DB_LOADED.#db = new DB_SQLite('data106.db');
	}

	static get() {
		return DB_LOADED.#db;
	}
}

export default DB_LOADED;

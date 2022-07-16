import * as SQLite from 'expo-sqlite';

class DB_SQLite {
	#db;

	/**
	 *
	 * @param string file
	 */
	constructor(file) {
		this.#db = SQLite.openDatabase(file);
	}

	/**
	 *
	 * @param string sql
	 * @param array args
	 * @param function callback
	 * @param function errorCallback
	 */
	execute(sql, args = [], callback, errorCallback) {
		this.#db.transaction((tx) => {
			tx.executeSql(sql, args, callback, errorCallback);
		});
	}

	/**
	 *
	 * @param string sql
	 * @param array args
	 * @param function callback
	 * @param function errorCallback
	 */
	select(sql, args, callback, errorCallback) {
		this.#db.transaction((tx) => {
			tx.executeSql(
				sql,
				args,
				(_, { rows }) => callback(rows._array),
				(_, error) => errorCallback(error)
			);
		});
	}
}

export default DB_SQLite;

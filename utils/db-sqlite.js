import * as SQLite from 'expo-sqlite';

/**
 * @name DB_SQLite
 * @version 1.0.0
 * @author sgb004
 */

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
	 */
	execute(sql, args = []) {
		return new Promise((res, rej) =>
			this.#db.transaction((tx) => {
				tx.executeSql(
					sql,
					args,
					(_, result) => res(result),
					(_, error) => rej(error)
				);
			})
		);
	}

	/**
	 *
	 * @param string sql
	 * @param array args
	 */
	select(sql, args = []) {
		return new Promise((res, rej) =>
			this.#db.transaction((tx) => {
				tx.executeSql(
					sql,
					args,
					(_, { rows }) => res(rows._array),
					(_, error) => rej(error)
				);
			})
		);
	}
}

export default DB_SQLite;

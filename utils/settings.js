import * as FileSystem from 'expo-file-system';

class Settings {
	static #options = {};
	#settingsFile = '';

	constructor() {
		this.#settingsFile = FileSystem.documentDirectory + 'settings.json';
	}

	buildDefault() {
		Settings.#options = {
			theme: 'automatic',
			sources: [
				{
					name: 'Xataka México',
					url: 'http://feeds.weblogssl.com/xatakamx',
					isActivated: true,
				},
				{ name: 'Arduino', url: 'https://blog.arduino.cc/feed', isActivated: true },
			],
		};

		return new Promise((res, rej) => {
			this.save()
				.then(() => res())
				.catch((error) => rej(error));
		});
	}

	get() {
		return new Promise((res, rej) => {
			if (Settings.#options.theme != undefined) {
				res(Settings.#options);
			} else {
				FileSystem.getInfoAsync(this.#settingsFile)
					.then((info) => {
						if (info.exists && !info.isDirectory) {
							this.read()
								.then((data) => {
									Settings.#options = data;
									res(data);
								})
								.catch((error) => rej(error));
						} else {
							this.buildDefault()
								.then(() => {
									res(Settings.#options);
								})
								.catch((error) => rej(error));
						}
					})
					.catch((error) => rej(error));
			}
		});
	}

	read() {
		return new Promise((res, rej) => {
			FileSystem.readAsStringAsync(this.#settingsFile)
				.then((data) => {
					try {
						res(JSON.parse(data));
					} catch (error) {
						rej(error);
					}
				})
				.catch((error) => rej(error));
		});
	}

	set(key, value) {
		Settings.#options[key] = value;
		return new Promise((res, rej) => {
			this.save()
				.then(() => res(Settings.#options))
				.catch((error) => rej(error));
		});
	}

	save() {
		return new Promise((res, rej) => {
			FileSystem.writeAsStringAsync(this.#settingsFile, JSON.stringify(Settings.#options))
				.then(() => res())
				.catch((error) => rej(error));
		});
	}
}

export default Settings;

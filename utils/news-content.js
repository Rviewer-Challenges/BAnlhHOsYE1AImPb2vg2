import * as FileSystem from 'expo-file-system';

class NewsContent {
	constructor(newsController) {
		this.newsController = newsController;
		this.dir = FileSystem.documentDirectory + 'news/';
	}

	save(items) {
		return new Promise((res, rej) => {
			this.makeDirectory()
				.then(() => {
					this.items = items;
					this.saveAll(res);
				})
				.catch((error) => rej(error));
		});
	}

	saveAll(res) {
		if (this.items.length == 0) return res();
		let item = this.items[0].shift();
		if (this.items[0].length == 0) this.items.shift();
		if (item.contentSaved == 1) {
			this.saveAll(res);
		} else {
			this.saveContent(item.id, item.content)
				.then(() => this.saveAll(res))
				.catch((error) => rej(error));
		}
	}

	makeDirectory() {
		return new Promise((res, rej) => {
			FileSystem.getInfoAsync(this.dir)
				.then((info) => (info.exists ? null : FileSystem.makeDirectoryAsync(this.dir)))
				//.then(() => FileSystem.readDirectoryAsync(this.dir))
				//.then((info) => console.log({ info }))
				.then(() => res())
				.catch((error) => rej(error));
		});
	}

	saveContent(id, content) {
		return new Promise((res, rej) => {
			FileSystem.writeAsStringAsync(`${this.dir}${id}-content.txt`, content)
				.then(() => this.newsController.updateContentSaved(id, true))
				.then(() => res())
				.catch((error) => rej('ERROR', error));
		});
	}

	getFileContent(id) {
		return new Promise((res, rej) => {
			FileSystem.readAsStringAsync(`${this.dir}${id}-content.txt`)
				.then((data) => res(data))
				.catch((error) => rej(error));
		});
	}
}

export default NewsContent;

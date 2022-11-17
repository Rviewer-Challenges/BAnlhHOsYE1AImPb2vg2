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
			this.saveContent(item.id, this.cleanContent(item.content, item.thumbnail))
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

	cleanContent(content, thumbnail = '') {
		const attrs = ['href', 'src', 'alt', 'width', 'height', 'lang', 'dir'];
		let socialMediaScripts = '';

		if (thumbnail != '') {
			let imgPosition = content.indexOf(thumbnail);

			let tagIni = content.lastIndexOf('<', imgPosition);
			let tagEnd = content.indexOf('>', imgPosition);
			let tag = content.substring(tagIni, tagEnd + 1);
			content = content.replace(tag, '');
		}

		content = content.replace(/<script/gm, '<!--<script');
		content = content.replace(/<\/script>/gm, '</script>-->');
		content = content.replace(/<style/gm, '<!--<style');
		content = content.replace(/<\/style>/gm, '</style>-->');
		content = content.replace(/<meta/gm, '<no-meta');
		content = content.replace(/<link/gm, '<no-link');
		content = content.replace(/src="\/\//gm, 'src="https://');
		content = content.replace(/src='\/\//gm, "src='https://");
		content = content.replace(/=/gm, '&#61;');
		content = content.replace(
			/<blockquote class&#61;"twitter-tweet">/gm,
			'<blockquote class="twitter-tweet">'
		);
		content = content.replace(
			/<blockquote class&#61;"instagram-media"/gm,
			'<blockquote class="instagram-media"'
		);

		for (let i = 0; i < attrs.length; i++) {
			content = content.replace(RegExp(attrs[i] + '&#61;', 'gm'), attrs[i] + '=');
		}

		//FOR TWITTER
		if (content.indexOf('<blockquote class="twitter-tweet">') > -1) {
			socialMediaScripts +=
				'<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
		}

		//FOR INSTAGRAM
		if (content.indexOf('<blockquote class="instagram-media"') > -1) {
			socialMediaScripts +=
				'<script async src="https://www.instagram.com/embed.js"></script>';
		}

		return content + socialMediaScripts;
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

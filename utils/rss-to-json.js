import matchAll from 'string.prototype.matchall';

/**
 * rss to json
 * @version 1.0.0
 * @author sgb004
 * @description Some regex were taken from answers of https://stackoverflow.com/a/41590567 https://stackoverflow.com/a/317081 https://stackoverflow.com/a/39243641 https://stackoverflow.com/a/1454936 and the json structure was inspired in https://rss2json.com
 */

class RSStoJSON {
	/**
	 *
	 */

	htmlEntities = {
		nbsp: ' ',
		cent: '¢',
		pound: '£',
		yen: '¥',
		euro: '€',
		copy: '©',
		reg: '®',
		lt: '<',
		gt: '>',
		quot: '"',
		amp: '&',
		apos: "'",
	};

	unescapeHTML = (str) => {
		const fn = (entity, entityCode) => {
			let match;

			if (entityCode in this.htmlEntities) {
				return this.htmlEntities[entityCode];
				/*eslint no-cond-assign: 0*/
			} else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
				return String.fromCharCode(parseInt(match[1], 16));
				/*eslint no-cond-assign: 0*/
			} else if ((match = entityCode.match(/^#(\d+)$/))) {
				return String.fromCharCode(~~match[1]);
			} else {
				return entity;
			}
		};
		return str.replace(/\&([^;]+);/g, fn.bind(this));
	};

	/**
	 *
	 * METHODS TO GET DATA FROM TAGS
	 *
	 */

	getPatron = (tag) => RegExp('<' + tag + '[^>]*?>([\\s\\S]*?)<\\/' + tag + '>', 'gm');

	// prettier-ignore
	getPatronAC = (tag) => RegExp('<' + tag + '[^>]*?\/>', 'gm');

	getDataFromPatron(data, tag, key = 1) {
		let result = matchAll(data, this.getPatron(tag));
		result = [...result];
		return result[0] ? result[0][key].trim() : '';
	}

	getDataFromPatronAC(data, tag) {
		let attrs = {};
		let result = matchAll(data, this.getPatronAC(tag));
		result = [...result];
		if (result[0]) {
			attrs = this.getAttrs(result[0][0]);
		}
		return attrs;
	}

	getAttrs(data) {
		let attrs = {};
		let result = matchAll(data, /(\w+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)/gm);
		result = [...result];
		result.forEach((attr) => {
			attrs[attr[1]] = attr[2];
		});
		return attrs;
	}

	removeTags = (s) => s.replace(/<[^>]*?>/gm, '');

	/**
	 *
	 * METHODS TO BUILD JSON
	 *
	 */

	convert(data) {
		const items = this.getItems(data);
		let info;
		data = data.replace(this.getPatron('(item|entry)'), '');
		info = this.getInfo(data);

		return { ...info, ...items };
	}

	getItems(data) {
		let items = [];
		let resultItems = matchAll(data, this.getPatron('item'));
		let resultEntries = matchAll(data, this.getPatron('entry'));
		let result = [...resultItems, ...resultEntries];

		result.forEach((item) => {
			items.push(this.getItem(item[1]));
		});

		return { items };
	}

	getItem(data) {
		const title = this.getTitle(data);
		const pubDate = this.getPubDate(data);
		const link = this.getLink(data);
		const guid = this.getDataFromPatron(data, '(guid|id)', 2);
		const author = this.getAuthor(data);
		const description = this.unescapeHTML(this.getDataFromPatron(data, 'description'));
		const content = this.unescapeHTML(this.getDataFromPatron(data, 'content'));
		let thumbnail = this.getThumbnail(data);
		if (thumbnail === '') {
			thumbnail = this.getThumbnailFromImgTag(description + ' ' + content);
		}

		return { title, pubDate, link, guid, author, thumbnail };
	}

	getInfo(data) {
		let info = {
			url: '',
			title: '',
			link: '',
			author: '',
			description: '',
			image: '',
		};

		info.image = this.getImage(data);
		data = data.replace(this.getPatron('image'), '');

		info.title = this.getTitle(data);
		info.link = this.getLink(data);
		info.author = this.getDataFromPatron(data, 'author');
		info.description = this.getDataFromPatron(data, 'description');
		return info;
	}

	getTitle(data) {
		let title = this.getDataFromPatron(data, 'title');
		if (title.startsWith('<![CDATA[')) {
			let t = matchAll(title, /<!\[CDATA\[(.*?)(?=\]\]>)/gm);
			t = [...t];
			title = t[0][1];
		}
		return title.trim();
	}

	getPubDate(data) {
		let pubDate = this.getDataFromPatron(data, '(pubDate|updated)', 2);

		if (pubDate !== '') {
			pubDate = new Date(pubDate);
			pubDate = `${pubDate
				.toISOString()
				.replace('T', ' ')
				.replace(/\.+(\d)+(Z)/gm, '')}`;
		}

		return pubDate;
	}

	getLink(data) {
		let link = this.getDataFromPatron(data, 'link');
		if (link === '') {
			const attrs = this.getDataFromPatronAC(data, 'link');
			link = attrs.href ?? '';
		}
		return link;
	}

	getAuthor(data) {
		let author = this.getDataFromPatron(data, '(author|dc:creator)', 2);
		return this.removeTags(author);
	}

	getThumbnail(data) {
		let thumbnail = this.getDataFromPatron(
			data,
			'(thumbnail|media:thumbnail|media:content)',
			3
		);
		if (thumbnail === '') {
			const attrs = this.getDataFromPatronAC(data, '(media:thumbnail|media:content)');
			thumbnail = attrs.url ?? '';
		}
		return thumbnail;
	}

	getThumbnailFromImgTag(data) {
		let imgs = matchAll(data, /<img[^>]+src="([^">]+)"/gm);
		imgs = [...imgs];
		return imgs[0] ? imgs[0][1] : '';
	}

	getImage(data) {
		let image = this.getDataFromPatron(data, 'image');
		if (image.startsWith('<')) {
			image = this.getDataFromPatron(data, 'url');
		}
		return image;
	}
}

export const rsstojsonConvert = (data) => {
	const rsstojson = new RSStoJSON();
	return rsstojson.convert(data);
};

export default RSStoJSON;

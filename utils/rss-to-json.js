/**
 * rss to json
 * @version 1.0.0
 * @author sgb004
 * @description The regex was taken from the answer of https://stackoverflow.com/a/41590567 and the json structure was inspired in https://rss2json.com
 */

const patron = /<item[^>]*?>([\s\S]*?)<\/item>/gm;
const patronTitle = /<title[^>]*?>([\s\S]*?)<\/title>/gm;
//const patronLink = /<link[^>]*?>([\s\S]*?)<\/link>/gm;
const patronLink = RegExp('<link[^>]*?>([\\s\\S]*?)<\\/link>', 'gm');

const getItems = (data) => {
	let items = [];
	let result = data.matchAll(patron);
	result = [...result];

	result.forEach(item =>{
		items.push(getItem(item[1]));
	});
	
	return {items};
}

const getItem = (data) => {
	const title = getTitle(data);
	const link = getLink(data);
	return {title, link};
}

const getTitle = (data) => {
	let result = data.matchAll(patronTitle);
	result = [...result];
	return result[0][1];
}

const getLink = (data) => {
	let result = data.matchAll(patronLink);
	result = [...result];
	console.log(result);
	return result[0][1];
}

/*
const getLink = (data) => {
	let result = data.matchAll(patronLink);
	result = [...result];
	return result[0][1];
}
*/
fetch('http://feeds.weblogssl.com/xatakamx')
	//fetch('./test.xml')
	.then((response) => response.text())
	.then((data) => {
		const j = getItems(data);
		console.log(j);
		
		/*
		//console.log(data);
		console.log([...result]);
		data = data.replace(patron, '');
		console.log(data);

		const title = data.matchAll(patronTitle);
		console.log([...title]);
		*/
	});

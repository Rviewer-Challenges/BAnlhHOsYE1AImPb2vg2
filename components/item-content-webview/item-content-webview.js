import { Linking } from 'react-native';
import WebView from 'react-native-webview';
import NewsData from '../../utils/news-data';
import Themes from '../../utils/themes';

const ItemContentWebView = ({
	id,
	thumbnail,
	title,
	pubDate,
	providerTitle,
	link,
	source,
	bookmark,
	onReady,
}) => {
	const bookmarkButton = `
	<button id="bookmark-btn" class="button ${bookmark ? 'selected' : ''}">
		<svg width="26" height="32" viewBox="0 0 26 32" xmlns="http://www.w3.org/2000/svg"><path d="M22.75 0H3.25C1.458 0 0 1.435 0 3.2V32l13-7.315L26 32V3.2C26 1.435 24.542 0 22.75 0zm0 26.485L13 21l-9.75 5.485V3.2h19.5z"/></svg>
	</button>`;

	return (
		<WebView
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: 'transparent',
			}}
			originWhitelist={['*']}
			javaScriptEnabled={true}
			onMessage={(event) => {
				try {
					const { type, message } = JSON.parse(event.nativeEvent.data);
					if (type == 'link') {
						Linking.openURL(message);
					} else if (type == 'ready') {
						onReady();
					} else if (type == 'bookmark') {
						NewsData.updateBookmark(id, message);
					}
				} catch (e) {
					console.log(e);
				}
			}}
			source={{
				html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
					<title></title>
					<style>
						/* https://necolas.github.io/normalize.css/ */
						html {line-height: 1.15;-webkit-text-size-adjust: 100%;}body {margin: 0}main {display: block;}hr {box-sizing: content-box;height: 0;overflow: visible;}pre {font-family: monospace, monospace;font-size: 1rem;}a {background-color: transparent;}abbr[title] {border-bottom: none;text-decoration: underline;text-decoration: underline dotted;}b, strong {font-weight: bolder;}code, kbd, samp {font-family: monospace, monospace;font-size: 1rem;}small {font-size: 80%;}sub, sup {font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}sub {bottom: -0.25rem;}sup {top: -0.5rem;}img {border-style: none;}button, input, optgroup, select, textarea {font-family: inherit;font-size: 100%;line-height: 1.15;margin: 0;}button, input {overflow: visible;}button, select {text-transform: none;}button, [type="button"], [type="reset"], [type="submit"] {-webkit-appearance: button;}button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {border-style: none;padding: 0;}button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring {outline: 1px dotted ButtonText;}fieldset {padding: 0.35em 0.75em 0.625rem;}legend {box-sizing: border-box;color: inherit;display: table;max-width: 100%;padding: 0;white-space: normal;}progress {vertical-align: baseline;}textarea {overflow: auto;}[type="checkbox"], [type="radio"] {box-sizing: border-box;padding: 0;}[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {height: auto;}[type="search"] {-webkit-appearance: textfield;outline-offset: -2px;}[type="search"]::-webkit-search-decoration {-webkit-appearance: none;}::-webkit-file-upload-button {-webkit-appearance: button;font: inherit;}details {display: block;}summary {display: list-item;}template {display: none;}[hidden] {display: none;}
						/* CUSTOM */
						:root{
							${
								Themes.theme == 'dark'
									? `
							--body-color: #ececec;
							--body-background-color: #2c2c2c;
							--blockquote-border-color: #94A5F1;
							--a-color: #94A5F1;
							--a-hover-color: #219ebc;
							--a-active-color: #4361ee;
							--td-border-color: #5D6290;
							--th-background: #2A2725;
							--cover-button-fill: #03071e;
							--cover-button-background: rgba( 255, 255, 255, 0.5 );
							--cover-button-selected-fill: #BA9458;
							--cover-button-selected-background: rgba(61, 45, 0, 0.5);
							--go-to-btn-background: #354f52;
							--go-to-btn-color: #dde5b6;
							--go-to-btn-focus-color: #dde5b6;
							--go-to-btn-fill: #dde5b6;
							`
									: `
							--body-color: #03071e;
							--body-background-color: #f2f2f2;
							--blockquote-border-color: #bbd0ff;
							--a-color: #4361ee;
							--a-hover-color: #219ebc;
							--a-active-color: #023047;
							--td-border-color: #2b2d42;
							--th-background: #f7ede2;
							--cover-button-fill: #03071e;
							--cover-button-background: rgba( 255, 255, 255, 0.5 );
							--cover-button-selected-fill: #3D2D00;
							--cover-button-selected-background: rgba( 255, 214, 10, 0.5 );
							--go-to-btn-background: #dde5b6;
							--go-to-btn-color: #354f52;
							--go-to-btn-focus-color: #354f52;
							--go-to-btn-fill: #354f52;
							`
							}
						}
						body{
							font-size: 16px;
							color: var(--body-color);
							background-color: var(--body-background-color);
						}
						h1{
							font-size: 1.5rem;
						}
						h2{
							font-size: 1.3rem;
						}
						h3{
							font-size: 1.2rem;
						}
						h4{
							font-size: 1.1rem;
						}
						h5, h6{
							font-size: 1rem;
						}
						p, h1, h2, h3, h4, h5, h6{
							margin-top: 0.85rem;
							margin-bottom: 0.85rem;
						}
						p{
							font-size: 1rem;
						}
						blockquote{
							border-left: 1em solid var(--blockquote-border-color);
							padding-left: 1rem;
							margin: 1rem;
							font-style: italic;
						}
						img{
							max-width: 100%;
							height: auto;
							display: block;
							margin: 0 auto 0.85rem;
						}
						iframe{
							width: 100% !important;
							border: none;
						}
						figure{
							margin: 0;
						}
						a{
							color: var(--a-color);
							text-decoration: none;
						}
						a:hover, a:focus{
							color: var(--a-hover-color);
						}
						a:active, a:visited{
							color: var(--a-active-color);
						}
						ul{
							padding-inline-start: 1.25rem;
						}
						ol{
							padding-inline-start: 1.5rem;
						}
						table{
							border-spacing: 0;
							border-collapse: collapse;
						}
						td, th{
							border: 1px solid var(--td-border-color);
							padding: 0.25rem;
						}
						th{
							background: var(--th-background);
						}
						table p{
							margin: 0;
						}
						.button{
							display: flex;
							justify-content: center;
							align-items: center;
							width: 3.2rem;
							height: 3.2rem;
							border-radius: 50%;
							outline: none;
							-webkit-tap-highlight-color: rgba(0,0,0,0);
							transition: all 250ms;
							transition-timing-function: ease;
						}
						.button svg{
							width: auto;
							height: 50%;
							transition: transform 250ms;
							transition-timing-function: ease;
						}
						.button:active svg, .button:active span{
							transform: scale(0.5);
						}
						.cover{
							width: 100%;
							height: 38vh;
							background-image: url('${thumbnail}');
							background-position: center;
							background-size: cover;
							display: flex;
						}
						#bookmark-btn{
							-webkit-appearance: none;
							margin: auto 0.6rem 0.6rem auto;
							fill: var(--cover-button-fill);
							border: none;
							background: var(--cover-button-background);
							backdrop-filter: blur( 4px );
							-webkit-backdrop-filter: blur( 4px );
						}
						#bookmark-btn.selected{
							fill: var(--cover-button-selected-fill);
							background: var(--cover-button-selected-background);
						}
						.content{
							padding: 0 0.6rem 4.3rem;
						}
						.header{
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
						}
						.header .header-title{
							width: 100%;
							margin-top: 0.75rem;
							margin-bottom: 0.3rem;
						}
						.header span{
							font-size: 0.9rem;
						}
						.header.no-thumbnail{
							padding-top: 2rem;
						}
						.header.no-thumbnail .header-title{
							width: calc(100% - 5rem);
						}
						.header.no-thumbnail #bookmark-btn{
							margin: auto 0 auto auto;
						}
						.header.no-thumbnail span{
							margin-top: 0.35rem;
						}
						.go-to-btn{
							position: fixed;
							background-color: var(--go-to-btn-background);
							bottom: 0.6rem;
							right: 0.6rem;
							left: auto;
							margin: auto;
							right: 0.6rem;
							color: var(--go-to-btn-color);
						}
						.go-to-btn:focus, .go-to-btn:active{
							color: var(--go-to-btn-focus-color);
						}
						.go-to-btn svg{
							fill: var(--go-to-btn-fill);
						}
						.go-to-btn span{
							display: block;
							font-weight: 600;
							white-space: nowrap;
							text-align: center;
							width: 0;
							overflow: hidden;
							margin-left: 0;
							opacity: 0;
							transition: all 250ms;
							transition-timing-function: ease-in;
						}
						.scroll-bottom .go-to-btn{
							width: 50vw;
							border-radius: 10px;
							right: 25vw;
						}
						.scroll-bottom .go-to-btn span{
							opacity: 1;
							width: 90px;
							margin-left: 2.5vw;
						}
					</style>
				</head>
				<body>
				<div class="container">
					${thumbnail ? `<div class="cover">${bookmarkButton}</div>` : ''}
					<div class="content">
						<header class="header ${thumbnail ? '' : 'no-thumbnail'}">
							<h1 class="header-title">${title.replace(/\n|\r/g, '<br>')}</h1>
							${thumbnail ? '' : `${bookmarkButton}`}
							<span class="header-date">${pubDate}</span>
							<span class="header-provider-name">${providerTitle}</span>
						</header>
						${source.replace(/<blockquote/g, '<blockquote data-theme="' + Themes.theme + '"')}
						<a href="${link}" id="go-to-btn" class="button go-to-btn">
							<svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M10 0l3.293 3.293-7 7 1.414 1.414 7-7L18 8V0z"/><path d="M16 16H2V2h7L7 0H2C.897 0 0 .897 0 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2z"/></svg>
							<span>Visitar sitio</span>
						</a>
					</div>
				</div>
				<script>
					const postMessage = (type, message) =>
						window.ReactNativeWebView.postMessage(JSON.stringify({ type, message }));

					const links = document.querySelectorAll('a');

					const scroll = () => {
						if (Math.ceil(window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) {
							document.body.classList.add('scroll-bottom');
						}else{
							document.body.classList.remove('scroll-bottom');
						}
					};

					const showGotoBtn = () => {
						const gotoBtn = document.getElementById('go-to-btn');
						const contentHeight = document.body.clientHeight - gotoBtn.offsetHeight;
						if(contentHeight < window.innerHeight) scroll();
					}
					
					function linkClick(e){
						e.preventDefault();
						postMessage('link', this.href);
					};
			
					for (let i = 0; i < links.length; i++) {
						links[i].addEventListener('click', linkClick);
					}

					document.addEventListener('DOMContentLoaded', () => {
						setTimeout(() => {
							postMessage('ready');
						}, 100);
						${source == '' ? '' : 'showGotoBtn();'}
					}, false);

					window.addEventListener('scroll', () => scroll());

					const bookmarkBtn = document.getElementById('bookmark-btn');
					let isBookmark = ${bookmark ? 'true' : 'false'};
					bookmarkBtn.addEventListener('click', () => {
						isBookmark = !isBookmark;
						bookmarkBtn.classList[isBookmark ? 'add' : 'remove']('selected');
						postMessage('bookmark', isBookmark);
					});

				</script>
				</body>
				</html>`,
			}}
		/>
	);
};

export default ItemContentWebView;

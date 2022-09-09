import { useRef, useState } from 'react';
import { Dimensions, Linking, PixelRatio, View } from 'react-native';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';

const windowHeight = Dimensions.get('window').height;

const ItemContentWebView = ({ source, onReady }) => {
	let [height, setHeight] = useState(windowHeight);

	return (
		<WebView
			style={{
				width: '100%',
				height: height,
				borderWidth: 5,
				backgroundColor: 'transparent',
			}}
			originWhitelist={['*']}
			javaScriptEnabled={true}
			scrollEnabled={false}
			onMessage={(event) => {
				try {
					const { type, message } = JSON.parse(event.nativeEvent.data);
					if (type == 'height') {
						setHeight(Number(message) + Constants.statusBarHeight);
					} else if (type == 'link') {
						Linking.openURL(message);
					} else if (type == 'ready') {
						onReady();
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
						html {line-height: 1.15;-webkit-text-size-adjust: 100%;}body {margin: 0;}main {display: block;}h1 {font-size: 2em;margin: 0.67em 0;}hr {box-sizing: content-box;height: 0;overflow: visible;}pre {font-family: monospace, monospace;font-size: 1em;}a {background-color: transparent;}abbr[title] {border-bottom: none;text-decoration: underline;text-decoration: underline dotted;}b, strong {font-weight: bolder;}code, kbd, samp {font-family: monospace, monospace;font-size: 1em;}small {font-size: 80%;}sub, sup {font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}sub {bottom: -0.25em;}sup {top: -0.5em;}img {border-style: none;}button, input, optgroup, select, textarea {font-family: inherit;font-size: 100%;line-height: 1.15;margin: 0;}button, input {overflow: visible;}button, select {text-transform: none;}button, [type="button"], [type="reset"], [type="submit"] {-webkit-appearance: button;}button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {border-style: none;padding: 0;}button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring {outline: 1px dotted ButtonText;}fieldset {padding: 0.35em 0.75em 0.625em;}legend {box-sizing: border-box;color: inherit;display: table;max-width: 100%;padding: 0;white-space: normal;}progress {vertical-align: baseline;}textarea {overflow: auto;}[type="checkbox"], [type="radio"] {box-sizing: border-box;padding: 0;}[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {height: auto;}[type="search"] {-webkit-appearance: textfield;outline-offset: -2px;}[type="search"]::-webkit-search-decoration {-webkit-appearance: none;}::-webkit-file-upload-button {-webkit-appearance: button;font: inherit;}details {display: block;}summary {display: list-item;}template {display: none;}[hidden] {display: none;}
						/* CUSTOM */
						h2{
							font-size: 1.3em;
						}
						h3{
							font-size: 1.2em;
						}
						h4{
							font-size: 1.1em;
						}
						h5, h6{
							font-size: 1em;
						}
						p, h1, h2, h3, h4, h5, h6{
							margin-top: 0.85em;
							margin-bottom: 0.85em;
						}
						blockquote{
							border-left: 1em solid #bbd0ff;
							padding-left: 1em;
							margin: 1em;
							font-style: italic;
						}
						img{
							max-width: 100%;
							height: auto;
							display: block;
							margin: 0 auto 0.85em;
						}
						iframe{
							width: 100% !important;
							border: none;
						}
						figure{
							margin: 0;
						}
						a{
							color: #4361ee;
							text-decoration: none;
						}
						a:hover, a:focus{
							color: #219ebc;
						}
						a:active, a:visited{
							color: #023047
						}
						ul{
							padding-inline-start: 1.25em;
						}
						ol{
							padding-inline-start: 1.5em;
						}
						table{
							border-spacing: 0;
							border-collapse: collapse;
						}
						td, th{
							border: 1px solid #2b2d42;
							padding: 0.25em;
						}
						th{
							background: #d9d9d9;
							background: #f7ede2;
						}
						table p{
							margin: 0;
						}
						img{
							display: none;
						}
					</style>
				</head>
				<body>
				${source}
				<script>
					const postMessage = (type, message) =>
						window.ReactNativeWebView.postMessage(JSON.stringify({ type, message }));

					const links = document.querySelectorAll('a');
					const sendHeight = () => postMessage('height', document.body.scrollHeight);
					const resizeObserver = new ResizeObserver(entries => sendHeight())
			
					function linkClick(e){
						e.preventDefault();
						postMessage('link', this.href);
					};
			
					for (let i = 0; i < links.length; i++) {
						links[i].addEventListener('click', linkClick);
					}
					
					resizeObserver.observe(document.body);
					sendHeight();

					document.addEventListener('DOMContentLoaded', () => {
						setTimeout(() => {
							postMessage('ready')
						}, 100);
					}, false);
				</script>
				</body>
				</html>`,
			}}
		/>
	);
};

export default ItemContentWebView;

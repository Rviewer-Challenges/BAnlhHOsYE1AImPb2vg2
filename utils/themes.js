class Themes {
	#light;
	#dark;
	static theme;

	styles(light, dark) {
		this.#light = light;
		this.#dark = dark;
	}

	get(name) {
		let styles = [this.#light[name]];

		if (Themes.theme == 'dark') {
			styles.push(this.#dark[name] != undefined ? this.#dark[name] : []);
		}

		return styles;
	}
}

export default Themes;

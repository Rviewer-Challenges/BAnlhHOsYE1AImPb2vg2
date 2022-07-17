import Providers from '../models/providers';

/**
 * @name ProvidersController
 * @version 1.0.0
 * @author sgb004
 */

class ProvidersController {
	#providers;

	constructor(db) {
		this.#providers = new Providers(db);
	}

	register(data) {
		return new Promise((res, rej) => {
			this.#providers
				.findByUrl(data.url)
				.then((id) => {
					if (id) {
						res(id);
					} else {
						return this.#providers.add(data);
					}
				})
				.then((id) => res(id))
				.catch((error) => rej(error));
		});
	}
}

export default ProvidersController;

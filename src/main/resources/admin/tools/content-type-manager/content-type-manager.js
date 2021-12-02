'use strict'

const Portal = require('/lib/xp/portal')
const Thymeleaf = require('/lib/thymeleaf')

exports.get = () => {
    
	const view = resolve('content-type-manager.html')

	const model = {
		loadingIcon: Portal.assetUrl({ path: 'img/spinning-loader.gif' }),
		services: {
			test1: Portal.serviceUrl({ service: 'test1' }),
			test2: Portal.serviceUrl({ service: 'test2' }),
			test3: Portal.serviceUrl({ service: 'test3' }),
		}
	}

	return { body: Thymeleaf.render(view, model) }
}
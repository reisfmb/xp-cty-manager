'use strict'

const Portal = require('/lib/xp/portal')
const Thymeleaf = require('/lib/thymeleaf')

exports.get = () => {
    
	const view = resolve('content-type-manager.html')

	const model = {
		loadingIcon: Portal.assetUrl({ path: 'img/spinning-loader.gif' }),
		services: {
			xml2JsonConverter: Portal.serviceUrl({ service: 'xml2JsonConverter' }),
			jsonSchemas: Portal.serviceUrl({ service: 'jsonSchemas' }),
			fieldComponentMap: Portal.serviceUrl({ service: 'fieldComponentMap' }),
		}
	}

	return { body: Thymeleaf.render(view, model) }
}
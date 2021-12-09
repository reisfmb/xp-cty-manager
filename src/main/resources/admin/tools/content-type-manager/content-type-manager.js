'use strict'

const portalLib = require('/lib/xp/portal');
const thymeleafLib = require('/lib/thymeleaf');
const adminLib = require('/lib/xp/admin');

exports.get = () => {

	const view = resolve('content-type-manager.html');

	const assetsUrl = portalLib.assetUrl({
        path: "",
    });

	const model = {
		assetsUrl,
		loadingIcon: portalLib.assetUrl({ path: 'img/spinning-loader.gif' }),
		launcherUrl: adminLib.getLauncherUrl(),
		launcherPath: adminLib.getLauncherPath(),
		services: {
			xml2JsonConverter: portalLib.serviceUrl({ service: 'xml2JsonConverter' }),
			jsonSchemas: portalLib.serviceUrl({ service: 'jsonSchemas' }),
			fieldComponentMap: portalLib.serviceUrl({ service: 'fieldComponentMap' }),
		}
	}

	return { body: thymeleafLib.render(view, model) }
}

'use strict'

const Portal = require('/lib/xp/portal');
const Thymeleaf = require('/lib/thymeleaf');
const AdminLib = require('/lib/xp/admin');

exports.get = () => {

	const view = resolve('content-type-manager.html');

	const assetsUrl = Portal.assetUrl({
        path: "",
    });

	const model = {
		assetsUrl,
		loadingIcon: Portal.assetUrl({ path: 'img/spinning-loader.gif' }),
		launcherUrl: AdminLib.getLauncherUrl(),
		launcherPath: AdminLib.getLauncherPath(),
		services: {
			test1: Portal.serviceUrl({ service: 'test1' }),
			test2: Portal.serviceUrl({ service: 'test2' }),
			test3: Portal.serviceUrl({ service: 'test3' }),
		}
	}

	return { body: Thymeleaf.render(view, model) }
}

'use strict'

const portalLib = require('/lib/xp/portal');
const thymeleafLib = require('/lib/thymeleaf');
const adminLib = require('/lib/xp/admin');

exports.get = () => {

	const view = resolve('content-type-manager.html');

	const model = {
		assetsUrl: portalLib.assetUrl({ path: "" }),
		loadingIcon: portalLib.assetUrl({ path: 'img/spinning-loader.gif' }),
		launcherUrl: adminLib.getLauncherUrl(),
		launcherPath: adminLib.getLauncherPath(),
	}

	return { body: thymeleafLib.render(view, model) }
}

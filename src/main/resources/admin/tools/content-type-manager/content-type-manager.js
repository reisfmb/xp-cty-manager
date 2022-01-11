const portalLib = require("/lib/xp/portal");
const thymeleafLib = require("/lib/thymeleaf");
const adminLib = require("/lib/xp/admin");

exports.get = () => {
  const view = resolve("content-type-manager.html");

  const model = {
    loadingIcon: portalLib.assetUrl({ path: "img/spinning-loader.gif" }),
    launcherUrl: adminLib.getLauncherUrl(),
    launcherPath: adminLib.getLauncherPath(),
    scripts: {
      vendor: portalLib.assetUrl({ path: "js/vendor.js" }),
      app: portalLib.assetUrl({ path: "js/app.js" }),
    },
  };

  return { body: thymeleafLib.render(view, model) };
};

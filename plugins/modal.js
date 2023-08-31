export default function ({ app }, inject) {
  inject("modal", function (options) {
    return app.store.dispatch("modals/open", options);
  });
}

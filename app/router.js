module.exports = (app) => {
  const { router, controller } = app;

  router.get('/ping', controller.home.ping);
};

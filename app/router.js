module.exports = (app) => {
  const { router, controller } = app;
  const auth = app.middleware.authenticate();

  router.get('/ping', controller.home.ping);
  router.get('/auth-test', auth, controller.home.authTest);

  router.post('/auth/register', controller.auth.register);
  router.post('/auth/login', controller.auth.login);

  router.get('/api/user', auth, controller.user.getUser);
};

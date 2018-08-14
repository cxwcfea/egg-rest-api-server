module.exports = (appInfo) => {
  const config = {};

  config.middleware = [ 'requestId', 'errorHandler', 'accessLog' ];

  config.keys = `${appInfo.name}_development_key`;

  config.security = {
    csrf: false,
  };

  config.onerror = {
    json(err, ctx) {
      ctx.body = { message: err.message };
      ctx.status = err.status;
    },
  };

  return config;
};

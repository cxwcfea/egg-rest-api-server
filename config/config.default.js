module.exports = (appInfo) => {
  const config = {};

  config.keys = `${appInfo.name}_development_key`;

  config.security = {
    csrf: false,
  };

  config.onerror = {
    json(err, ctx) {
      ctx.body = { result: err.message, errCode: err.code };
      ctx.status = err.status;
    },
  };

  return config;
};

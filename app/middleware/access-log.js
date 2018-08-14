module.exports = () => async function accessLog(ctx, next) {
  await next();
  ctx.logger.info(`[${ctx.headers['user-agent']} ${JSON.stringify(ctx.response.header)}]`);
};

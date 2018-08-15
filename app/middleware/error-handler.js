module.exports = () => async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err, ctx);

    const status = err.status || 500;
    const message = status === 500 && ctx.app.config.env === 'prod'
      ? 'Internal Server Error'
      : err.message;

    ctx.type = 'application/json';
    ctx.body = { message };
    if (status === 422) {
      ctx.body.details = err.details;
    }
    ctx.status = status;
    ctx.logger.error(`[${ctx.state.reqId} ${ctx.status} ${JSON.stringify(ctx.body)}]`);
  }
};

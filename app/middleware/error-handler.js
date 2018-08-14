module.exports = () => async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.app.emit('error', err, ctx);

    const status = err.status || 500;
    const message = status === 500 && ctx.app.config.env === 'prod'
      ? 'Internal Server Error'
      : err.message;

    ctx.logger.error(`error occur for req: ${ctx.state.reqId}`);
    ctx.type = 'application/json';
    ctx.body = { message };
    if (status === 422) {
      ctx.body.detail = err.errors;
    }
    ctx.status = status;
  }
};

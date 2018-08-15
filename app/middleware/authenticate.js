
module.exports = () => async function authenticate(ctx, next) {
  const authHeader = ctx.headers.authorization;
  if (!authHeader) {
    ctx.throw(401, 'token must be supplied in Authorization header');
  }
  const token = authHeader.split(' ')[1];
  const user = await ctx.helper.verifyToken(token);
  ctx.state.user = user;
  return next();
};

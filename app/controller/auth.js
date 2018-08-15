const { Controller } = require('egg');

class AuthController extends Controller {
  async register() {
    this.ctx.validate(this.ctx.helper.mobilePasswdSchema());
    const token = await this.ctx.service.auth.register(this.ctx.state.reqParams);
    this.ctx.body = { token };
  }
  async login() {
    this.ctx.validate(this.ctx.helper.mobilePasswdSchema());
    const token = await this.ctx.service.auth.login(this.ctx.state.reqParams);
    this.ctx.body = { token };
  }
}

module.exports = AuthController;

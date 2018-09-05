const Controller = require('egg').Controller;

class UserController extends Controller {
  async getUser() {
    this.ctx.body = await this.ctx.model.Profile.loadInfo(this.ctx.state.user.profileId);
  }
}

module.exports = UserController;

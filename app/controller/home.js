const Controller = require('egg').Controller;

class HomeController extends Controller {
  async ping() {
    this.ctx.body = `the ${this.ctx.app.name} is working!`;
  }
  async authTest() {
    this.ctx.body = await this.ctx.model.Profile.loadInfo(this.ctx.state.user.profileId);
  }
}

module.exports = HomeController;

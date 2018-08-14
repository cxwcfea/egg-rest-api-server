const Controller = require('egg').Controller;

class HomeController extends Controller {
  async ping() {
    this.ctx.body = `the ${this.ctx.app.name} is working!`;
  }
}

module.exports = HomeController;

const { Service } = require('egg');

class AuthService extends Service {
  async register({ mobile, password }) {
    return new Promise((resolve, reject) => {
      this.ctx.model.transaction((t) => {
        const profile = this.ctx.model.Profile.build({ name: mobile, mobile, status: 1 });
        const user = this.ctx.model.LocalAuth.build({ mobile, password, profile_id: profile.id });
        return Promise.all([
          user.save({ transaction: t }),
          profile.save({ transaction: t }),
        ]);
      }).then((result) =>
        resolve(result[0].generateJwt())
      ).catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          const exception = new Error('user already exists');
          exception.status = 409;
          reject(exception);
        } else {
          reject(error);
        }
      });
    });
  }
  login({ mobile, password }) {
    return new Promise((resolve, reject) => {
      this.ctx.model.LocalAuth
        .findOne({
          where: {
            mobile,
          },
          include: [
            {
              model: this.ctx.model.Profile,
              // attributes: ['head', 'nickName', 'mobile'],
            },
          ],
        })
        .then((user) => {
          if (!user) {
            this.ctx.throw(401, 'user not found');
          }
          return Promise.all([ user.authenticate(password), user ]);
        })
        .then((result) => {
          if (!result[0]) {
            this.ctx.throw(401, 'incorrect password');
          }
          resolve(result[1].generateJwt());
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = AuthService;

const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.app.config.jwtSecret, { issuer: this.app.name }, (err, payload) => {
        if (err) {
          reject(new this.ctx.throw(401, 'invalid token'));
        } else {
          resolve({ profileId: payload.sub, mobile: payload.mobile });
        }
      });
    });
  },
  mobilePasswdSchema() {
    return {
      mobile: this.app.validator
        .string()
        .trim()
        .regex(this.app.regex.mobile)
        .required(),
      password: this.app.validator
        .string()
        .min(8)
        .max(32)
        .required(),
    };
  },
};

const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.app.config.jwtSecret, { issuer: this.app.name }, (err, payload) => {
        if (err) {
          const error = new Error('invalid token or token expired');
          error.status = 401;
          reject(error);
        } else {
          resolve({ profileId: payload.sub, mobile: payload.mobile, roles: payload.roles });
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

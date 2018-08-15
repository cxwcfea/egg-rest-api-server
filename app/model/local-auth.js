const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const moment = require('moment');

const { defineModel, regex } = require('../utils.js');

module.exports = (app) => {
  const { UUID, STRING } = app.Sequelize;

  const LocalAuth = defineModel(app, 'local_auth', {
    profile_id: { type: UUID },
    mobile: {
      type: STRING(11),
      is: regex.mobile,
      unique: true,
    },
    password: {
      type: STRING,
    },
  }, {
    hooks: {
      beforeCreate(user) {
        return bcrypt.hash(user.password, 10).then((hashedPasswd) => {
          user.password = hashedPasswd;
        });
      },
      beforeUpdate(user, options) {
        const { fields } = options;
        if (_.includes(fields, 'password')) {
          return bcrypt.hash(user.password, 10).then((hashedPw) => {
            user.password = hashedPw;
          });
        }
        return true;
      },
    },
  });

  /* instance methods */
  LocalAuth.prototype.authenticate = function authenticate(password) {
    return bcrypt.compare(password, this.password);
  };

  LocalAuth.prototype.generateJwt = function generateJwt() {
    return jwt.sign({
      sub: this.profile_id,
      mobile: this.mobile,
      ltype: 0,
      iss: app.name,
      iat: moment().unix(),
      exp: moment().add(3, 'days').unix(),
    }, app.config.jwtSecret);
  };

  return LocalAuth;
};


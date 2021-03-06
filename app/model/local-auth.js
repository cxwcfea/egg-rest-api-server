const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const moment = require('moment');

const { defineModel, regex } = require('../utils.js');

module.exports = (app) => {
  const { STRING, UUID } = app.Sequelize;

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

  LocalAuth.associate = () => {
    app.model.LocalAuth.belongsTo(app.model.Profile, { targetKey: 'uuid', foreignKey: 'profile_id' });
  };

  LocalAuth.prototype.generateJwt = function generateJwt() {
    const roles = this.profile ? this.profile.roles : [ 'user' ];
    return jwt.sign({
      sub: this.profile_id,
      mobile: this.mobile,
      roles,
      ltype: 0,
      iss: app.name,
      iat: moment().unix(),
      exp: moment().add(3, 'days').unix(),
    }, app.config.jwtSecret);
  };

  return LocalAuth;
};


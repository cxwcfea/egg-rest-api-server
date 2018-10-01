const { defineModel } = require('../utils.js');

module.exports = (app) => {
  const { STRING, INTEGER, JSON, BIGINT } = app.Sequelize;

  const Profile = defineModel(app, 'profile', {
    name: { type: STRING, unique: true },
    email: { type: STRING, allowNull: true },
    mobile: { type: STRING(11), allowNull: true },
    gender: { type: INTEGER, defaultValue: 0 }, // 1 male, 2 female, 0未知
    birth: { type: BIGINT, defaultValue: 0 },
    avatar: { type: STRING(512), defaultValue: '' },
    info: { type: STRING, defaultValue: '' },
    roles: { type: JSON, defaultValue: [] },
    status: { type: INTEGER, defaultValue: 0 }, // 0 init, 1 active, 2 inactive
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'mobile' ],
      },
      {
        unique: true,
        fields: [ 'email' ],
      },
    ],
    hooks: {
      beforeCreate(profile) {
        profile.roles = [ 'user' ];
      },
    },
  });

  /* class methods */
  Profile.loadInfo = (profileId) => Profile.findOne({
    where: {
      uuid: profileId,
    },
  }).then((instance) => {
    if (!instance) {
      const error = new Error(`user ${profileId} not found`);
      error.status = 404;
      throw error;
    }
    return instance;
  });

  return Profile;
};

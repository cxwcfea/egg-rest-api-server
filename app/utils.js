function defineModel(app, name, attributes, options) {
  const Sequelize = app.Sequelize;
  const attrs = {};

  Object.keys(attributes).forEach((key) => {
    const value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false,
      };
    }
  });

  attrs.id = {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  };

  attrs.uuid = {
    type: Sequelize.UUID,
    unique: true,
    defaultValue: Sequelize.UUIDV4,
  };

  attrs.created_at = {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
  };

  attrs.updated_at = {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
  };

  return app.model.define(name, attrs, {
    ...options,
    version: true,
  });
}

const regex = {
  mobile: /^1[3|4|5|7|8|9|][0-9]{9}$/,
  captcha: /\d{6}/,
};

module.exports = {
  defineModel,
  regex,
};

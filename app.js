module.exports = (app) => {
  app.beforeStart(async () => {
    app.model.addHook('beforeCreate', (obj) => {
      const now = Date.now();
      obj.created_at = now;
    });

    app.model.addHook('beforeUpdate', (obj) => {
      const now = Date.now();
      obj.updated_at = now;
    });

    if (app.config.env === 'local') {
      await app.model.sync();
    } else if (app.config.env === 'unittest') {
      await app.model.sync({ force: true });
    }
  });
};

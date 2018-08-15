module.exports = (appInfo) => {
  const config = {};

  config.middleware = [ 'requestId', 'errorHandler', 'accessLog' ];

  config.keys = `${appInfo.name}_development_key`;

  config.security = {
    csrf: false,
  };

  config.jwtSecret = 'jwtSecret';

  config.sequelize = {
    database: 'egg_base',
    username: 'root',
    password: '',
    timezone: '+08:00',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    operatorsAliases: false,
    dialectOptions: {
      socketPath: '/tmp/mysql.sock',
    },
    define: {
      freezeTableName: true,
      timestamps: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
    },
    pool: {
      max: 10,
      min: 0,
    },
  };

  config.onerror = {
    json(err, ctx) {
      ctx.body = { message: err.message };
      ctx.status = err.status;
    },
  };

  return config;
};

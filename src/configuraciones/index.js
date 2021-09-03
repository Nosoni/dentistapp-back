const { envVarExist } = require('./helpers');

envVarExist('PG_DB');
envVarExist('PG_HOST');
envVarExist('PG_PORT');
envVarExist('PG_USER');
envVarExist('PG_PASS');
envVarExist('PG_SSL');

const dev = {
  env: process.env.ENV,
  port: 3030,
  llaveSecreta: '9a3da82c-c1a8-4bef-80f6-573709e040fb',
  credenciales: {
    database: 'dentistapp',
    user: 'dentistapp',
    password: 'copernicus',
    config: {
      dialect: 'postgres',
      logging: false,
      define: {
        freezeTableName: true,
        timestamps: false
      },
    }
  }
}

const heroku = {
  env: process.env.ENV,
  port: 3030,
  llaveSecreta: '9a3da82c-c1a8-4bef-80f6-573709e040fb',
  credenciales: {
    database: process.env.PG_DB,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    config: {
      //host: process.env.PG_HOST,
      dialect: 'postgres',
      // logging: process.env.ENV === 'development',
      // define: {
      //   freezeTableName: true,
      //   timestamps: false
      // },
    }
  }
}

const now = heroku

if (process.env.PG_SSL === 'true') {
  now.credenciales.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

module.exports = now
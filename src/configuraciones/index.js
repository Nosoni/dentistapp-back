require('dotenv').config()

const env = {
  env: process.env.ENV_RUN,
  port: process.env.PORT || 3030,
  llaveSecreta: process.env.SECRET_KEY,
  credenciales: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    config: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: 'postgres',
      logging: false,
      define: {
        freezeTableName: true,
        timestamps: false
      },
    }
  }
}

if (process.env.PG_SSL === 'true') {
  env.credenciales.config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

module.exports = env
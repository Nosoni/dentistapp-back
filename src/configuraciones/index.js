require('dotenv').config()

const env = {
  env: process.env.ENV_RUN,
  port: process.env.PORT || process.env.APP_PORT,
  llaveSecreta: process.env.SECRET_KEY,
  credenciales: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    config: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: 'postgres',
      timezone: 'America/Asuncion',
      logging: false,
      define: {
        freezeTableName: true,
        timestamps: false
      },
    }
  },
  storageBucket: process.env.BUCKET_URL
}

if (process.env.SSL === 'true') {
  env.credenciales.config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}


module.exports = env
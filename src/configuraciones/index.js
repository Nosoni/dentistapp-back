const dev = {
  env: 'development',
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
  env: 'keroku',
  port: 3030,
  llaveSecreta: '9a3da82c-c1a8-4bef-80f6-573709e040fb',
  credenciales: {
    database: 'd5t8apadk95g7d',
    user: 'vgvzoidktbnvah',
    password: 'ec99a4efe23352891e2ac211ffcb13f62faaea82ab335b26933eedf681630cb1',
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

const now = heroku

module.exports = now
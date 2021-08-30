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
const now = dev

module.exports = now
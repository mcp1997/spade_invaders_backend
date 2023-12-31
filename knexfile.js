const sharedConfig = {
  client: 'sqlite3',
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
  // sqlite3-specific config
  useNullAsDefault: true,
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) }, 
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/users.db3' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/users.test.db3' },
  },
  production: {}
}
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'containers-us-west-193.railway.app',
      database: 'Tinder_para_habilidades',
      port: '7200',
      user: 'postgres',
      password: 'SjQZvIReGbZX0ZtYoFHR',
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'containers-us-west-193.railway.app',
      database: 'Tinder_para_habilidades',
      port: '7200',
      user: 'postgres',
      password: 'SjQZvIReGbZX0ZtYoFHR'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'containers-us-west-193.railway.app',
      database: 'Tinder_para_habilidades',
      port: '7200',
      user: 'postgres',
      password: 'SjQZvIReGbZX0ZtYoFHR'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

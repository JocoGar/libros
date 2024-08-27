const env={
    host: 'dpg-cr6jn5qj1k6c73d5eps0-a',
    port: 5432,
    username: 'antigua_umg2024_10867_dtdb_user',
    password: 'dU5Bdxoe42cFfbeRAJxVuFnU5In7tbG2',
    database: 'antigua_umg2024_10867_dtdb',
  dialect: 'postgres',
  
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    
  }
  }
  module.exports =env;
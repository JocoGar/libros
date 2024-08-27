const env={
    host: 'dpg-cqc5qm08fa8c73ck1nfg-a',
    port: 5432,
    username: 'antigua_umg2024_10867_user',
    password: '892alckvOQTohudlNX7UmVXNUlHk28Jt',
    database: 'antigua_umg2024_10867',
  dialect: 'postgres',
  
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    
  }
  }
  module.exports =env;
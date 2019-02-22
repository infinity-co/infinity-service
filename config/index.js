module.exports = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  tokenSecret: process.env.TOKEN_SECRET,
  host: process.env.HOST,
  mailer: {
    apiKey: process.env.MAILER_APIKEY,
    domain: process.env.MAILER_DOMAIN,
    from: process.env.MAILER_FROM
  },
  corsOrigin: process.env.CORS_ORIGIN
}

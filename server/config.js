export default {
  development: {
    uri: process.env.MONGO_URI,
    dbOptions: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
  production: {
    uri: process.env.MONGO_URI,
    dbOptions: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  host: process.env.HOST || "0.0.0.0",
};

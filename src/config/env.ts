require("dotenv").config();

export const env = {
  PORT: Number(process.env.PORT) || 8080,
  HOST: process.env.HOST || "127.0.0.1",
  CLIENT: process.env.CLIENT || "http://localhost:3000",

  NODE_ENV: process.env.NODE_ENV || "development",
  SECRET: process.env.SECRET,

  DB: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

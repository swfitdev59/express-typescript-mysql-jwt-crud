import { env } from "../config/env";

const Sequelize = require('sequelize');

export const sequelize = new Sequelize(
    env.DB.name,
    env.DB.user,
    env.DB.password,
    {
        host: env.DB.host,
        dialect: env.DB.dialect,
        logging: false,
        dialectOptions: {
            multipleStatements: true,
            connectTimeout: 150000
        },
        pool: {
            max: 350,
            min: 0,
            acquire: 220000,
            idle: 10000
        }
    });


export const connectDB = () => {
    sequelize.authenticate()
        .then(() => {
            sequelize.sync({ alter: false });
            console.log('Connection has been established successfully.');
        })
        .catch((err: unknown) => {
            console.error('Unable to connect to the database:', err);
        });
};

export const dbCredentails = {
    username: env.DB.user,
    password: env.DB.password,
    database: env.DB.name,
    host: env.DB.host,
    dialect: env.DB.dialect,
    dialectOptions: {
        multipleStatements: true,
        connectTimeout: 60000
    },
}

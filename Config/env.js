const dotenv = require('dotenv');

dotenv.config({path: './../config.env'});

const {
    PORT,
    NODE_ENV,
    CLIENT_URL,
    MONGODB_URL,
    SENDER_EMAIL,
    DATABASE_PASSWORD,
    USER,
    MONGODB_LOCAL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_EXPIRES_COOKIES,
    API_URL
 } = process.env;

 export {
    PORT,
    NODE_ENV,
    CLIENT_URL,
    MONGODB_URL,
    SENDER_EMAIL,
    DATABASE_PASSWORD,
    USER,
    MONGODB_LOCAL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_EXPIRES_COOKIES,
    API_URL
 };
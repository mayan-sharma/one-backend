require('dotenv').config();

const config = {
    PORT: process.env.PORT,
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_HOST: process.env.DATABASE_HOST || '',
    DATABASE_PORT: process.env.DATABASE_PORT || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    JWT_SECRET: process.env.JWT_SECRET?.toString() || ''
};

module.exports = config;
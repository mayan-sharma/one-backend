require('dotenv').config();

const config = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL || '',
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_HOST: process.env.DATABASE_HOST || '',
    DATABASE_PORT: process.env.DATABASE_PORT || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    JWT_PRE_REGISTER_SECRET: process.env.JWT_PRE_REGISTER_SECRET?.toString() || '',
    JWT_SECRET: process.env.JWT_SECRET?.toString() || '',
    JWT_PASSWORD_RESET_SECRET: process.env.JWT_PASSWORD_RESET_SECRET?.toString() || '',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
    EMAIL_TO: process.env.EMAIL_TO || '',
    EMAIL_FROM: process.env.EMAIL_FROM || '',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || ''
};

module.exports = config;
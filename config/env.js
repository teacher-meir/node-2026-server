export const env = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    BCRYPT_ROUNDS: +process.env.BCRYPT_ROUNDS,
    PORT: process.env.PORT,
};
require('dotenv').config();

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  NODE_ENV = 'dev',
  JWT_SECRET = 'secret-key',
} = process.env;

module.exports = {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
};

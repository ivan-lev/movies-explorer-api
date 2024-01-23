require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const { routes } = require('./routes');

const {
  PORT = 3001,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();

mongoose.connect(DB_URL);

app.use(limiter); // limit requests count
app.use(cors()); // cross-domain settings
app.use(requestLogger); // winston requests logger
app.use(helmet()); // protect headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.use(errorLogger); // winston error logger
app.use(errors()); // celebrate error handler
app.use(errorHandler); // final error handler

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`DB is ${DB_URL}`);
});

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
  PORT,
  DB_URL,
} = require('./config');

const app = express();

mongoose
  .connect(DB_URL)
  .catch((error) => console.log(error));

app.use(limiter); // limit requests count
app.use(cors()); // cross-domain settings
app.use(requestLogger); // winston requests logger
app.use(helmet()); // protect headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes); // all routes goes through here

app.use(errorLogger); // winston error logger
app.use(errors()); // celebrate error handler
app.use(errorHandler); // final error handler

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`DB path is ${DB_URL}`);
});

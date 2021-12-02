require('dotenv').config({ path: 'ENV_FILENAME' });
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const allRouters = require('./routes/index');
const errorHandler = require('./middlewares/error');
const devConfig = require('./utils/devConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { dbSrc, NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? dbSrc : devConfig.dbDev, {
  useNewUrlParser: true,
});

app.use(requestLogger);

// app.use(limiter);

app.use('/', allRouters);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
